import { gql } from 'apollo-server-express'

export default gql`
  ####################### Q U E R I E S ##########################################
  extend type Query {
    transactionFromId(id: ID!): TransactionResponse!
  }
  ###############################################################################

  ####################### T Y P E S ##########################################

  # a transaction of money from a user (donor) to an organization
  #   type Transaction implements Node {
  type Transaction implements Node {
    id: ID!

    # 'from': the user the transaction comes from
    # from: User!
    from: User!

    # 'to': the organization receiving the transaction
    # to: Organization!
    to: Organization!

    # 'amount': the amount of the transaction in cents
    amount: Int!

    # 'date': the date of the transaction
    # date: Date!
    date: Date!
  }

  type TransactionResponse implements Response {
    transaction: Transaction
    code: String
    success: Boolean!
    message: String
  }
  ###########################################################################

  ####################### M U T A T I O N S ##########################################

  ################################################################################
`
