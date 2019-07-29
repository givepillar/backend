const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('bundles', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    // proxy account for "receiving donations"
    table.string('name').notNullable()

    table
      .uuid('categoryId')
      .references('id')
      .inTable('categories')

    // whether bundle is currently active or not (otherwise deprecated)
    table.boolean('active').defaultTo(true)

    // short description about organization
    table.string('shortDescription').nullable()

    // longer description about organization
    table.string('description').nullable()

    // image of bundle
    table
      .uuid('imageId')
      .references('id')
      .inTable('images')

    // concise call to action statement
    table.string('callToAction').nullable()

    // lede for bundle page
    table.string('lede').nullable()

    // technically unique but...
    table.string('slug').notNullable()
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('bundles')
}
