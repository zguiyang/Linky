import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import { type ManyToMany } from '@adonisjs/lucid/types/relations'
import type { BookmarkMetadata } from '#types/bookmark'
import User from '#models/user'
import Tag from '#models/tag'

export default class Bookmark extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare url: string

  @column()
  declare description: string | null

  @column({ columnName: 'visit_count' })
  declare visitCount: number

  @column({ columnName: 'metadata', serializeAs: null })
  declare metadata: BookmarkMetadata | null

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Tag, {
    pivotTable: 'bookmark_tags',
    pivotForeignKey: 'bookmark_id',
    pivotRelatedForeignKey: 'tag_id',
  })
  declare tags: ManyToMany<typeof Tag>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  public serialize() {
    const tags = this.$preloaded?.tags as Tag[] | undefined

    return {
      id: this.id,
      title: this.title,
      url: this.url,
      description: this.description,
      visit_count: this.visitCount,
      metadata: this.metadata,
      user_id: this.userId,
      tags: tags?.map((tag) => ({ id: tag.id, name: tag.name })) ?? [],
      created_at: this.createdAt.toISO(),
      updated_at: this.updatedAt?.toISO(),
    }
  }
}
