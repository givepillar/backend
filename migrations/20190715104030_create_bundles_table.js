export const up = knex => {
  return knex.schema.createTable('bundles', table => {
    // BASIC TABLE SETUP
    table.uuid('id').primary()
    table.dateTime('createdAt').notNullable()
    table.dateTime('updatedAt').nullable()
    table.dateTime('deletedAt').nullable()

    // proxy account for "receiving donations"
    table.string('name').notNullable()

    table
      .foreign('categoryId')
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
      .foreign('imageId')
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

export const down = knex => {
  return knex.schema.dropTable('bundles')
}
