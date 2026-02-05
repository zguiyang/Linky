import logger from '@adonisjs/core/services/logger'
import ogs from 'open-graph-scraper'
import Bookmark from '#models/bookmark'
import { METADATA_FETCH, BOOKMARK_STATUS } from '#constants'
import type { BookmarkMetadata } from '#types/bookmark'

export interface FetchMetadataOptions {
  url: string
  timeout?: number
}

export interface FetchMetadataResult {
  success: boolean
  metadata?: Omit<BookmarkMetadata, 'requestUrl' | 'success' | 'fetchedAt'>
  error?: string
}

export class BookmarkMetadataService {
  async fetch(options: FetchMetadataOptions): Promise<FetchMetadataResult> {
    const { url, timeout = METADATA_FETCH.TIMEOUT } = options

    logger.info(`[BookmarkMetadataService] Fetching metadata for: ${url}`)

    try {
      const result = await ogs({
        url,
        timeout,
      })

      const { result: ogData } = result

      logger.info(`[BookmarkMetadataService] ogTitle: ${ogData.ogTitle}`)
      logger.info(`[BookmarkMetadataService] ogDescription: ${ogData.ogDescription}`)
      logger.info(`[BookmarkMetadataService] ogImage: ${ogData.ogImage}`)

      const ogImage = ogData.ogImage

      return {
        success: true,
        metadata: {
          ogTitle: ogData.ogTitle ?? null,
          ogDescription: ogData.ogDescription ?? null,
          ogImage:
            ogImage && Array.isArray(ogImage) && ogImage.length > 0
              ? {
                  url: (ogImage[0] as any).url ?? null,
                  width: (ogImage[0] as any).width ?? null,
                  height: (ogImage[0] as any).height ?? null,
                  type: (ogImage[0] as any).type ?? null,
                }
              : null,
          favicon: ogData.favicon ?? null,
        },
      }
    } catch (error) {
      logger.error({ err: error }, `[BookmarkMetadataService] Fetch error for ${url}`)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  async updateBookmarkMetadata(
    bookmarkId: number,
    metadata: BookmarkMetadata,
    forceUpdate: boolean = false
  ): Promise<void> {
    const bookmark = await Bookmark.find(bookmarkId)

    if (!bookmark) {
      logger.error(`[BookmarkMetadataService] Bookmark not found: ${bookmarkId}`)
      return
    }

    logger.info(`[BookmarkMetadataService] Updating bookmark ${bookmarkId}`)
    logger.info(`[BookmarkMetadataService] Current status: "${bookmark.status}"`)
    logger.info(`[BookmarkMetadataService] Current title: "${bookmark.title}"`)
    logger.info(`[BookmarkMetadataService] Current description: "${bookmark.description}"`)
    logger.info(`[BookmarkMetadataService] Metadata ogTitle: "${metadata.ogTitle}"`)
    logger.info(`[BookmarkMetadataService] Metadata ogDescription: "${metadata.ogDescription}"`)
    logger.info(`[BookmarkMetadataService] forceUpdate: ${forceUpdate}`)

    const updates: {
      title?: string
      description: string | null
      metadata?: BookmarkMetadata
      status?: string
    } = {
      metadata,
      description: bookmark.description,
      status: BOOKMARK_STATUS.ACTIVE,
    }

    if (forceUpdate) {
      if (metadata.ogTitle) {
        logger.info(
          `[BookmarkMetadataService] forceUpdate: Will update title to: "${metadata.ogTitle}"`
        )
        updates.title = metadata.ogTitle
      }
      if (metadata.ogDescription) {
        logger.info(
          `[BookmarkMetadataService] forceUpdate: Will update description to: "${metadata.ogDescription}"`
        )
        updates.description = metadata.ogDescription
      }
    } else {
      const shouldUpdateTitle = !bookmark.title || bookmark.title.trim() === ''
      const shouldUpdateDescription = !bookmark.description || bookmark.description?.trim() === ''

      logger.info(`[BookmarkMetadataService] shouldUpdateTitle: ${shouldUpdateTitle}`)
      logger.info(`[BookmarkMetadataService] shouldUpdateDescription: ${shouldUpdateDescription}`)

      if (shouldUpdateTitle && metadata.ogTitle) {
        logger.info(`[BookmarkMetadataService] Will update title to: "${metadata.ogTitle}"`)
        updates.title = metadata.ogTitle
      } else {
        logger.info(
          `[BookmarkMetadataService] Title not updated. shouldUpdateTitle: ${shouldUpdateTitle}, ogTitle: ${metadata.ogTitle}`
        )
      }

      if (shouldUpdateDescription && metadata.ogDescription) {
        logger.info(
          `[BookmarkMetadataService] Will update description to: "${metadata.ogDescription}"`
        )
        updates.description = metadata.ogDescription
      } else {
        logger.info(
          `[BookmarkMetadataService] Description not updated. shouldUpdateDescription: ${shouldUpdateDescription}, ogDescription: ${metadata.ogDescription}`
        )
      }
    }

    logger.info(`[BookmarkMetadataService] Updates object: ${JSON.stringify(updates)}`)
    logger.info(`[BookmarkMetadataService] Updates keys count: ${Object.keys(updates).length}`)

    if (Object.keys(updates).length > 1) {
      bookmark.merge(updates)
    } else {
      bookmark.metadata = metadata
    }

    await bookmark.save()

    logger.info(
      `[BookmarkMetadataService] Bookmark ${bookmarkId} saved, current status: ${bookmark.status}`
    )

    if (Object.keys(updates).length > 1) {
      logger.info(`[BookmarkMetadataService] Bookmark ${bookmarkId} saved with updates`)
    } else {
      logger.info(`[BookmarkMetadataService] Bookmark ${bookmarkId} saved with metadata only`)
    }
  }

  async fetchAndUpdate(
    bookmarkId: number,
    url: string,
    forceUpdate: boolean = false
  ): Promise<BookmarkMetadata> {
    const fetchResult = await this.fetch({ url })

    const metadata: BookmarkMetadata = {
      ...(fetchResult.metadata ?? {}),
      requestUrl: url,
      success: fetchResult.success,
      error: fetchResult.error ?? null,
      fetchError: fetchResult.success ? null : fetchResult.error || '无法获取页面信息',
      fetchedAt: new Date().toISOString(),
    }

    logger.info(`[BookmarkMetadataService] fetchAndUpdate result: ${JSON.stringify(metadata)}`)

    await this.updateBookmarkMetadata(bookmarkId, metadata, forceUpdate)

    return metadata
  }
}
