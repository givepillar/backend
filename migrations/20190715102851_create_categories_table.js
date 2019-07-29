const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('categories', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    // name of category
    table
      .string('name')
      .notNullable()
      .unique()

    table
      .string('slug')
      .notNullable()
      .unique()

    // hex code of category's color
    table.string('colorLight').nullable()
    table.string('color').notNullable()
    table.string('colorDark').nullable()
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('categories')
}
