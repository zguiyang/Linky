import Memo from '#models/memo'
import { Exception } from '@adonisjs/core/exceptions'
import Database from '@adonisjs/lucid/services/db'

export class MemoService {
  async create(
    userId: number,
    data: { title: string; content: string; isPinned?: boolean; tagIds?: number[] }
  ) {
    const memo = await Memo.create({
      title: data.title,
      content: data.content,
      isPinned: data.isPinned || false,
      userId,
    })

    if (data.tagIds && data.tagIds.length > 0) {
      await memo.related('tags').sync(data.tagIds)
    }

    return memo
  }

  async findAll(userId: number) {
    return await Memo.query()
      .where('user_id', userId)
      .preload('tags')
      .orderBy('is_pinned', 'desc')
      .orderBy('created_at', 'desc')
  }

  async paginate(
    userId: number,
    page: number = 1,
    perPage: number = 20,
    options?: { search?: string; tagIds?: number[] }
  ) {
    let query = Memo.query().where('user_id', userId).preload('tags')

    if (options?.search && options.search.trim()) {
      const searchTerm = `%${options.search.trim()}%`
      query = query.where((qb) => {
        qb.where('title', 'like', searchTerm)
          .orWhere('content', 'like', searchTerm)
          .orWhereExists((subQb) => {
            subQb
              .from('tags')
              .join('memo_tag', 'tags.id', '=', 'memo_tag.tag_id')
              .where('memo_tag.memo_id', '=', Database.ref('memos.id'))
              .andWhere('tags.name', 'like', searchTerm)
          })
      })
    }

    if (options?.tagIds && options.tagIds.length > 0) {
      query = query.whereExists((qb) => {
        qb.from('tags')
          .join('memo_tag', 'tags.id', '=', 'memo_tag.tag_id')
          .where('memo_tag.memo_id', '=', Database.ref('memos.id'))
          .whereIn('tags.id', options.tagIds!)
      })
    }

    return await query
      .orderBy('is_pinned', 'desc')
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)
  }

  async findById(userId: number, memoId: number) {
    const memo = await Memo.query()
      .where('id', memoId)
      .where('user_id', userId)
      .preload('tags')
      .first()

    if (!memo) {
      throw new Exception('备忘录不存在', { status: 404 })
    }

    return memo
  }

  async update(
    userId: number,
    memoId: number,
    data: { title?: string; content?: string; isPinned?: boolean; tagIds?: number[] }
  ) {
    const memo = await Memo.query().where('id', memoId).where('user_id', userId).first()

    if (!memo) {
      throw new Exception('备忘录不存在', { status: 404 })
    }

    const updateData: {
      title?: string
      content?: string
      isPinned?: boolean
    } = {}

    if (data.title !== undefined) {
      updateData.title = data.title
    }
    if (data.content !== undefined) {
      updateData.content = data.content
    }
    if (data.isPinned !== undefined) {
      updateData.isPinned = data.isPinned
    }

    if (Object.keys(updateData).length > 0) {
      memo.merge(updateData)
      await memo.save()
    }

    if (data.tagIds !== undefined) {
      await memo.related('tags').sync(data.tagIds)
    }

    return memo
  }

  async delete(userId: number, memoId: number) {
    const memo = await Memo.query().where('id', memoId).where('user_id', userId).first()

    if (!memo) {
      throw new Exception('备忘录不存在', { status: 404 })
    }

    await memo.delete()
  }
}
