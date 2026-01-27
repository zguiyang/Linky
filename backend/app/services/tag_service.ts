import Tag from '#models/tag'
import { Exception } from '@adonisjs/core/exceptions'

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
      .withCount('bookmarks')
      .withCount('memos')
      .orderBy('name', 'asc')
  }

  async findById(userId: number, tagId: number) {
    const tag = await Tag.query()
      .where('id', tagId)
      .where('user_id', userId)
      .withCount('bookmarks')
      .withCount('memos')
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
}
