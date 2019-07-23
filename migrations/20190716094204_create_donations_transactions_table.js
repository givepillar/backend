export const up = knex => {
  return knex.schema.createTable('donations_transactions', table => {
    // BASIC TABLE SETUP
    table.uuid('id').primary()
    table.dateTime('createdAt').notNullable()
    table.dateTime('updatedAt').nullable()
    table.dateTime('deletedAt').nullable()

    table
      .foreign('donationId')
      .references('id')
      .inTable('donations')
      .notNullable()

    table
      .foreign('transactionId')
      .references('id')
      .inTable('transactions')
      .notNullable()
  })
}

export const down = knex => {
  return knex.schema.dropTable('donations_transactions')
}
