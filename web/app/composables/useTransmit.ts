import { Transmit } from '@adonisjs/transmit-client'
import { ref, onUnmounted } from 'vue'

export interface TransmitEvent {
  event: string
  data: Record<string, unknown>
  timestamp: string
}

let transmitInstance: Transmit | null = null

function getTransmitClient(): Transmit | null {
  if (typeof window === 'undefined') {
    return null
  }

  if (!transmitInstance) {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBaseUrl

    transmitInstance = new Transmit({
      baseUrl,
      maxReconnectAttempts: 5,
      eventSourceFactory: (url, options) => {
        return new EventSource(url, options)
      },
      onReconnectAttempt: (attempt) => {
        console.log(`[Transmit] Reconnection attempt ${attempt}`)
      },
      onReconnectFailed: () => {
        console.error('[Transmit] Reconnection failed')
      },
      onSubscribeFailed: (response) => {
        console.error(`[Transmit] Subscribe failed: ${response.status} ${response.statusText}`)
      },
      onSubscription: (channelName) => {
        console.log(`[Transmit] Successfully subscribed to: ${channelName}`)
      },
      onUnsubscription: (channelName) => {
        console.log(`[Transmit] Unsubscribed from: ${channelName}`)
      }
    })
  }
  return transmitInstance
}

export function useTransmit() {
  const client = getTransmitClient()
  const events = ref<TransmitEvent[]>([])
  const subscriptions = ref<Map<string, ReturnType<Transmit['subscription']>>>(new Map())

  const subscribe = async (channel: string): Promise<void> => {
    if (!client || subscriptions.value.has(channel)) {
      console.log(`[Transmit] Skip subscribe: client=${!!client}, alreadySubscribed=${subscriptions.value.has(channel)}`)
      return
    }

    console.log(`[Transmit] Creating subscription for channel: ${channel}`)

    const subscription = client.subscription(channel)

    await subscription.create()

    subscription.onMessage((data: TransmitEvent) => {
      console.log(`[Transmit] Received from ${channel}:`, JSON.stringify(data))
      events.value.push(data)
      if (events.value.length > 100) {
        events.value.shift()
      }
    })

    subscriptions.value.set(channel, subscription)
    console.log(`[Transmit] Subscription created for: ${channel}`)
  }

  const unsubscribe = async (channel: string): Promise<void> => {
    const subscription = subscriptions.value.get(channel)
    if (subscription) {
      await subscription.delete()
      subscriptions.value.delete(channel)
      console.log(`[Transmit] Unsubscribed from: ${channel}`)
    }
  }

  const cleanup = (): void => {
    subscriptions.value.forEach((subscription) => {
      subscription.delete()
    })
    subscriptions.value.clear()
    events.value = []
    console.log('[Transmit] Cleanup completed')
  }

  onUnmounted(() => {
    cleanup()
  })

  return {
    events,
    subscribe,
    unsubscribe,
    cleanup
  }
}
