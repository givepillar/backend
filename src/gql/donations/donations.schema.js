import { gql } from 'apollo-server-express'

export default gql`
  ####################### Q U E R I E S ##########################################

  ###############################################################################

  ####################### T Y P E S ##########################################

  union Recipient = Organization | Bundle

  enum DonationFrequency {
    MONTHLY
    ONETIME
  }

  # a transaction of money from a user (donor) to an organization
  #   type Transaction implements Node {
  type Donation implements Node {
    id: ID!

    # 'from': the user the transaction comes from
    # from: User!
    from: User! # maybe don't need
    # 'to': the organization receiving the transaction
    # to: Organization!
    to: Recipient!

    # 'amount': the amount of the transaction in cents
    amount: Int!

    frequency: DonationFrequency!

    # 'charge': the charge that the transaction is associated with
    # charge: Charge!
    charge: Int!
  }

  enum DonationRecipientType {
    ORGANIZATION
    BUNDLE
  }

  # input to create a donation from viewer (user) to a particular endpoint
  input DonationInput {
    fromId: ID! # if null then 'viewer' user is the from field
    toId: ID!
    toType: DonationRecipientType!
    amount: Int!
  }

  type DonationResponse implements Response {
    donation: Donation
    code: String
    success: Boolean!
    message: String
  }

  # summary of donations for an org or a bundle
  type DonationsSummary {
    numberOfDonations: Int!
    numberOfSubscribers: Int!
    totalAmountReceived: Int! # in cents, of course
    # donations: DonationsConnection!
  }

  ###########################################################################

  ####################### M U T A T I O N S ##########################################
  extend type Mutation {
    createDonation(donation: DonationInput!): DonationResponse!
  }
  ################################################################################
`
