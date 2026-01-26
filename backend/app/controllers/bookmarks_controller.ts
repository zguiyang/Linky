import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import { readFile } from 'node:fs/promises'
import {
  createBookmarkValidator,
  updateBookmarkValidator,
  bookmarkPaginationValidator,
  importBookmarkValidator,
} from '#validators/bookmark_validator'
import { BookmarkService } from '#services/bookmark_service'
import { BookmarkParserService } from '#services/bookmark_parser_service'

@inject()
export default class BookmarksController {
  constructor(
    private bookmarkService: BookmarkService,
    private bookmarkParserService: BookmarkParserService
  ) {}

  async index({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return await this.bookmarkService.findAll(user.id)
  }

  async paginate({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(bookmarkPaginationValidator)
    return await this.bookmarkService.paginate(user.id, {
      page: data.page,
      perPage: data.perPage,
      search: data.search,
      tagIds: data.tagIds,
      sortBy: data.sortBy,
      sortOrder: data.sortOrder,
    })
  }

  async show({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    return await this.bookmarkService.findById(user.id, params.id)
  }

  async store({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createBookmarkValidator)
    return await this.bookmarkService.create(user.id, data)
  }

  async update({ auth, params, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(updateBookmarkValidator)
    return await this.bookmarkService.update(user.id, params.id, data)
  }

  async destroy({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    await this.bookmarkService.delete(user.id, params.id)
  }

  async import({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const { file, createTags, skipDuplicates } =
      await request.validateUsing(importBookmarkValidator)

    if (!file.tmpPath) {
      throw new Exception('文件上传失败', { status: 400 })
    }

    const htmlContent = await readFile(file.tmpPath, { encoding: 'utf-8' })
    const parseResult = await this.bookmarkParserService.parseHtml(htmlContent)

    const importResult = await this.bookmarkParserService.processImport(
      user.id,
      parseResult.bookmarks,
      {
        createTags: createTags ?? true,
        skipDuplicates: skipDuplicates ?? true,
      }
    )

    return {
      success: true,
      data: {
        total: importResult.total,
        imported: importResult.imported,
        skipped: importResult.skipped,
        errors: importResult.errors,
        tagsCreated: importResult.tagsCreated,
        errorsList: importResult.errorsList.slice(0, 50),
      },
    }
  }
}
