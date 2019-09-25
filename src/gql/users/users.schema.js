import { gql } from 'apollo-server-express'

export default gql`
  ####################### Q U E R I E S ##########################################

  extend type Query {
    viewer: User
  }

  extend type Mutation {
    listSignup(email: String!): ListSignupResponse
  }

  ###############################################################################

  ####################### T Y P E S ##########################################

  type ListSignupResponse implements Response {
    code: String
    success: Boolean!
    message: String
  }

  type User implements Node {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    portfolio: [Donation!]!
    transactions: [Transaction!]!
    charges: [Charge!]!

    recommendedBundles: [Bundle!]!
    recommendedOrganizations: [Organization!]!

    address: Address
    role: Role!
  }

  ###########################################################################

  ####################### M U T A T I O N S ##########################################

  ################################################################################
`
