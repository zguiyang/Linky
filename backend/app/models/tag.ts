import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany, computed } from '@adonisjs/lucid/orm'
import { type BelongsTo, type ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Bookmark from '#models/bookmark'
import Memo from '#models/memo'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare color: string | null

  @column()
  declare userId: number

  @column()
  declare isAiGenerated: boolean

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Bookmark, {
    pivotTable: 'bookmark_tags',
    pivotForeignKey: 'bookmark_id',
    pivotRelatedForeignKey: 'tag_id',
  })
  declare bookmarks: ManyToMany<typeof Bookmark>

  @manyToMany(() => Memo, {
    pivotTable: 'memo_tags',
    pivotForeignKey: 'memo_id',
    pivotRelatedForeignKey: 'tag_id',
  })
  declare memos: ManyToMany<typeof Memo>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @computed()
  get bookmarksCount() {
    return Number(this.$extras.bookmarks_count || 0)
  }

  @computed()
  get memosCount() {
    return Number(this.$extras.memos_count || 0)
  }
}
