const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('tags', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    // name of category
    table
      .string('name')
      .notNullable()
      .unique()

    table
      .string('slug')
      .nullable()
      .unique()

    // hex code of category's color
    table.string('colorLight').nullable()
    table.string('color').nullable()
    table.string('colorDark').nullable()
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('tags')
}
