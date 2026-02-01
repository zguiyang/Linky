import { DateTime } from 'luxon'
import Tag from '#models/tag'
import Bookmark from '#models/bookmark'
import Memo from '#models/memo'
import { Exception } from '@adonisjs/core/exceptions'
import Database from '@adonisjs/lucid/services/db'
import { PAGINATION, SORT_ORDER } from '#constants/index'

interface TagItem {
  type: 'bookmark' | 'memo'
  id: number
  title: string
  url?: string | null
  content?: string | null
  createdAt: DateTime
  tags: Array<{ id: number; name: string; color: string | null }>
}

interface TagItemsResult {
  data: TagItem[]
  meta: {
    total: number
    page: number
    perPage: number
    lastPage: number
  }
}

export class TagService {
  async create(userId: number, data: { name: string; color?: string }) {
    const existingTag = await Tag.query().where('user_id', userId).where('name', data.name).first()

    if (existingTag) {
      throw new Exception('标签名称已存在', { status: 409 })
    }

    return await Tag.create({
      name: data.name,
      color: data.color || null,
      userId,
    })
  }

  async findAll(userId: number) {
    return await Tag.query()
      .where('user_id', userId)
      .select(
        '*',
        Database.from('bookmark_tags')
          .count('*')
          .whereColumn('bookmark_tags.tag_id', 'tags.id')
          .as('bookmarks_count')
      )
      .select(
        Database.from('memo_tags')
          .count('*')
          .whereColumn('memo_tags.tag_id', 'tags.id')
          .as('memos_count')
      )
      .orderBy('name', 'asc')
  }

  async findById(userId: number, tagId: number) {
    const tag = await Tag.query()
      .where('id', tagId)
      .where('user_id', userId)
      .select(
        '*',
        Database.from('bookmark_tags')
          .count('*')
          .whereColumn('bookmark_tags.tag_id', 'tags.id')
          .as('bookmarks_count')
      )
      .select(
        Database.from('memo_tags')
          .count('*')
          .whereColumn('memo_tags.tag_id', 'tags.id')
          .as('memos_count')
      )
      .first()

    if (!tag) {
      throw new Exception('标签不存在', { status: 404 })
    }

    return tag
  }

  async update(userId: number, tagId: number, data: { name?: string; color?: string }) {
    const tag = await this.findById(userId, tagId)

    if (data.name && data.name !== tag.name) {
      const existingTag = await Tag.query()
        .where('user_id', userId)
        .where('name', data.name)
        .whereNot('id', tagId)
        .first()

      if (existingTag) {
        throw new Exception('标签名称已存在', { status: 409 })
      }
    }

    tag.merge(data)
    await tag.save()
    return tag
  }

  async delete(userId: number, tagId: number) {
    const tag = await this.findById(userId, tagId)

    if (tag.bookmarksCount > 0 || tag.memosCount > 0) {
      throw new Exception('该标签有关联的书签或备忘录，无法删除', { status: 409 })
    }

    await tag.delete()
  }

  async getItems(
    userId: number,
    tagId: number,
    options: {
      page?: number
      perPage?: number
      sortOrder?: 'asc' | 'desc'
      type: 'bookmark' | 'memo'
    }
  ): Promise<TagItemsResult> {
    await this.findById(userId, tagId)

    const page = options.page || PAGINATION.DEFAULT_PAGE
    const perPage = options.perPage || PAGINATION.DEFAULT_PER_PAGE
    const sortOrder = options.sortOrder || SORT_ORDER.ASC

    const offset = (page - 1) * perPage

    if (options.type === 'bookmark') {
      return await this.queryBookmarks(userId, tagId, { page, perPage, sortOrder, offset })
    } else {
      return await this.queryMemos(userId, tagId, { page, perPage, sortOrder, offset })
    }
  }

  private async queryBookmarks(
    userId: number,
    tagId: number,
    options: { page: number; perPage: number; sortOrder: 'asc' | 'desc'; offset: number }
  ): Promise<TagItemsResult> {
    const { page, perPage, sortOrder, offset } = options

    const subquery = Database.from('bookmark_tags').select('bookmark_id').where('tag_id', tagId)

    const itemsResult = await Bookmark.query()
      .from('bookmarks')
      .select('id', 'title', 'url', 'created_at')
      .where('user_id', userId)
      .whereIn('id', subquery)
      .orderBy('created_at', sortOrder)
      .offset(offset)
      .limit(perPage)

    const totalResult = await Database.from('bookmark_tags')
      .count('* as total')
      .where('tag_id', tagId)
    const total = Number(totalResult[0]?.total || 0)
    const lastPage = Math.ceil(total / perPage)

    const items: TagItem[] = await Promise.all(
      itemsResult.map(async (bookmark) => {
        await bookmark.load('tags')
        return {
          type: 'bookmark' as const,
          id: bookmark.id,
          title: bookmark.title,
          url: bookmark.url,
          content: null,
          createdAt: bookmark.createdAt,
          tags: bookmark.tags.map((t) => ({
            id: t.id,
            name: t.name,
            color: t.color,
          })),
        }
      })
    )

    return {
      data: items,
      meta: {
        total,
        page,
        perPage,
        lastPage,
      },
    }
  }

  private async queryMemos(
    userId: number,
    tagId: number,
    options: { page: number; perPage: number; sortOrder: 'asc' | 'desc'; offset: number }
  ): Promise<TagItemsResult> {
    const { page, perPage, sortOrder, offset } = options

    const subquery = Database.from('memo_tags').select('memo_id').where('tag_id', tagId)

    const itemsResult = await Memo.query()
      .from('memos')
      .select('id', 'title', 'content', 'created_at')
      .where('user_id', userId)
      .whereIn('id', subquery)
      .orderBy('created_at', sortOrder)
      .offset(offset)
      .limit(perPage)

    const totalResult = await Database.from('memo_tags').count('* as total').where('tag_id', tagId)
    const total = Number(totalResult[0]?.total || 0)
    const lastPage = Math.ceil(total / perPage)

    const items: TagItem[] = await Promise.all(
      itemsResult.map(async (memo) => {
        await memo.load('tags')
        return {
          type: 'memo' as const,
          id: memo.id,
          title: memo.title,
          url: null,
          content: memo.content,
          createdAt: memo.createdAt,
          tags: memo.tags.map((t) => ({
            id: t.id,
            name: t.name,
            color: t.color,
          })),
        }
      })
    )

    return {
      data: items,
      meta: {
        total,
        page,
        perPage,
        lastPage,
      },
    }
  }
}
