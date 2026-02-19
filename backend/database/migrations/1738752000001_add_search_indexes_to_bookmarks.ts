import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookmarks'

  async up() {
    await this.schema.raw(`CREATE EXTENSION IF NOT EXISTS pg_trgm`)

    await this.schema.raw(`
      CREATE INDEX IF NOT EXISTS idx_bookmarks_user_updated
      ON "${this.tableName}" USING btree (user_id, updated_at DESC)
    `)

    await this.schema.raw(`
      CREATE INDEX IF NOT EXISTS idx_bookmarks_title_pattern
      ON "${this.tableName}" USING gin (title gin_trgm_ops)
    `)

    await this.schema.raw(`
      CREATE INDEX IF NOT EXISTS idx_bookmarks_description_pattern
      ON "${this.tableName}" USING gin (description gin_trgm_ops)
    `)
  }

  async down() {
    await this.schema.raw(`DROP INDEX IF EXISTS idx_bookmarks_user_updated`)
    await this.schema.raw(`DROP INDEX IF EXISTS idx_bookmarks_title_pattern`)
    await this.schema.raw(`DROP INDEX IF EXISTS idx_bookmarks_description_pattern`)
  }
}
