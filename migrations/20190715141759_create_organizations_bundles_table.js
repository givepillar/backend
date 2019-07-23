export const up = knex => {
  return knex.schema.createTable('organizations_bundles', table => {
    // BASIC TABLE SETUP
    table.uuid('id').primary()
    table.dateTime('createdAt').notNullable()
    table.dateTime('updatedAt').nullable()
    table.dateTime('deletedAt').nullable()

    table
      .foreign('organizationId')
      .references('id')
      .inTable('organizations')
      .notNullable()

    table
      .foreign('bundleId')
      .references('id')
      .inTable('bundles')
      .notNullable()

    table.string('why').nullable()
  })
}

export const down = knex => {
  return knex.schema.dropTable('organizations_bundles')
}
