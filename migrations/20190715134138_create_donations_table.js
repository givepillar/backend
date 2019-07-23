/*
 * The donations table contains a particular user's donation
 */

export const up = knex => {
  return knex.schema.createTable('donations', table => {
    // BASIC TABLE SETUP
    table.uuid('id').primary()
    table.dateTime('createdAt').notNullable()
    table.dateTime('updatedAt').nullable()
    table.dateTime('deletedAt').nullable()

    // the user whose donation this is
    table
      .foreign('userId')
      .references('id')
      .inTable('users')
      .notNullable()

    // amount of the donation
    table.integer('amount').notNull()

    // frequency of donation
    table.enum('frequency', ['MONTHLY', 'ONETIME']).notNullable()

    // type of the recipient of donation (either a bundle or an organization)
    table.enum('recipientType', ['BUNDLE', 'ORGANIZATION']).notNullable()

    // the organization receiving this donation (if donation is directly to an organization)
    table
      .foreign('organizationId')
      .references('id')
      .inTable('organizations')

    // the bundle receiving this donation (if donation is to a bundle)
    table
      .foreign('bundleId')
      .references('id')
      .inTable('bundles')
  })
}

export const down = knex => {
  return knex.schema.dropTable('donations')
}
