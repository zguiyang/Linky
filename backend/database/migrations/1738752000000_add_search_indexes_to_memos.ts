import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'memos'

  async up() {
    await this.schema.raw(`CREATE EXTENSION IF NOT EXISTS pg_trgm`)

    this.schema.table(this.tableName, (table) => {
      table.index(['user_id', 'created_at'], 'idx_memos_user_created')
      table.index(['user_id', 'updated_at'], 'idx_memos_user_updated')
    })

    await this.schema.raw(`
      CREATE INDEX IF NOT EXISTS idx_memos_content_pattern
      ON "${this.tableName}" USING gin (content gin_trgm_ops)
    `)
  }

  async down() {
    await this.schema.raw(`DROP INDEX IF EXISTS idx_memos_content_pattern`)

    this.schema.table(this.tableName, (table) => {
      table.dropIndex('idx_memos_user_created')
      table.dropIndex('idx_memos_user_updated')
    })
  }
}
