import { makeExecutableSchema } from 'apollo-server-express'
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
import categoriesSchema from './categories/categories.schema'
import categoriesResolvers from './categories/categories.resolvers'
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
  categoriesSchema,
  authSchema,
]

const resolvers = {
  ...commonResolvers,
  ...transactionsResolvers,
  ...usersResolvers,
  ...organizationsResolvers,
  ...bundlesResolvers,
  ...donationsResolvers,
  ...chargesResolvers,
  ...categoriesResolvers,
  ...authResolvers,
}

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
