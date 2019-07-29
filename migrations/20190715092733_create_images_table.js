const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('images', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    // url of image
    table.string('url').notNullable()

    // alt text of image
    table.string('alt').nullable()
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('images')
}
