const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('transactions', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    // amount (in cents) of the charge
    table.integer('amount').notNullable()

    // currency code for charge
    table.enum('currency', ['USD']).defaultTo('USD')

    // account id receiving money
    table
      .uuid('toId')
      .notNullable()
      .references('id')
      .inTable('accounts')

    // account id giving money
    table
      .uuid('fromId')
      .notNullable()
      .references('id')
      .inTable('accounts')

    // description of reason for transaction
    table.string('description').nullable()
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('transactions')
}
