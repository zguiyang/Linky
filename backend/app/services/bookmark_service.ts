import { inject } from '@adonisjs/core'
import Database from '@adonisjs/lucid/services/db'
import Bookmark from '#models/bookmark'
import { Exception } from '@adonisjs/core/exceptions'
import type { BookmarkMetadata } from '#types/bookmark'
import { BOOKMARK_STATUS } from '#constants/index'

interface FindByTagIdResult {
  data: Bookmark[]
  total: number
  lastPage: number
}

@inject()
export class BookmarkService {
  async create(
    userId: number,
    data: {
      url: string
      title?: string | null
      description?: string | null
      tagIds?: number[]
      autoAiTag?: boolean
    }
  ) {
    const existingBookmark = await Bookmark.query()
      .where('user_id', userId)
      .where('url', data.url)
      .first()

    if (existingBookmark) {
      throw new Exception('书签 URL 已存在', { status: 409 })
    }

    const bookmark = await Bookmark.create({
      title: data.title || '',
      url: data.url,
      description: data.description ?? null,
      userId,
      status: BOOKMARK_STATUS.FETCHING,
    })

    if (data.tagIds && data.tagIds.length > 0) {
      await bookmark.related('tags').sync(data.tagIds)
    }

    await this.scheduleMetadataFetch(bookmark.id, data.url, data.autoAiTag)

    return bookmark
  }

  async createByUrl(
    userId: number,
    data: {
      url: string
      tagIds?: number[]
      autoAiTag?: boolean
    }
  ) {
    return await this.create(userId, {
      url: data.url,
      title: null,
      description: null,
      tagIds: data.tagIds,
      autoAiTag: data.autoAiTag,
    })
  }

  private async scheduleMetadataFetch(
    bookmarkId: number,
    url: string,
    autoAiTag?: boolean
  ): Promise<void> {
    const { default: FetchBookmarkMetadata } = await import('#jobs/fetch_bookmark_metadata')
    await FetchBookmarkMetadata.dispatch({ bookmarkId, url, autoAiTag: autoAiTag !== false })
  }

  async updateMetadata(
    userId: number,
    bookmarkId: number,
    metadata: BookmarkMetadata
  ): Promise<Bookmark> {
    const bookmark = await Bookmark.query().where('id', bookmarkId).where('user_id', userId).first()

    if (!bookmark) {
      throw new Exception('书签不存在', { status: 404 })
    }

    bookmark.metadata = metadata
    await bookmark.save()

    return bookmark
  }

  async refreshMetadata(userId: number, bookmarkId: number): Promise<{ queued: boolean }> {
    const bookmark = await Bookmark.query().where('id', bookmarkId).where('user_id', userId).first()

    if (!bookmark) {
      throw new Exception('书签不存在', { status: 404 })
    }

    if (bookmark.status === BOOKMARK_STATUS.FETCHING) {
      throw new Exception('书签正在抓取元数据，请稍后再试', { status: 400 })
    }

    await this.scheduleMetadataFetch(bookmarkId, bookmark.url, true)
    return { queued: true }
  }

  async getFetchingCount(userId: number): Promise<number> {
    const result = await Bookmark.query()
      .where('user_id', userId)
      .andWhere('status', BOOKMARK_STATUS.FETCHING)
      .count('* as total')

    return Number(result[0].$extras.total || 0)
  }

  async findAll(userId: number) {
    return await Bookmark.query()
      .where('user_id', userId)
      .preload('tags')
      .orderBy('created_at', 'desc')
  }

  async paginate(
    userId: number,
    options: {
      page?: number
      perPage?: number
      search?: string
      tagIds?: number[]
      sortBy?: 'createdAt' | 'updatedAt'
      sortOrder?: 'asc' | 'desc'
    } = {}
  ) {
    const {
      page = 1,
      perPage = 20,
      search,
      tagIds,
      sortBy = 'updatedAt',
      sortOrder = 'desc',
    } = options

    let query = Bookmark.query().where('user_id', userId)

    if (search) {
      const pattern = `%${search}%`
      query = query.where((q) => {
        q.whereILike('title', pattern)
          .orWhereILike('url', pattern)
          .orWhereILike('description', pattern)
      })
    }

    if (tagIds && tagIds.length > 0) {
      query = query.whereHas('tags', (q) => {
        q.whereIn('id', tagIds)
      })
    }

    const fieldMap: Record<string, string> = {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }

    const dbSortBy = fieldMap[sortBy] || sortBy

    return await query.preload('tags').orderBy(dbSortBy, sortOrder).paginate(page, perPage)
  }

  async findById(userId: number, bookmarkId: number) {
    const bookmark = await Bookmark.query()
      .where('id', bookmarkId)
      .where('user_id', userId)
      .preload('tags')
      .first()

    if (!bookmark) {
      throw new Exception('书签不存在', { status: 404 })
    }

    return bookmark
  }

  async update(
    userId: number,
    bookmarkId: number,
    data: { title?: string; url?: string; description?: string; tagIds?: number[] }
  ) {
    const bookmark = await Bookmark.query().where('id', bookmarkId).where('user_id', userId).first()

    if (!bookmark) {
      throw new Exception('书签不存在', { status: 404 })
    }

    if (bookmark.status === BOOKMARK_STATUS.FETCHING) {
      throw new Exception('书签正在抓取元数据，请稍后再试', { status: 400 })
    }

    if (data.url && data.url !== bookmark.url) {
      const existingBookmark = await Bookmark.query()
        .where('user_id', userId)
        .where('url', data.url)
        .whereNot('id', bookmarkId)
        .first()

      if (existingBookmark) {
        throw new Exception('书签 URL 已存在', { status: 409 })
      }
    }

    const updateData: {
      title?: string
      url?: string
      description: string | null
      status?: string
    } = {
      description: bookmark.description,
    }

    if (data.title !== undefined || data.description !== undefined) {
      updateData.status = BOOKMARK_STATUS.ACTIVE
    }

    if (data.title !== undefined) {
      updateData.title = data.title
    }
    if (data.url !== undefined) {
      updateData.url = data.url
    }
    if (data.description !== undefined) {
      updateData.description = data.description
    }

    bookmark.merge(updateData)
    await bookmark.save()

    if (data.tagIds !== undefined) {
      await bookmark.related('tags').sync(data.tagIds)
    }

    return bookmark
  }

  async delete(userId: number, bookmarkId: number) {
    const bookmark = await Bookmark.query().where('id', bookmarkId).where('user_id', userId).first()

    if (!bookmark) {
      throw new Exception('书签不存在', { status: 404 })
    }

    if (bookmark.status === BOOKMARK_STATUS.FETCHING) {
      throw new Exception('书签正在抓取元数据，请稍后再试', { status: 400 })
    }

    await bookmark.delete()
  }

  async getImportStatus(jobId: string) {
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
        current: status.current,
      }
    }

    return null
  }

  async findByTagId(
    userId: number,
    tagId: number,
    options: { page?: number; perPage?: number; sortOrder?: 'asc' | 'desc' } = {}
  ): Promise<FindByTagIdResult> {
    const { page = 1, perPage = 20, sortOrder = 'desc' } = options

    const subquery = Database.from('bookmark_tags').select('bookmark_id').where('tag_id', tagId)

    const query = Bookmark.query()
      .from('bookmarks')
      .select(
        'id',
        'title',
        'url',
        'description',
        'user_id',
        'status',
        'metadata',
        'created_at',
        'updated_at'
      )
      .where('user_id', userId)
      .whereIn('id', subquery)
      .preload('tags')
      .orderBy('created_at', sortOrder)

    const paginatedResult = await query.paginate(page, perPage)

    return {
      data: paginatedResult.all(),
      total: paginatedResult.total,
      lastPage: paginatedResult.lastPage,
    }
  }

  async findManyByTagIds(userId: number, tagIds: number[], limit: number): Promise<Bookmark[]> {
    const subquery = Database.from('bookmark_tags')
      .select('bookmark_id')
      .whereIn('tag_id', tagIds)
      .distinct()

    const bookmarks = await Bookmark.query()
      .where('user_id', userId)
      .whereIn('id', subquery)
      .orderBy('created_at', 'desc')
      .limit(limit)
      .preload('tags')

    return bookmarks
  }
}
