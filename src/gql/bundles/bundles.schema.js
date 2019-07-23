import { gql } from 'apollo-server-express'

export default gql`
  ####################### Q U E R I E S ##########################################
  extend type Query {
    bundleById(id: ID!): BundleResponse!
    bundleBySlug(slug: String!): BundleResponse!
    trendingBundles: [Bundle!]!
  }
  ###############################################################################

  ####################### T Y P E S ##########################################

  # a transaction of money from a user (donor) to an organization
  #   type Transaction implements Node {
  type Bundle implements Node {
    id: ID!

    name: String!

    category: Category!

    active: Boolean!

    slug: String!

    shortDescription: String

    description: String

    image: Image

    callToAction: String

    lede: String

    organizations: [Organization!]!

    donations: DonationsSummary!
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
