export const up = knex => {
  return knex.schema.createTable('addresses', table => {
    // BASIC TABLE SETUP
    table.uuid('id').primary()
    table.dateTime('createdAt').notNullable()
    table.dateTime('updatedAt').nullable()
    table.dateTime('deletedAt').nullable()

    table.string('zipCode').notNullable()
    table.string('streetAddress').nullable()
    table.string('city').nullable()
    table.string('state').nullable()
    table.string('country').nullable()
  })
}

export const down = knex => {
  return knex.schema.dropTable('addresses')
}
