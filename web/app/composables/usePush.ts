import { watch } from 'vue'
import { BOOKMARK_EVENTS, TRANSMIT_CHANNEL_NAMES } from '~/constants'
import { useAuthStore } from '~/stores/auth'
import { useTransmit, type TransmitEvent } from './useTransmit'
import type { ImportProgressData } from '~/api/types'

export function usePush() {
  const { events, subscribe } = useTransmit()
  const authStore = useAuthStore()

  const ensureAuth = async () => {
    if (!authStore.user) {
      await authStore.fetchUser()
    }
  }

  const onBookmarkUpdated = (callback: (bookmark: TransmitEvent['data']) => void) => {
    const channel = authStore.user ? `${TRANSMIT_CHANNEL_NAMES.BOOKMARKS}:${authStore.user.id}` : null
    if (!channel) return

    subscribe(channel)

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

  const onImportProgress = (callback: (data: ImportProgressData) => void) => {
    const channel = authStore.user ? `${TRANSMIT_CHANNEL_NAMES.BOOKMARKS}:${authStore.user.id}` : null
    if (!channel) return

    subscribe(channel)

    watch(
      () => events.value,
      (newEvents) => {
        const latest = newEvents[newEvents.length - 1]
        if (latest?.event === BOOKMARK_EVENTS.IMPORT_PROGRESS) {
          callback(latest.data as unknown as ImportProgressData)
        }
      },
      { deep: true }
    )
  }

  return { onBookmarkUpdated, onImportProgress, ensureAuth }
}
