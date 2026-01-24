import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookmarks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('title', 200).notNullable()
      table.string('url', 2048).notNullable()
      table.text('description').nullable()
      table.integer('visit_count').unsigned().defaultTo(0)
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['url', 'user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
