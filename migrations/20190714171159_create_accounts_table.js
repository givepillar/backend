const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('accounts', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    // amount of money in the platform owned by the account
    // table.integer('balance').defaultTo(0)

    // currency code associated with the balance
    table.enum('currency', ['USD']).defaultTo('USD')

    // id for stripe customer
    table
      .string('stripeCustomerId')
      .nullable()
      .unique()

    // indicator of card brand (primary payment method)
    table.string('cardBrand').nullable()

    // last 4 digits of card as indicator of primary payment method
    table.string('cardLast4').nullable()
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('accounts')
}
