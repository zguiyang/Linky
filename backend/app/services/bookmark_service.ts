import Bookmark from '#models/bookmark'
import { Exception } from '@adonisjs/core/exceptions'

export class BookmarkService {
  async create(
    userId: number,
    data: { title: string; url: string; description?: string; tagIds?: number[] }
  ) {
    const existingBookmark = await Bookmark.query()
      .where('user_id', userId)
      .where('url', data.url)
      .first()

    if (existingBookmark) {
      throw new Exception('书签 URL 已存在', { status: 409 })
    }

    const bookmark = await Bookmark.create({
      title: data.title,
      url: data.url,
      description: data.description || null,
      userId,
    })

    if (data.tagIds && data.tagIds.length > 0) {
      await bookmark.related('tags').sync(data.tagIds)
    }

    return bookmark
  }

  async findAll(userId: number) {
    return await Bookmark.query()
      .where('user_id', userId)
      .preload('tags')
      .orderBy('created_at', 'desc')
  }

  async paginate(userId: number, page: number = 1, perPage: number = 20) {
    return await Bookmark.query()
      .where('user_id', userId)
      .preload('tags')
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)
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
      description?: string | null
    } = {}

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

    await bookmark.delete()
  }
}
