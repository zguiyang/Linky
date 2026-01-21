import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('email_verified_at', { useTz: true }).nullable()
      table.string('verification_token', 255).nullable().unique()
      table.string('reset_password_token', 255).nullable().unique()
      table.timestamp('reset_password_expires_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('email_verified_at')
      table.dropColumn('verification_token')
      table.dropColumn('reset_password_token')
      table.dropColumn('reset_password_expires_at')
    })
  }
}
