import { Exception } from '@adonisjs/core/exceptions'
import Bookmark from '#models/bookmark'
import Tag from '#models/tag'
import { parseInWorker } from '#workers/bookmark_parser.worker'
import type { ParsedBookmark, ParseResult } from '#types/bookmark'

export interface ImportResult {
  total: number
  imported: number
  skipped: number
  errors: number
  tagsCreated: number
  errorsList: Array<{ title: string; url: string; reason: string }>
}

export class BookmarkParserService {
  private static readonly NETSCAPE_BOOKMARK_HEADER = 'NETSCAPE-Bookmark-file-1'

  async parseHtml(htmlContent: string): Promise<ParseResult> {
    if (!htmlContent.includes(BookmarkParserService.NETSCAPE_BOOKMARK_HEADER)) {
      throw new Exception('无效的书签文件格式', { status: 400 })
    }

    try {
      const result = await parseInWorker(htmlContent)
      return result
    } catch (error) {
      throw new Exception(
        `解析书签文件失败: ${error instanceof Error ? error.message : '未知错误'}`,
        { status: 400 }
      )
    }
  }

  async processImport(
    userId: number,
    parsedBookmarks: ParsedBookmark[],
    {
      createTags = true,
      skipDuplicates = true,
    }: { createTags?: boolean; skipDuplicates?: boolean } = {}
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
