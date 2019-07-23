import { gql } from 'apollo-server-express'

export default gql`
  ####################### Q U E R I E S ##########################################
  ###############################################################################

  ####################### T Y P E S ##########################################

  # a transaction of money from a user (donor) to an organization
  #   type Transaction implements Node {
  type Charge implements Node {
    id: ID!

    user: User!

    amount: Int!

    date: Date!

    # identifies which card was charged (e.g. VISA-4013)
    paymentMethod: String!
  }

  ###########################################################################

  ####################### M U T A T I O N S ##########################################
  extend type Mutation {
    newStripeCharge(stripeId: String!): Boolean! # needs a little work
  }
  ################################################################################
`
