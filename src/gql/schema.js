import { makeExecutableSchema } from 'apollo-server-express'
import { merge } from 'lodash'
import commonSchema from './common/common.schema'
import commonResolvers from './common/common.resolvers'
import transactionsSchema from './transactions/transactions.schema'
import transactionsResolvers from './transactions/transactions.resolvers'
import usersSchema from './users/users.schema'
import usersResolvers from './users/users.resolvers'
import organizationsSchema from './organizations/organizations.schema'
import organizationsResolvers from './organizations/organizations.resolvers'
import bundlesSchema from './bundles/bundles.schema'
import bundlesResolvers from './bundles/bundles.resolvers'
import donationsSchema from './donations/donations.schema'
import donationsResolvers from './donations/donations.resolvers'
import chargesSchema from './charges/charges.schema'
import chargesResolvers from './charges/charges.resolvers'
import authSchema from './auth/auth.schema'
import authResolvers from './auth/auth.resolvers'

const typeDefs = [
  donationsSchema,
  commonSchema,
  organizationsSchema,
  bundlesSchema,
  usersSchema,
  transactionsSchema,
  chargesSchema,
  authSchema,
]

const resolvers = merge(
  usersResolvers,
  commonResolvers,
  transactionsResolvers,
  organizationsResolvers,
  bundlesResolvers,
  donationsResolvers,
  chargesResolvers,
  authResolvers
)

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
