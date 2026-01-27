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

    console.log(`[BookmarkMetadataService] Fetching metadata for: ${url}`)

    try {
      const result = await ogs({
        url,
        timeout,
      })

      const { result: ogData } = result

      console.log(`[BookmarkMetadataService] ogTitle:`, ogData.ogTitle)
      console.log(`[BookmarkMetadataService] ogDescription:`, ogData.ogDescription)
      console.log(`[BookmarkMetadataService] ogImage:`, ogData.ogImage)

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
      console.error(`[BookmarkMetadataService] Fetch error for ${url}:`, error)
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
      console.error(`[BookmarkMetadataService] Bookmark not found: ${bookmarkId}`)
      return
    }

    console.log(`[BookmarkMetadataService] Updating bookmark ${bookmarkId}`)
    console.log(`[BookmarkMetadataService] Current title: "${bookmark.title}"`)
    console.log(`[BookmarkMetadataService] Current description: "${bookmark.description}"`)
    console.log(`[BookmarkMetadataService] Metadata ogTitle: "${metadata.ogTitle}"`)
    console.log(`[BookmarkMetadataService] Metadata ogDescription: "${metadata.ogDescription}"`)
    console.log(`[BookmarkMetadataService] forceUpdate: ${forceUpdate}`)

    const updates: { title?: string; description: string | null; metadata?: BookmarkMetadata } = {
      metadata,
      description: bookmark.description,
    }

    if (forceUpdate) {
      if (metadata.ogTitle) {
        console.log(
          `[BookmarkMetadataService] forceUpdate: Will update title to: "${metadata.ogTitle}"`
        )
        updates.title = metadata.ogTitle
      }
      if (metadata.ogDescription) {
        console.log(
          `[BookmarkMetadataService] forceUpdate: Will update description to: "${metadata.ogDescription}"`
        )
        updates.description = metadata.ogDescription
      }
    } else {
      const shouldUpdateTitle = !bookmark.title || bookmark.title.trim() === ''
      const shouldUpdateDescription = !bookmark.description || bookmark.description?.trim() === ''

      console.log(`[BookmarkMetadataService] shouldUpdateTitle: ${shouldUpdateTitle}`)
      console.log(`[BookmarkMetadataService] shouldUpdateDescription: ${shouldUpdateDescription}`)

      if (shouldUpdateTitle && metadata.ogTitle) {
        console.log(`[BookmarkMetadataService] Will update title to: "${metadata.ogTitle}"`)
        updates.title = metadata.ogTitle
      } else {
        console.log(
          `[BookmarkMetadataService] Title not updated. shouldUpdateTitle: ${shouldUpdateTitle}, ogTitle: ${metadata.ogTitle}`
        )
      }

      if (shouldUpdateDescription && metadata.ogDescription) {
        console.log(
          `[BookmarkMetadataService] Will update description to: "${metadata.ogDescription}"`
        )
        updates.description = metadata.ogDescription
      } else {
        console.log(
          `[BookmarkMetadataService] Description not updated. shouldUpdateDescription: ${shouldUpdateDescription}, ogDescription: ${metadata.ogDescription}`
        )
      }
    }

    console.log(`[BookmarkMetadataService] Updates object:`, updates)
    console.log(
      `[BookmarkMetadataService] Object.keys(updates).length: ${Object.keys(updates).length}`
    )

    if (Object.keys(updates).length > 1) {
      bookmark.merge(updates)
      await bookmark.save()
      console.log(`[BookmarkMetadataService] Bookmark ${bookmarkId} saved with updates`)
    } else {
      bookmark.metadata = metadata
      await bookmark.save()
      console.log(`[BookmarkMetadataService] Bookmark ${bookmarkId} saved with metadata only`)
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
      fetchedAt: new Date().toISOString(),
    }

    console.log(`[BookmarkMetadataService] fetchAndUpdate result:`, metadata)

    await this.updateBookmarkMetadata(bookmarkId, metadata, forceUpdate)

    return metadata
  }
}
