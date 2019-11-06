const { baseFields } = require('../dbutils')

module.exports.up = knex => {
  return knex.schema.createTable('orgstats', table => {
    // BASIC TABLE SETUP
    baseFields(table, knex)

    // foreign key to account we're charging

    // all stats annualized
    table.integer('totalExpenses').notNullable()

    table.integer('programmingExpenses').notNullable()

    table.integer('fundraisingExpenses').notNullable()

    table.integer('managementExpenses').notNullable()

    // can get FUNDRAISING EFFICIENCY FROM THIS
    table.integer('totalContributions').notNullable()

    table.integer('employeeCount').notNullable()

    table.integer('volunteerCount').notNullable()

    table.integer('executiveSalary').notNullable()

    table.string('foundedDate').nullable()

    table.string('hq').notNullable() // city, state of organization
  })
}

module.exports.down = knex => {
  return knex.schema.dropTable('orgstats')
}
