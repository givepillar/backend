export const up = knex => {
  return knex.schema.createTable('users', table => {
    // BASIC TABLE SETUP
    table.uuid('id').primary()
    table.dateTime('createdAt').notNullable()
    table.dateTime('updatedAt').nullable()
    table.dateTime('deletedAt').nullable()

    table
      .string('email')
      .unique()
      .notNullable()

    table.string('firstName').notNullable()
    table.string('lastName').notNullable()

    table
      .foreign('accountId')
      .references('id')
      .inTable('accounts')
      .nullable()

    // user's credentials
    table
      .foreign('credentialsId')
      .references('id')
      .inTable('credentials')
      .notNullable()

    table
      .enum('role', ['DONOR', 'ADMIN'])
      .notNullable()
      .defaultTo('DONOR')

    table
      .foreign('addressId')
      .references('id')
      .inTable('addresses')
      .nullable()
  })
}

export const down = knex => {
  return knex.schema.dropTable('users')
}
