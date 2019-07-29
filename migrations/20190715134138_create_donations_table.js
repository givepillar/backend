/*
 * The donations table contains a particular user's donation
 */

const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('donations', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    // the user whose donation this is
    table
      .uuid('userId')
      .references('id')
      .inTable('users')
      .notNullable()

    // amount of the donation
    table.integer('amount').notNull()

    // frequency of donation
    table.enum('frequency', ['MONTHLY', 'ONETIME']).notNullable()

    // type of the recipient of donation (either a bundle or an organization)
    table.enum('recipientType', ['BUNDLE', 'ORGANIZATION']).notNullable()

    // the bundle receiving this donation (if donation is to a bundle)
    table
      .uuid('bundleId')
      .references('id')
      .inTable('bundles')

    // the organization receiving this donation (if donation is directly to an organization)
    table
      .uuid('organizationId')
      .references('id')
      .inTable('organizations')
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('donations')
}
