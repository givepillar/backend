const POOL_MIN = 2
const POOL_MAX = 10
const migrations = {
  tableName: 'knex_migrations',
  directory: './migrations',
}

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations,
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    pool: {
      min: POOL_MIN,
      max: POOL_MAX,
    },
    migrations,
  },

  production: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    pool: {
      min: POOL_MIN,
      max: POOL_MAX,
    },
    migrations,
  },
}
