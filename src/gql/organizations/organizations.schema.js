import { gql } from 'apollo-server-express'

export default gql`
  ####################### Q U E R I E S ##########################################
  extend type Query {
    organizationById(id: ID!): OrganizationResponse!
    organizationBySlug(slug: String!): OrganizationResponse!
  }
  ###############################################################################

  ####################### T Y P E S ##########################################
  type Organization implements Node {
    id: ID!
    name: String!
    taxId: String!
    imageUrl: String!
    tags: [String!]!
    zipcode: String
    shortDescription: String
    summary: String
    slug: String!

    theirWork: String! # should be json
    accomplishments: String! # should be json
    statistics: OrganizationStatistics!
    # donations: DonationsSummary!
  }

  #   type OrganizationInfo {
  #     shortDescription: String!
  #     longDescription: String!
  #   }

  type OrganizationStatistics implements Node {
    id: ID!
    totalExpenses: Int
    fundraisingExpenses: Int
    programmingExpenses: Int
    managementExpenses: Int
    totalContributions: Int
    employeeCount: Int
    volunteerCount: Int
    executiveSalary: Int
    foundedYear: String
    hq: String
  }

  # type OrganizationsConnection implements Pagination {
  #   organizations: [Organization!]!
  #   totalCount: Integer!
  #   pageInfo: PageInfo!
  # }

  # input OrganizationInput {
  #   name: String!
  #   taxId: String
  #   imageUrl: String
  #   category: CategoryInput!
  #   address: AddressInput!
  # }

  type OrganizationResponse implements Response {
    organization: Organization
    code: String
    success: Boolean!
    message: String
  }

  ###########################################################################

  ####################### M U T A T I O N S ##########################################
  # extend type Mutation {
  #   createOrganization(newOrg: OrganizationInput!): OrganizationResponse!
  # }
  ################################################################################
`
