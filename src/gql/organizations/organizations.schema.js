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
    taxId: String
    image: Image
    category: Category!
    address: Address!
    description: String
    shortDescription: String
    slug: String!
    # info: OrganizationInfo!
    # statistics: OrganizationStatistics!
    donations: DonationsSummary!
  }

  #   type OrganizationInfo {
  #     shortDescription: String!
  #     longDescription: String!
  #   }

  #   type OrganizationStatistics {
  #     revenue: Integer!
  #   }

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
