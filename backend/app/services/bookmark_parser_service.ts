import { Exception } from '@adonisjs/core/exceptions'
import { JSDOM } from 'jsdom'
import Bookmark from '#models/bookmark'
import Tag from '#models/tag'
import type { ParsedBookmark, ParsedFolder, ParseResult } from '#types/bookmark'

export interface ImportResult {
  total: number
  imported: number
  skipped: number
  errors: number
  tagsCreated: number
  errorsList: Array<{ title: string; url: string; reason: string }>
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
    console.warn('findNextDlSibling: 达到最大迭代次数限制')
  }

  return null
}

async function parseHtml(htmlContent: string): Promise<ParseResult> {
  const result: ParseResult = {
    bookmarks: [],
    totalCount: 0,
    errors: [],
  }

  if (!htmlContent.includes(NETSCAPE_BOOKMARK_HEADER)) {
    throw new Error('无效的书签文件格式')
  }

  try {
    const dom = new JSDOM(htmlContent)
    const document = dom.window.document

    const dlElement = document.querySelector('dl')
    if (!dlElement) {
      throw new Error('无法找到书签根元素')
    }

    const folder = parseDlElement(dlElement, '')
    result.bookmarks = folder.bookmarks
    result.totalCount = result.bookmarks.length
  } catch (error) {
    throw new Error(`解析书签文件失败: ${error instanceof Error ? error.message : '未知错误'}`)
  }

  return result
}

export class BookmarkParserService {
  async parseHtml(htmlContent: string): Promise<ParseResult> {
    if (!htmlContent.includes(NETSCAPE_BOOKMARK_HEADER)) {
      throw new Exception('无效的书签文件格式', { status: 400 })
    }

    try {
      const result = await parseHtml(htmlContent)
      return result
    } catch (error) {
      throw new Exception(
        `解析书签文件失败: ${error instanceof Error ? error.message : '未知错误'}`,
        { status: 400 }
      )
    }
  }

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

  async processImport(
    userId: number,
    parsedBookmarks: ParsedBookmark[],
    {
      createTags = true,
      skipDuplicates = true,
      autoFetch = true,
      autoAiTag = true,
      onProgress,
    }: {
      createTags?: boolean
      skipDuplicates?: boolean
      autoFetch?: boolean
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
            title: bookmark.title || '未知',
            url: bookmark.url || '未知',
            reason: '缺少标题或URL',
          })
          onProgress?.(index + 1, parsedBookmarks.length, bookmark.title)
          continue
        }

        if (bookmark.title.length > 200) {
          importResult.errors++
          importResult.errorsList.push({
            title: bookmark.title.substring(0, 50) + '...',
            url: bookmark.url,
            reason: '标题超过200字符限制',
          })
          onProgress?.(index + 1, parsedBookmarks.length, bookmark.title)
          continue
        }

        if (skipDuplicates) {
          const existing = await Bookmark.query()
            .where('user_id', userId)
            .where('url', bookmark.url)
            .first()

          if (existing) {
            importResult.skipped++
            onProgress?.(index + 1, parsedBookmarks.length, bookmark.title)
            continue
          }
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
                tag = await Tag.create({
                  name: normalizedName,
                  userId,
                  color: null,
                })
                importResult.tagsCreated++
              }

              tagId = tag.id
              tagNameToId.set(normalizedName, tagId)
            }

            tagIds.push(tagId)
          }
        }

        const newBookmark = await Bookmark.create({
          title: bookmark.title,
          url: bookmark.url,
          description: null,
          userId,
          visitCount: 0,
        })

        if (autoFetch) {
          await this.scheduleMetadataFetch(newBookmark.id, bookmark.url, true, autoAiTag)
        }

        if (tagIds.length > 0) {
          const bookmarkWithTags = await Bookmark.query()
            .where('user_id', userId)
            .where('url', bookmark.url)
            .first()

          if (bookmarkWithTags) {
            await bookmarkWithTags.related('tags').sync(tagIds)
          }
        }

        importResult.imported++
        onProgress?.(index + 1, parsedBookmarks.length, bookmark.title)
      } catch (error) {
        importResult.errors++
        importResult.errorsList.push({
          title: bookmark.title || '未知',
          url: bookmark.url || '未知',
          reason: error instanceof Error ? error.message : '未知错误',
        })
        onProgress?.(index + 1, parsedBookmarks.length, bookmark.title)
      }
    }

    return importResult
  }
}

export { parseHtml }
