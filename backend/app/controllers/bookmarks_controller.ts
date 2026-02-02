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
import ImportBookmark from '#jobs/import_bookmark'
import { IMPORT } from '#constants/index'

@inject()
export default class BookmarksController {
  constructor(private bookmarkService: BookmarkService) {}

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
      autoAiTag: data.autoAiTag,
    })
  }

  async createByUrl({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createBookmarkByUrlValidator)
    return await this.bookmarkService.createByUrl(user.id, {
      url: data.url,
      tagIds: data.tagIds ?? undefined,
      autoAiTag: data.autoAiTag,
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

  async fetchingCount({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const count = await this.bookmarkService.getFetchingCount(user.id)
    return { count }
  }

  async import({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const { file, createTags, skipDuplicates, autoAiTag } =
      await request.validateUsing(importBookmarkValidator)

    if (!file.tmpPath) {
      throw new Exception('文件上传失败', { status: 400 })
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
      autoAiTag: autoAiTag ?? true,
    })

    return {
      jobId,
      status: 'waiting',
      progress: 0,
    }
  }

  async importStatus({ auth, params }: HttpContext) {
    await auth.getUserOrFail()
    const { jobId } = params

    const { default: redis } = await import('@adonisjs/redis/services/main')

    const resultKey = `import:result:${jobId}`
    const resultJson = await redis.get(resultKey)

    if (resultJson) {
      const result = JSON.parse(resultJson)
      return {
        total: result.total,
        imported: result.imported,
        skipped: result.skipped,
        errors: result.errors,
        tagsCreated: result.tagsCreated,
        errorsList: result.errorsList || [],
      }
    }

    const statusKey = `import:status:${jobId}`
    const statusJson = await redis.get(statusKey)

    if (statusJson) {
      const status = JSON.parse(statusJson)
      return {
        status: status.status,
        progress: status.progress,
      }
    }

    throw new Exception('导入任务不存在', { status: 404 })
  }
}
