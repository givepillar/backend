import { gql } from 'apollo-server-express'

export default gql`
  ####################### Q U E R I E S ##########################################
  extend type Query {
    categoryBySlug(slug: String!): CategoryResponse!
    categoryByName(name: String!): CategoryResponse!
  }
  ###############################################################################

  ####################### T Y P E S ##########################################

  # a transaction of money from a user (donor) to an organization
  #   type Transaction implements Node {
  type Category implements Node {
    id: ID!

    name: String!

    color: Color! # light, standard, or dark
    slug: String!

    # bundles in this category
    bundles: [Bundle!]!

    # organizations in this category
    organizations: [Organization!]!
  }

  type CategoryResponse implements Response {
    category: Category
    code: String
    success: Boolean!
    message: String
  }

  ###########################################################################

  ####################### M U T A T I O N S ##########################################

  ################################################################################
`
