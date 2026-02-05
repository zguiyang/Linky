import { Job } from 'adonisjs-jobs'
import logger from '@adonisjs/core/services/logger'
import app from '@adonisjs/core/services/app'
import { BookmarkMetadataService } from '#services/bookmark_metadata_service'
import { SettingService } from '#services/setting_service'
import { TransmitService } from '#services/transmit_service'
import { METADATA_FETCH, BOOKMARK_EVENTS, TRANSMIT_CHANNEL_NAMES } from '#constants'
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

    const { default: BookmarkModel } = await import('#models/bookmark')
    const bookmark = await BookmarkModel.find(bookmarkId)
    const userId = bookmark?.userId

    if (!userId) {
      logger.warn(`[FetchBookmarkMetadata] No userId for bookmark ${bookmarkId}`)
      return { success: true, bookmarkId }
    }

    const metadata = await this.metadataService.fetchAndUpdate(bookmarkId, url, forceUpdate)

    if (!metadata.success) {
      logger.warn(`[FetchBookmarkMetadata] Failed for bookmark ${bookmarkId}: ${metadata.error}`)
      return { success: false, bookmarkId }
    }

    await this.pushBookmarkUpdate(userId, bookmarkId)

    if (autoAiTag) {
      logger.info(`[FetchBookmarkMetadata] Scheduling AI tag generation for bookmark ${bookmarkId}`)

      const aiConfig = await this.settingService.getAiConfig(userId)

      if (!aiConfig.aiEnabled) {
        logger.info(
          `[FetchBookmarkMetadata] AI not enabled for user ${userId}, skip tag generation`
        )
        await this.pushBookmarkUpdate(userId, bookmarkId)
        return { success: true, bookmarkId }
      }

      GenerateAiTags.dispatch({
        bookmarkId,
        userId,
      }).catch((err: any) => {
        logger.error(
          { err },
          `[FetchBookmarkMetadata] Failed to schedule AI tags for bookmark ${bookmarkId}`
        )
      })
    }

    await this.pushBookmarkUpdate(userId, bookmarkId)

    logger.info(`[FetchBookmarkMetadata] Completed for bookmark ${bookmarkId}`)
    return { success: true, bookmarkId }
  }

  private async pushBookmarkUpdate(userId: number, bookmarkId: number): Promise<void> {
    try {
      const transmitService = await app.container.make(TransmitService)
      const { default: BookmarkModel } = await import('#models/bookmark')
      const bookmark = await BookmarkModel.query().where('id', bookmarkId).preload('tags').first()

      if (bookmark) {
        await transmitService.toUser(
          `${TRANSMIT_CHANNEL_NAMES.BOOKMARKS}:${userId}`,
          BOOKMARK_EVENTS.BOOKMARK_UPDATED,
          bookmark.toJSON()
        )
      }
    } catch (error) {
      logger.error(
        { err: error },
        `[FetchBookmarkMetadata] Failed to push update for bookmark ${bookmarkId}`
      )
    }
  }

  async retryDelay(_attemptsMade: number, _err: Error, _job: any): Promise<number> {
    const baseDelay = METADATA_FETCH.RETRY_DELAY_MIN
    const maxExtraDelay = METADATA_FETCH.RETRY_DELAY_MAX - METADATA_FETCH.RETRY_DELAY_MIN
    const extraDelay = Math.floor(Math.random() * maxExtraDelay)
    return baseDelay + extraDelay
  }
}
