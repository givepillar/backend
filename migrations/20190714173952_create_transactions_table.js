export const up = knex => {
  return knex.schema.createTable('transactions', table => {
    // BASIC TABLE SETUP
    table.uuid('id').primary()
    table.dateTime('createdAt').notNullable()
    table.dateTime('updatedAt').nullable()
    table.dateTime('deletedAt').nullable()

    // amount (in cents) of the charge
    table.integer('amount').notNullable()

    // currency code for charge
    table.enum('currency', ['USD']).defaultTo('USD')

    // account id receiving money
    table
      .foreign('toId')
      .notNullable()
      .references('id')
      .inTable('accounts')

    // account id giving money
    table
      .foreign('fromId')
      .notNullable()
      .references('id')
      .inTable('accounts')

    // description of reason for transaction
    table.string('description').nullable()
  })
}

export const down = knex => {
  return knex.schema.dropTable('transactions')
}
