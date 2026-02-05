import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'
import Bookmark from '#models/bookmark'
import Memo from '#models/memo'
import Tag from '#models/tag'
import { SEARCH } from '#constants'

interface SearchResultItem {
  id: number
  title: string
  description: string | null
  url?: string
  tags: Array<{ id: number; name: string; color: string | null }>
  createdAt: string | null
  updatedAt: string | null
}

interface SearchResults {
  query: string
  bookmarks: SearchResultItem[]
  memos: SearchResultItem[]
  tags: SearchResultItem[]
}

@inject()
export class SearchService {
  /**
   * SearchService is a global search aggregator that queries multiple models.
   *
   * Direct model access is acceptable here because:
   * 1. This is a read-only operation (no business logic)
   * 2. Aggregating data from multiple sources is its core responsibility
   * 3. Going through individual services would add unnecessary complexity
   *
   * This follows CQRS principles where read operations can be handled differently from write operations.
   */
  async search(userId: number, query: string): Promise<SearchResults> {
    logger.info({ userId, query }, 'Executing global search')

    const [bookmarks, memos, tags] = await Promise.all([
      this.searchBookmarks(userId, query),
      this.searchMemos(userId, query),
      this.searchTags(userId, query),
    ])

    return {
      query,
      bookmarks,
      memos,
      tags,
    }
  }

  private async searchBookmarks(userId: number, query: string): Promise<SearchResultItem[]> {
    const pattern = `%${query}%`

    const bookmarks = await Bookmark.query()
      .where('user_id', userId)
      .where((q) => {
        q.whereILike('title', pattern)
          .orWhereILike('url', pattern)
          .orWhereILike('description', pattern)
      })
      .orderBy('updated_at', 'desc')
      .limit(SEARCH.RESULT_LIMIT)
      .preload('tags')

    return bookmarks.map((b) => ({
      id: b.id,
      title: b.title,
      description: b.description,
      url: b.url,
      tags: b.tags.map((t) => ({ id: t.id, name: t.name, color: t.color })),
      createdAt: b.createdAt.toISO(),
      updatedAt: b.updatedAt?.toISO() ?? null,
    }))
  }

  private async searchMemos(userId: number, query: string): Promise<SearchResultItem[]> {
    const pattern = `%${query}%`

    const memos = await Memo.query()
      .where('user_id', userId)
      .where((q) => {
        q.whereILike('title', pattern).orWhereILike('content', pattern)
      })
      .orderBy('updated_at', 'desc')
      .limit(SEARCH.RESULT_LIMIT)
      .preload('tags')

    return memos.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.content.slice(0, 100),
      tags: m.tags.map((t) => ({ id: t.id, name: t.name, color: t.color })),
      createdAt: m.createdAt.toISO(),
      updatedAt: m.updatedAt?.toISO() ?? null,
    }))
  }

  private async searchTags(userId: number, query: string): Promise<SearchResultItem[]> {
    const pattern = `%${query}%`

    const tags = await Tag.query()
      .where('user_id', userId)
      .whereILike('name', pattern)
      .orderBy('created_at', 'desc')
      .limit(SEARCH.RESULT_LIMIT)

    return tags.map((t) => ({
      id: t.id,
      title: t.name,
      description: null,
      tags: [],
      createdAt: t.createdAt.toISO(),
      updatedAt: t.updatedAt?.toISO() ?? null,
    }))
  }
}
