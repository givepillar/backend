const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('charges', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    // foreign key to account we're charging
    table
      .uuid('accountId')
      .notNullable()
      .references('id')
      .inTable('accounts')

    // amount (in CENTS (currency fraction)) of the charge
    table.integer('amount').notNullable()

    // charge ID within stripe
    table.string('stripeChargeId').notNullable()

    // currency code for the charge
    table
      .string('currency')
      .notNullable()
      .defaultTo('USD')

    // type of charge
    table.string('type').nullable()

    // identifies which card was charged (e.g. VISA-4013)
    table.string('paymentMethod').nullable()
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('charges')
}
