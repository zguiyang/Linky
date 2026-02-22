import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'memo_tags'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('memo_id').unsigned().notNullable()
      table.integer('tag_id').unsigned().notNullable()
      table.primary(['memo_id', 'tag_id'])
      table.foreign('memo_id').references('id').inTable('memos').onDelete('CASCADE')
      table.foreign('tag_id').references('id').inTable('tags').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
