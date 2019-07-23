export const up = knex => {
  return knex.schema.createTable('images', table => {
    // BASIC TABLE SETUP
    table.uuid('id').primary()
    table.dateTime('createdAt').notNullable()
    table.dateTime('updatedAt').nullable()
    table.dateTime('deletedAt').nullable()

    // url of image
    table.string('url').notNullable()

    // alt text of image
    table.string('alt').nullable()
  })
}

export const down = knex => {
  return knex.schema.dropTable('images')
}
