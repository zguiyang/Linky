import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('ai_base_url')
      table.dropColumn('ai_api_key')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('ai_base_url').nullable()
      table.string('ai_api_key').nullable()
    })
  }
}
