import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import { readFile, writeFile } from 'node:fs/promises'
import { mkdir } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import {
  createBookmarkValidator,
  createBookmarkByUrlValidator,
  updateBookmarkValidator,
  bookmarkPaginationValidator,
  importBookmarkValidator,
} from '#validators/bookmark_validator'
import { BookmarkService } from '#services/bookmark_service'
import { BookmarkParserService } from '#services/bookmark_parser_service'
import ImportBookmark from '#jobs/import_bookmark'
import { IMPORT } from '#constants/index'

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
    return await this.bookmarkService.create(user.id, {
      url: data.url,
      title: data.title ?? null,
      description: data.description ?? null,
      tagIds: data.tagIds ?? undefined,
      autoFetch: data.autoFetch,
    })
  }

  async createByUrl({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createBookmarkByUrlValidator)
    return await this.bookmarkService.createByUrl(user.id, {
      url: data.url,
      tagIds: data.tagIds ?? undefined,
      autoFetch: data.autoFetch,
    })
  }

  async update({ auth, params, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(updateBookmarkValidator)
    return await this.bookmarkService.update(user.id, params.id, {
      title: data.title,
      url: data.url,
      description: data.description,
      tagIds: data.tagIds ?? undefined,
    })
  }

  async destroy({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    await this.bookmarkService.delete(user.id, params.id)
  }

  async refreshMetadata({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    await this.bookmarkService.refreshMetadata(user.id, params.id)
    return { message: 'Metadata refresh queued' }
  }

  async import({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const { file, createTags, skipDuplicates } =
      await request.validateUsing(importBookmarkValidator)

    if (!file.tmpPath) {
      throw new Exception('文件上传失败', { status: 400 })
    }

    const fileSize = file.size || 0

    if (fileSize <= IMPORT.ASYNC_SIZE_THRESHOLD) {
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
        mode: 'sync',
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

    const jobId = randomUUID()
    const tempPath = `${IMPORT.TEMP_DIR}/${jobId}.html`

    await mkdir(IMPORT.TEMP_DIR, { recursive: true })
    const htmlContent = await readFile(file.tmpPath, { encoding: 'utf-8' })
    await writeFile(tempPath, htmlContent)

    await ImportBookmark.dispatch({
      jobId,
      userId: user.id,
      filePath: tempPath,
      createTags: createTags ?? true,
      skipDuplicates: skipDuplicates ?? true,
    })

    return {
      mode: 'async',
      data: {
        jobId,
        status: 'waiting',
        progress: 0,
      },
    }
  }

  async importStatus({ params }: HttpContext) {
    const { jobId } = params
    const { default: redis } = await import('@adonisjs/redis/services/main')

    const statusJson = await redis.get(`import:status:${jobId}`)

    if (statusJson) {
      const status = JSON.parse(statusJson)

      if (status.status === 'completed') {
        const resultJson = await redis.get(`import:result:${jobId}`)
        if (resultJson) {
          const result = JSON.parse(resultJson)
          return {
            jobId,
            status: 'completed',
            progress: 100,
            total: result.total,
            imported: result.imported,
            skipped: result.skipped,
            errors: result.errors,
            tagsCreated: result.tagsCreated,
            errorsList: result.errorsList,
            completedAt: result.completedAt,
          }
        }
      }

      if (status.status === 'failed') {
        return {
          jobId,
          status: 'failed',
          progress: status.progress,
          error: status.error,
        }
      }

      return {
        jobId,
        status: status.status,
        progress: status.progress,
      }
    }

    const resultJson = await redis.get(`import:result:${jobId}`)

    if (resultJson) {
      const result = JSON.parse(resultJson)
      return {
        jobId,
        status: 'completed',
        progress: 100,
        total: result.total,
        imported: result.imported,
        skipped: result.skipped,
        errors: result.errors,
        tagsCreated: result.tagsCreated,
        errorsList: result.errorsList,
        completedAt: result.completedAt,
      }
    }

    return {
      jobId,
      status: 'waiting',
      progress: 0,
    }
  }
}
