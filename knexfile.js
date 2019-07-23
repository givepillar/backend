const POOL_MIN = 2
const POOL_MAX = 10
const migrations = {
  tableName: 'knex_migrations',
  directory: './migrations',
}

module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/dev_db',
    pool: {
      min: 2,
      max: 10,
    },
    migrations,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'staging_db',
      user: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
    },
    pool: {
      min: POOL_MIN,
      max: POOL_MAX,
    },
    migrations,
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'production_db',
      user: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
    },
    pool: {
      min: POOL_MIN,
      max: POOL_MAX,
    },
    migrations,
  },
}
