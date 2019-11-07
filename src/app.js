import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import helmet from 'helmet'
import { ApolloServer, gql } from 'apollo-server-express'
import schema from './gql/schema'
import { Model } from 'objection'
import Knex from 'knex'
import cors from 'cors'
import knexConfig from '../knexfile'
import AuthEngine from './gql/auth/auth.engine'
import { userFromAccessToken } from './utils/auth'
import Sendgrid from './datasources/sendgrid.datasource'

/**
 * Initialize dotenv
 */
dotenv.config()

// initialize Objection and knex
const knexConnection = Knex(knexConfig[process.env.NODE_ENV])
Model.knex(knexConnection)

let app = express()

// M I D D L E W A R E
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(cors())
app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(cookieParser())

const context = async ({ req }) => {
  const hasAuth = req.headers.authentication && req.headers.authentication.startsWith('Bearer ')
  const token = hasAuth ? req.headers.authentication.split(' ')[1] : ''

  // try to grab user with given token
  let user = null

  try {
    user = hasAuth ? await userFromAccessToken(token) : null
  } catch (e) {}

  return {
    user,
    req, // store express req object in context
    datasources: () => ({
      Sendgrid: Sendgrid,
    }),
  }
}
console.log('STARTING SERVER')

const server = new ApolloServer({
  context,
  schema,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
  },
})

server.applyMiddleware({
  app,
})

app.get('/', (req, res) => res.json({ message: 'All ok' }))

export default app
