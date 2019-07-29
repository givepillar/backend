const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('organizations_bundles', table => {
    // BASIC TABLE SETUP

    baseFields(table, knex)

    table
      .uuid('organizationId')
      .references('id')
      .inTable('organizations')
      .notNullable()

    table
      .uuid('bundleId')
      .references('id')
      .inTable('bundles')
      .notNullable()

    table.string('why').nullable()
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('organizations_bundles')
}
