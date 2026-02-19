import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddStatusToBookmarks extends BaseSchema {
  protected tableName = 'bookmarks'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('status').notNullable().defaultTo('fetching')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status')
    })
  }
}
