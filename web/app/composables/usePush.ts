import { watch } from 'vue'
import { BOOKMARK_EVENTS, TRANSMIT_CHANNEL_NAMES } from '~/constants'
import { useAuthStore } from '~/stores/auth'
import { useTransmit, type TransmitEvent } from './useTransmit'

export function usePush() {
  const { events, subscribe } = useTransmit()
  const authStore = useAuthStore()

  if (!authStore.user) {
    throw new Error('User not authenticated')
  }

  const onBookmarkUpdated = (callback: (bookmark: TransmitEvent['data']) => void) => {
    subscribe(`${TRANSMIT_CHANNEL_NAMES.BOOKMARKS}:${authStore.user?.id}`)

    watch(
      () => events.value,
      (newEvents) => {
        const latest = newEvents[newEvents.length - 1]
        if (latest?.event === BOOKMARK_EVENTS.BOOKMARK_UPDATED) {
          callback(latest.data)
        }
      },
      { deep: true }
    )
  }

  const onImportProgress = (callback: (data: TransmitEvent['data']) => void) => {
    subscribe(`${TRANSMIT_CHANNEL_NAMES.BOOKMARKS}:${authStore.user?.id}`)

    watch(
      () => events.value,
      (newEvents) => {
        const latest = newEvents[newEvents.length - 1]
        if (latest?.event === BOOKMARK_EVENTS.IMPORT_PROGRESS) {
          callback(latest.data)
        }
      },
      { deep: true }
    )
  }

  return { onBookmarkUpdated, onImportProgress }
}
