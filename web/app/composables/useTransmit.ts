import { Transmit } from '@adonisjs/transmit-client'
import { ref, onUnmounted, shallowRef } from 'vue'

export interface TransmitEvent {
  event: string
  data: Record<string, unknown>
  timestamp: string
}

let transmitInstance: Transmit | null = null

/* eslint-disable vue-composable/composable-placement */
let configCache: { public: { apiBaseUrl: string } } | null = null

function getConfig() {
  if (!configCache) {
    configCache = useRuntimeConfig()
  }
  return configCache
}
/* eslint-enable vue-composable/composable-placement */

function createTransmitClient(): Transmit | null {
  if (typeof window === 'undefined') {
    return null
  }

  if (!transmitInstance) {
    const config = getConfig()
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
  const client = createTransmitClient()
  const events = ref<TransmitEvent[]>([])
  const subscriptions = shallowRef<Map<string, ReturnType<Transmit['subscription']>>>(new Map())
  const isCleanedUp = ref(false)

  const subscribe = async (channel: string): Promise<void> => {
    if (isCleanedUp.value || !client || subscriptions.value.has(channel)) {
      console.log(`[Transmit] Skip subscribe: cleanedUp=${isCleanedUp.value}, client=${!!client}, alreadySubscribed=${subscriptions.value.has(channel)}`)
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
    if (isCleanedUp.value) return

    const subscription = subscriptions.value.get(channel)
    if (subscription) {
      try {
        await subscription.delete()
        subscriptions.value.delete(channel)
        console.log(`[Transmit] Unsubscribed from: ${channel}`)
      } catch (error) {
        console.warn(`[Transmit] Failed to unsubscribe from ${channel}:`, error)
        subscriptions.value.delete(channel)
      }
    }
  }

  const cleanup = (): void => {
    if (isCleanedUp.value) {
      console.log('[Transmit] Already cleaned up, skipping...')
      return
    }
    isCleanedUp.value = true

    for (const [channel, subscription] of subscriptions.value.entries()) {
      try {
        if (subscription && typeof subscription.delete === 'function') {
          subscription.delete().catch((error: unknown) => {
            console.warn(`[Transmit] Failed to delete subscription for ${channel}:`, error)
          })
        }
      } catch (error) {
        console.warn(`[Transmit] Error during cleanup for ${channel}:`, error)
      }
    }
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
