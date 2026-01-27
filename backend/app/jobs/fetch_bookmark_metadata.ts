import { Job } from 'adonisjs-jobs'
import { BookmarkMetadataService } from '#services/bookmark_metadata_service'
import { METADATA_FETCH } from '#constants/index'

export type FetchBookmarkMetadataPayload = {
  bookmarkId: number
  url: string
  forceUpdate?: boolean
}

export type FetchBookmarkMetadataResult = {
  success: boolean
  bookmarkId: number
}

export default class FetchBookmarkMetadata extends Job {
  private metadataService = new BookmarkMetadataService()

  async handle(payload: FetchBookmarkMetadataPayload): Promise<FetchBookmarkMetadataResult> {
    const { bookmarkId, url, forceUpdate = false } = payload

    console.log(`[FetchBookmarkMetadata] Starting fetch for bookmark ${bookmarkId}: ${url}`)
    console.log(`[FetchBookmarkMetadata] forceUpdate: ${forceUpdate}`)

    const metadata = await this.metadataService.fetchAndUpdate(bookmarkId, url, forceUpdate)

    if (!metadata.success) {
      console.error(`[FetchBookmarkMetadata] Failed for bookmark ${bookmarkId}: ${metadata.error}`)
      throw new Error(metadata.error ?? 'Failed to fetch metadata')
    }

    console.log(`[FetchBookmarkMetadata] Completed for bookmark ${bookmarkId}`)
    return { success: true, bookmarkId }
  }

  async retryDelay(_attemptsMade: number, _err: Error, _job: any): Promise<number> {
    const baseDelay = METADATA_FETCH.RETRY_DELAY_MIN
    const maxExtraDelay = METADATA_FETCH.RETRY_DELAY_MAX - METADATA_FETCH.RETRY_DELAY_MIN
    const extraDelay = Math.floor(Math.random() * maxExtraDelay)
    return baseDelay + extraDelay
  }
}
