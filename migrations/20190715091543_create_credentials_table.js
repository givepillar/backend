export const up = knex => {
  return knex.schema.createTable('credentials', table => {
    // BASIC TABLE SETUP
    table.uuid('id').primary()
    table.dateTime('createdAt').notNullable()
    table.dateTime('updatedAt').nullable()
    table.dateTime('deletedAt').nullable()

    // password... expects to be encrypted BEFORE insert
    table.string('password').nullable()

    // facebook code associated with FB auth
    table.string('facebookCode').nullable()

    // whether user's signup action has been verified (validation email)
    table
      .boolean('verified')
      .notNullable()
      .defaultTo(false)

    // code to match when a user is confirming email or changing password
    table.string('verificationCode').nullable()

    // refresh token for OAuth
    table.string('refreshToken').nullable()
  })
}
;``
export const down = knex => {
  return knex.schema.dropTable('credentials')
}
