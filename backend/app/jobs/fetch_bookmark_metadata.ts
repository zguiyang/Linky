import { Job } from 'adonisjs-jobs'
import logger from '@adonisjs/core/services/logger'
import { BookmarkMetadataService } from '#services/bookmark_metadata_service'
import { SettingService } from '#services/setting_service'
import { METADATA_FETCH } from '#constants/index'
import GenerateAiTags from './generate_ai_tags.js'

export type FetchBookmarkMetadataPayload = {
  bookmarkId: number
  url: string
  forceUpdate?: boolean
  autoAiTag?: boolean
}

export type FetchBookmarkMetadataResult = {
  success: boolean
  bookmarkId: number
}

export default class FetchBookmarkMetadata extends Job {
  private metadataService = new BookmarkMetadataService()
  private settingService = new SettingService()

  async handle(payload: FetchBookmarkMetadataPayload): Promise<FetchBookmarkMetadataResult> {
    const { bookmarkId, url, forceUpdate = false, autoAiTag = true } = payload

    logger.info(`[FetchBookmarkMetadata] Starting fetch for bookmark ${bookmarkId}: ${url}`)
    logger.info(`[FetchBookmarkMetadata] forceUpdate: ${forceUpdate}, autoAiTag: ${autoAiTag}`)

    const metadata = await this.metadataService.fetchAndUpdate(bookmarkId, url, forceUpdate)

    if (!metadata.success) {
      logger.error(`[FetchBookmarkMetadata] Failed for bookmark ${bookmarkId}: ${metadata.error}`)
      throw new Error(metadata.error ?? 'Failed to fetch metadata')
    }

    if (autoAiTag) {
      logger.info(`[FetchBookmarkMetadata] Scheduling AI tag generation for bookmark ${bookmarkId}`)
      const { default: BookmarkModel } = await import('#models/bookmark')
      const bookmark = await BookmarkModel.find(bookmarkId)
      const userId = bookmark?.userId

      if (!userId) {
        logger.warn(`[FetchBookmarkMetadata] No userId for bookmark ${bookmarkId}`)
        return { success: true, bookmarkId }
      }

      const aiConfig = await this.settingService.getAiConfig(userId)

      if (!aiConfig.aiEnabled) {
        logger.info(
          `[FetchBookmarkMetadata] AI not enabled for user ${userId}, skip tag generation for bookmark ${bookmarkId}`
        )
        return { success: true, bookmarkId }
      }

      GenerateAiTags.dispatch({
        bookmarkId,
        userId,
      }).catch((err) => {
        logger.error(
          { err },
          `[FetchBookmarkMetadata] Failed to schedule AI tags for bookmark ${bookmarkId}`
        )
      })
    }

    logger.info(`[FetchBookmarkMetadata] Completed for bookmark ${bookmarkId}`)
    return { success: true, bookmarkId }
  }

  async retryDelay(_attemptsMade: number, _err: Error, _job: any): Promise<number> {
    const baseDelay = METADATA_FETCH.RETRY_DELAY_MIN
    const maxExtraDelay = METADATA_FETCH.RETRY_DELAY_MAX - METADATA_FETCH.RETRY_DELAY_MIN
    const extraDelay = Math.floor(Math.random() * maxExtraDelay)
    return baseDelay + extraDelay
  }
}
