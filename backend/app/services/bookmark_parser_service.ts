import { Exception } from '@adonisjs/core/exceptions'
import { JSDOM } from 'jsdom'
import Bookmark from '#models/bookmark'
import Tag from '#models/tag'

export interface ParsedBookmark {
  title: string
  url: string
  addDate: number
  icon?: string
  tags: string[]
}

export interface ParsedFolder {
  name: string
  bookmarks: ParsedBookmark[]
  children: ParsedFolder[]
  addDate: number
  lastModified: number
}

export interface ParseResult {
  bookmarks: ParsedBookmark[]
  totalCount: number
  errors: ParseError[]
}

export interface ParseError {
  title?: string
  url?: string
  reason: string
}

export class BookmarkParserService {
  private static readonly NETSCAPE_BOOKMARK_HEADER = 'NETSCAPE-Bookmark-file-1'

  async parseHtml(htmlContent: string): Promise<ParseResult> {
    const result: ParseResult = {
      bookmarks: [],
      totalCount: 0,
      errors: [],
    }

    if (!htmlContent.includes(BookmarkParserService.NETSCAPE_BOOKMARK_HEADER)) {
      throw new Exception('无效的书签文件格式', { status: 400 })
    }

    try {
      const dom = new JSDOM(htmlContent)
      const document = dom.window.document

      const dlElement = document.querySelector('dl')
      if (!dlElement) {
        throw new Exception('无法找到书签根元素', { status: 400 })
      }

      const folder = this.parseDlElement(dlElement, '')
      result.bookmarks = this.flattenFolder(folder)
      result.totalCount = result.bookmarks.length
    } catch (error) {
      if (error instanceof Exception) {
        throw error
      }
      throw new Exception(
        `解析书签文件失败: ${error instanceof Error ? error.message : '未知错误'}`,
        { status: 400 }
      )
    }

    return result
  }

  private parseDlElement(dlElement: Element, parentFolderName: string): ParsedFolder {
    const bookmarks: ParsedBookmark[] = []
    const children: ParsedFolder[] = []
    let addDate = 0
    let lastModified = 0

    const childNodes = dlElement.childNodes

    for (const node of childNodes) {
      if (node.nodeType !== 1) continue

      const element = node as Element

      if (element.tagName.toLowerCase() === 'dt') {
        const h3Element = element.querySelector('h3')
        if (h3Element) {
          const folderName = h3Element.textContent?.trim() || ''
          addDate = this.parseDate(h3Element.getAttribute('add_date'))
          lastModified = this.parseDate(h3Element.getAttribute('last_modified'))

          const nestedDl = this.findNextDlSibling(h3Element)
          if (nestedDl) {
            const childFolder = this.parseDlElement(nestedDl, folderName)
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

            if (url && this.isValidUrl(url)) {
              const addDateVal = this.parseDate(aElement.getAttribute('add_date'))
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

  private findNextDlSibling(h3Element: Element): Element | null {
    let nextSibling = h3Element.nextSibling
    while (nextSibling) {
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
    return null
  }

  private parseDate(value: string | null): number {
    if (!value) return 0
    const parsed = Number.parseInt(value, 10)
    return Number.isNaN(parsed) ? 0 : parsed
  }

  private isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url)
      return parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {
      return false
    }
  }

  private flattenFolder(folder: ParsedFolder): ParsedBookmark[] {
    return folder.bookmarks
  }

  async processImport(
    userId: number,
    parsedBookmarks: ParsedBookmark[],
    {
      createTags = true,
      skipDuplicates = true,
    }: { createTags?: boolean; skipDuplicates?: boolean } = {}
  ) {
    const importResult = {
      total: parsedBookmarks.length,
      imported: 0,
      skipped: 0,
      errors: 0,
      tagsCreated: 0,
      errorsList: [] as Array<{ title: string; url: string; reason: string }>,
    }

    const tagNameToId = new Map<string, number>()

    for (const bookmark of parsedBookmarks) {
      try {
        if (!bookmark.title || !bookmark.url) {
          importResult.errors++
          importResult.errorsList.push({
            title: bookmark.title || '未知',
            url: bookmark.url || '未知',
            reason: '缺少标题或URL',
          })
          continue
        }

        if (bookmark.title.length > 200) {
          importResult.errors++
          importResult.errorsList.push({
            title: bookmark.title.substring(0, 50) + '...',
            url: bookmark.url,
            reason: '标题超过200字符限制',
          })
          continue
        }

        if (skipDuplicates) {
          const existing = await Bookmark.query()
            .where('user_id', userId)
            .where('url', bookmark.url)
            .first()

          if (existing) {
            importResult.skipped++
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

        await Bookmark.create({
          title: bookmark.title,
          url: bookmark.url,
          description: null,
          userId,
          visitCount: 0,
        })

        if (tagIds.length > 0) {
          const newBookmark = await Bookmark.query()
            .where('user_id', userId)
            .where('url', bookmark.url)
            .first()

          if (newBookmark) {
            await newBookmark.related('tags').sync(tagIds)
          }
        }

        importResult.imported++
      } catch (error) {
        importResult.errors++
        importResult.errorsList.push({
          title: bookmark.title || '未知',
          url: bookmark.url || '未知',
          reason: error instanceof Error ? error.message : '未知错误',
        })
      }
    }

    return importResult
  }
}
