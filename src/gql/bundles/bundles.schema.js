import { gql } from 'apollo-server-express'

export default gql`
  ####################### Q U E R I E S ##########################################
  extend type Query {
    bundleById(id: ID!): BundleResponse!
    bundleBySlug(slug: String!): BundleResponse!
  }

  ###############################################################################

  ####################### T Y P E S ##########################################

  # a transaction of money from a user (donor) to an organization
  #   type Transaction implements Node {
  type Bundle implements Node {
    id: ID!

    name: String!

    tags: [String!]!

    active: Boolean!

    slug: String!

    shortDescription: String # for rendering the bundle on a card, e.g.
    goals: [String!]!

    strategy: [StrategyItem!]!

    summary: String

    lede: String

    callToAction: String # statement following the lede, calling for action
    image: Image

    organizations: [OrganizationAndWhy!]!

    donations: DonationsSummary!
  }

  type OrganizationAndWhy {
    organization: Organization!
    why: String!
  }

  type StrategyItem {
    title: String!
    bullets: [String!]!
  }

  type BundleResponse implements Response {
    bundle: Bundle
    code: String
    success: Boolean!
    message: String
  }
  ###########################################################################

  ####################### M U T A T I O N S ##########################################

  ################################################################################
`
