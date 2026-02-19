import { BaseSchema } from '@adonisjs/lucid/schema'

export default class FixBookmarkStatus extends BaseSchema {
  protected tableName = 'bookmarks'

  async up() {
    await this.db.rawQuery("UPDATE bookmarks SET status = 'active' WHERE status = 'fetching'")
  }

  async down() {
    // No rollback needed for data fix
  }
}
