import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import logger from '@adonisjs/core/services/logger'
import { JSDOM } from 'jsdom'
import type { ParsedBookmark, ParsedFolder, ParseResult } from '#types/bookmark'
import { VALIDATION } from '#constants'
import Tag from '#models/tag'
import { TagService } from './tag_service.js'
import { BookmarkService } from './bookmark_service.js'

export interface ImportResult {
  total: number
  imported: number
  skipped: number
  errors: number
  tagsCreated: number
  errorsList: Array<{ title: string; url: string; reason: string }>
}

@inject()
export class BookmarkParserService {
  constructor(
    private tagService: TagService,
    private bookmarkService: BookmarkService
  ) {}

  private async scheduleMetadataFetch(
    bookmarkId: number,
    url: string,
    forceUpdate: boolean = false,
    autoAiTag?: boolean
  ): Promise<void> {
    const { default: FetchBookmarkMetadata } = await import('#jobs/fetch_bookmark_metadata')
    await FetchBookmarkMetadata.dispatch({
      bookmarkId,
      url,
      forceUpdate,
      autoAiTag: autoAiTag !== false,
    })
  }

  private async parseHtmlInternal(htmlContent: string): Promise<ParseResult> {
    const result: ParseResult = {
      bookmarks: [],
      totalCount: 0,
      errors: [],
    }

    if (!htmlContent.includes(NETSCAPE_BOOKMARK_HEADER)) {
      throw new Exception('Invalid bookmark file format: missing NETSCAPE header', { status: 400 })
    }

    try {
      const dom = new JSDOM(htmlContent)
      const document = dom.window.document

      const dlElement = document.querySelector('dl')
      if (!dlElement) {
        throw new Exception('Cannot find bookmark root element', { status: 400 })
      }

      const folder = parseDlElement(dlElement, '')
      result.bookmarks = folder.bookmarks
      result.totalCount = result.bookmarks.length
    } catch (error) {
      throw new Exception(
        `Failed to parse bookmark file: ${error instanceof Error ? error.message : 'unknown error'}`,
        { status: 400 }
      )
    }

    return result
  }

  async parseHtml(htmlContent: string): Promise<ParseResult> {
    if (!htmlContent.includes(NETSCAPE_BOOKMARK_HEADER)) {
      throw new Exception('Invalid bookmark file format: missing NETSCAPE header', { status: 400 })
    }

    try {
      const result = await this.parseHtmlInternal(htmlContent)
      return result
    } catch (error) {
      if (error instanceof Exception) {
        throw error
      }
      throw new Exception(
        `Failed to parse bookmark file: ${error instanceof Error ? error.message : 'unknown error'}`,
        { status: 400 }
      )
    }
  }

  async processImport(
    userId: number,
    parsedBookmarks: ParsedBookmark[],
    {
      createTags = true,
      autoAiTag = true,
      onProgress,
    }: {
      createTags?: boolean
      autoAiTag?: boolean
      onProgress?: (current: number, total: number, currentTitle?: string) => void
    } = {}
  ): Promise<ImportResult> {
    const importResult: ImportResult = {
      total: parsedBookmarks.length,
      imported: 0,
      skipped: 0,
      errors: 0,
      tagsCreated: 0,
      errorsList: [],
    }

    const tagNameToId = new Map<string, number>()

    for (const [index, bookmark] of parsedBookmarks.entries()) {
      try {
        if (!bookmark.title || !bookmark.url) {
          importResult.errors++
          importResult.errorsList.push({
            title: bookmark.title || 'Unknown',
            url: bookmark.url || 'Unknown',
            reason: 'Missing title or URL',
          })
          onProgress?.(index + 1, parsedBookmarks.length, bookmark.title)
          continue
        }

        if (bookmark.title.length > VALIDATION.TITLE_MAX) {
          importResult.errors++
          importResult.errorsList.push({
            title: bookmark.title.substring(0, 50) + '...',
            url: bookmark.url,
            reason: `Title exceeds ${VALIDATION.TITLE_MAX} character limit`,
          })
          onProgress?.(index + 1, parsedBookmarks.length, bookmark.title)
          continue
        }

        let tagIds: number[] = []

        if (createTags && bookmark.tags.length > 0) {
          for (const tagName of bookmark.tags) {
            const normalizedName = tagName.trim()
            if (!normalizedName) continue

            let tagId = tagNameToId.get(normalizedName)
            if (!tagId) {
              let tag = await Tag.query()
                .where('user_id', userId)
                .where('name', normalizedName)
                .first()

              if (!tag) {
                tag = await this.tagService.create(userId, { name: normalizedName })
                importResult.tagsCreated++
              }

              tagId = tag.id
              tagNameToId.set(normalizedName, tagId)
            }

            tagIds.push(tagId)
          }
        }

        const newBookmark = await this.bookmarkService.createForImport(userId, {
          url: bookmark.url,
          title: bookmark.title,
          description: null,
          visitCount: 0,
        })

        if (tagIds.length > 0) {
          await newBookmark.related('tags').sync(tagIds)
        }

        await this.scheduleMetadataFetch(newBookmark.id, bookmark.url, true, autoAiTag)

        importResult.imported++
        onProgress?.(index + 1, parsedBookmarks.length, bookmark.title)
      } catch (error) {
        importResult.errors++
        importResult.errorsList.push({
          title: bookmark.title || 'Unknown',
          url: bookmark.url || 'Unknown',
          reason: error instanceof Error ? error.message : 'Unknown error',
        })
        onProgress?.(index + 1, parsedBookmarks.length, bookmark.title)
      }
    }

    return importResult
  }
}

const NETSCAPE_BOOKMARK_HEADER = 'NETSCAPE-Bookmark-file-1'

function parseDate(value: string | null): number {
  if (!value) return 0
  const parsed = Number.parseInt(value, 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function parseDlElement(dlElement: Element, parentFolderName: string): ParsedFolder {
  const bookmarks: ParsedBookmark[] = []
  const children: ParsedFolder[] = []
  let addDate = 0
  let lastModified = 0

  const childNodes = Array.from(dlElement.childNodes)

  for (const node of childNodes) {
    if (node.nodeType !== 1) continue

    const element = node as Element

    if (element.tagName.toLowerCase() === 'dt') {
      const h3Element = element.querySelector('h3')
      if (h3Element) {
        const folderName = h3Element.textContent?.trim() || ''
        addDate = parseDate(h3Element.getAttribute('add_date'))
        lastModified = parseDate(h3Element.getAttribute('last_modified'))

        const nestedDl = findNextDlSibling(h3Element)
        if (nestedDl) {
          const childFolder = parseDlElement(nestedDl, folderName)
          children.push(childFolder)
        }
      } else {
        const aElement = element.querySelector('a')
        if (aElement) {
          const url = aElement.getAttribute('href') || ''
          const title = (aElement.textContent || '')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&quot;/g, '"')
            .trim()

          if (url && isValidUrl(url)) {
            const addDateVal = parseDate(aElement.getAttribute('add_date'))
            const icon = aElement.getAttribute('icon') || undefined

            bookmarks.push({
              title: title || url,
              url,
              addDate: addDateVal,
              icon,
              tags: parentFolderName ? [parentFolderName] : [],
            })
          }
        }
      }
    }
  }

  for (const child of children) {
    for (const bookmark of child.bookmarks) {
      bookmark.tags = [child.name, ...bookmark.tags]
    }
    bookmarks.push(...child.bookmarks)
  }

  return {
    name: parentFolderName,
    bookmarks,
    children,
    addDate,
    lastModified,
  }
}

function findNextDlSibling(h3Element: Element): Element | null {
  let nextSibling = h3Element.nextSibling
  let iterations = 0
  const maxIterations = 1000

  while (nextSibling && iterations < maxIterations) {
    iterations++
    if (nextSibling.nodeType === 1) {
      const element = nextSibling as Element
      if (element.tagName.toLowerCase() === 'dl') {
        return element
      }
      if (element.tagName.toLowerCase() !== 'p') {
        break
      }
    }
    nextSibling = nextSibling.nextSibling
  }

  if (iterations >= maxIterations) {
    logger.warn({ iterations, maxIterations }, 'findNextDlSibling: reached max iteration limit')
  }

  return null
}
