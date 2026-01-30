import { watch } from 'vue'
import { useTransmit, type TransmitEvent } from './useTransmit'
import { BOOKMARK_EVENTS } from '~/constants'

export function usePush() {
  const { events, subscribe } = useTransmit()

  const onBookmarkUpdated = (userId: number, callback: (bookmark: TransmitEvent['data']) => void) => {
    subscribe(`global:${userId}`)

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

  const onImportProgress = (userId: number, callback: (data: TransmitEvent['data']) => void) => {
    subscribe(`${userId}`)

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
