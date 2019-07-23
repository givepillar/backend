export const up = knex => {
  knex.schema.createTable('organizaions', table => {
    // BASIC TABLE SETUP
    table.uuid('id').primary()
    table.dateTime('createdAt').notNullable()
    table.dateTime('updatedAt').nullable()
    table.dateTime('deletedAt').nullable()

    // name of organization
    table.string('name').notNullable()

    // organization's account
    table
      .foreign('accountId')
      .references('id')
      .inTable('accounts')

    // organization's address
    table
      .foreign('addressId')
      .references('id')
      .inTable('addresses')

    // short description about organization
    table.string('shortDescription').nullable()

    // longer description about organization
    table.string('description').nullable()

    // organization type, i.e. "CHARITY", "UNIVERSITY", "PAC"
    table
      .enum('type', ['CHARITY'])
      .notNullable()
      .defaultTo('CHARITY')

    // tax id of organization
    table.string('taxId').nullable()

    // annual revenue of organization
    table.integer('annualRevenue').nullable()

    // category of organization
    table
      .foreign('categoryId')
      .references('id')
      .inTable('categories')

    // organization's impacts, stored as json
    table.json('impacts').nullable()

    // image of organization
    table
      .foreign('imageId')
      .references('id')
      .inTable('images')
      .nullable()

    table.string('slug').notNullable()
  })
}

export const down = knex => {
  knex.schema.dropTable('organizations')
}
