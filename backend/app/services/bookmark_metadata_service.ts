import ogs from 'open-graph-scraper'
import { inject } from '@adonisjs/core'
import Bookmark from '#models/bookmark'
import { METADATA_FETCH } from '#constants/index'
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

@inject()
export class BookmarkMetadataService {
  async fetch(options: FetchMetadataOptions): Promise<FetchMetadataResult> {
    const { url, timeout = METADATA_FETCH.TIMEOUT } = options

    try {
      const result = await ogs({
        url,
        timeout,
      })

      const { result: ogData } = result

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
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  async updateBookmarkMetadata(bookmarkId: number, metadata: BookmarkMetadata): Promise<void> {
    const bookmark = await Bookmark.find(bookmarkId)

    if (!bookmark) {
      return
    }

    const shouldUpdateTitle = !bookmark.title || bookmark.title.trim() === ''
    const shouldUpdateDescription = !bookmark.description || bookmark.description.trim() === ''

    const updates: { title?: string; description?: string | null; metadata?: BookmarkMetadata } = {
      metadata,
    }

    if (shouldUpdateTitle && metadata.ogTitle) {
      updates.title = metadata.ogTitle
    }

    if (shouldUpdateDescription && metadata.ogDescription) {
      updates.description = metadata.ogDescription
    }

    if (Object.keys(updates).length > 1) {
      bookmark.merge(updates)
      await bookmark.save()
    } else {
      bookmark.metadata = metadata
      await bookmark.save()
    }
  }

  async fetchAndUpdate(bookmarkId: number, url: string): Promise<BookmarkMetadata> {
    const fetchResult = await this.fetch({ url })

    const metadata: BookmarkMetadata = {
      ...fetchResult.metadata,
      requestUrl: url,
      success: fetchResult.success,
      error: fetchResult.error ?? null,
      fetchedAt: new Date().toISOString(),
    }

    await this.updateBookmarkMetadata(bookmarkId, metadata)

    return metadata
  }
}
