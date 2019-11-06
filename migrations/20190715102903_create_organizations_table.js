const { baseFields } = require('../dbutils')

module.exports.up = knex =>
  knex.schema.createTable('organizations', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    // name of organization
    table.string('name').notNullable()

    // organization's account
    table
      .uuid('accountId')
      .references('id')
      .inTable('accounts')

    // tax id of organization
    table.string('ein').notNullable()

    // organization's statistics
    table
      .uuid('statsId')
      .references('id')
      .inTable('orgstats')

    // short description about organization
    table.string('shortDescription').notNullable()

    table.string('summary').notNullable()

    table.json('theirWork').nullable() // json object of an organization's work

    table.json('accomplishments').nullable() // json object/array of organization's accomplishments

    // category of organization
    table.json('tags').nullable()

    // image of organization
    table.string('imageUrl').nullable()

    table.string('zipcode').nullable()

    table.string('slug').notNullable()
  })

module.exports.down = knex => knex.schema.dropTable('organizations')
