import { gql } from 'apollo-server-express'

export default gql`
  ####################### C O M M O N   T Y P E S ##########################################

  type Query {
    test: String
    a: Boolean
  }

  type Mutation {
    test: String
  }

  type Image {
    url: String!
  }

  # a color, which has 3 versions: light, medium, dark
  type Color {
    light: String!
    standard: String!
    dark: String!
  }
  type Address {
    streetAddress: String
    city: String
    state: String
    country: String
    zip: String!
  }
  type Date {
    year: String!
    month: String!
    day: String!
  }
  interface Node {
    id: ID!
  }

  enum Role {
    DONOR
    ADMIN
  }

  ###########################################################################

  ####################### P A G I N A T I O N ##########################################
  # input pagination type for determining pagination.
  # 'limit' is the maximum number of items to be returned
  # 'cursor' is the current cursor value
  # input PaginationInput {
  #   cursor: Int!
  #   limit: Int!
  # }

  # # interface for what a paginated query returns
  # interface Pagination {
  #   totalCount: Int!
  #   pageInfo: PageInfo!
  # }

  # # info about a page of items that a paginated query returns
  # type PageInfo {
  #   hasMore: Boolean!
  #   startCursor: Int!
  #   nextCursor: Int!
  # }

  type ResponseType implements Response {
    code: String
    success: Boolean!
    message: String
  }
  ###############################################################################

  ####################### M U T A T I O N S ##########################################
  # response to a Mutation
  interface Response {
    code: String
    success: Boolean!
    message: String
  }

  ################################################################################
`
