const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('bundles', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    // proxy account for "receiving donations"
    table.string('name').notNullable()

    table.json('tags').nullable()

    // whether bundle is currently active or not (otherwise deprecated)
    table.boolean('active').defaultTo(true)

    // technically unique but...
    table.string('slug').notNullable()

    // short description about organization
    table.string('shortDescription').nullable()

    // longer description about organization
    table.string('summary').nullable()

    table.json('goals').nullable()

    table.json('strategy').nullable()

    // lede for bundle page
    table.string('lede').nullable()

    // concise call to action statement, following the lede
    table.string('callToAction').nullable()

    // image of bundle
    table
      .uuid('imageId')
      .references('id')
      .inTable('images')
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('bundles')
}
