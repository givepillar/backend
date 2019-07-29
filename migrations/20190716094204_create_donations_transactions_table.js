const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('donations_transactions', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    table
      .uuid('donationId')
      .references('id')
      .inTable('donations')
      .notNullable()

    table
      .uuid('transactionId')
      .references('id')
      .inTable('transactions')
      .notNullable()
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('donations_transactions')
}
