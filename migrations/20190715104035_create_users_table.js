const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('users', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    table
      .string('email')
      .unique()
      .notNullable()

    table.string('firstName').notNullable()
    table.string('lastName').notNullable()

    table
      .uuid('accountId')
      .references('id')
      .inTable('accounts')
      .nullable()

    // credentials of this user
    table
      .uuid('credentialsId')
      .references('id')
      .inTable('credentials')
      .notNullable()

    table
      .enum('role', ['DONOR', 'ADMIN'])
      .notNullable()
      .defaultTo('DONOR')

    table
      .uuid('addressId')
      .references('id')
      .inTable('addresses')
      .nullable()
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('users')
}
