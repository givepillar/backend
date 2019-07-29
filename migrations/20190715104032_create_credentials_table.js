const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('credentials', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)
    // password... expects to be encrypted BEFORE insert
    table.string('password').nullable()

    // facebook code associated with FB auth
    table.string('facebookAccessToken').nullable()

    // whether user's signup action has been verified (validation email)
    table
      .boolean('verified')
      .notNullable()
      .defaultTo(false)

    // code to match when a user is confirming email or changing password
    table
      .string('verificationCode')
      .nullable()
      .unique()

    // refresh token for OAuth
    table.string('refreshToken').nullable()
  })
}
;``
module.exports.down = knex => {
  return knex.schema.dropTable('credentials')
}
