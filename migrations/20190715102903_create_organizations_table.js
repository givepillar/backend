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

    // organization's address
    table
      .uuid('addressId')
      .references('id')
      .inTable('addresses')

    // short description about organization
    table.string('shortDescription').nullable()

    // longer description about organization
    table.string('description').nullable()

    // organization type, i.e. "CHARITY", "UNIVERSITY", "PAC"
    table
      .enum('type', ['CHARITY'])
      .notNullable()
      .defaultTo('CHARITY')

    // tax id of organization
    table.string('taxId').nullable()

    // annual revenue of organization
    table.integer('annualRevenue').nullable()

    // category of organization
    table
      .uuid('categoryId')
      .references('id')
      .inTable('categories')

    // organization's impacts, stored as json
    table.json('impacts').nullable()

    // image of organization
    table
      .uuid('imageId')
      .references('id')
      .inTable('images')
      .nullable()

    table.string('slug').notNullable()
  })

module.exports.down = knex => knex.schema.dropTable('organizations')
