const { baseFields } = require('../dbutils')
module.exports.up = knex => {
  return knex.schema.createTable('addresses', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    table.string('zipCode').notNullable()
    table.string('streetAddress').nullable()
    table.string('city').nullable()
    table.string('state').nullable()
    table.string('country').nullable()
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('addresses')
}
