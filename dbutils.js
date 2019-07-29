module.exports.baseFields = (table, knex) => {
  table
    .uuid('id')
    .primary()
    .defaultTo(knex.raw('uuid_generate_v4()'))
  table.timestamps(true, true)
}
