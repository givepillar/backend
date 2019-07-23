export const up = knex => {
  return knex.schema.createTable('categories', table => {
    // BASIC TABLE SETUP
    table.uuid('id').primary()
    table.dateTime('createdAt').notNullable()
    table.dateTime('updatedAt').nullable()
    table.dateTime('deletedAt').nullable()

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

export const down = knex => {
  return knex.schema.dropTable('categories')
}
