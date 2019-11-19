import Organizations from '../../dbmodels/organization.model'
import OrgStats from '../../dbmodels/orgstats.model'

// takes org object from DB and formats for gql
const packageDbOrg = ({ orgFromDb }) => ({
  id,
  name,
  taxId: ein,
  imageUrl,
  zipcode,
  shortDescription,
  summary,
  slug,
  theirWork,
  accomplishments,
})

export const OrganizationsEngine = context => ({
  fromId: async id => {
    const org = packageDbOrg(Organizations.findById(id).first())
    const stats = org.statistics
    // const stats = org ? org.$relatedQuery('statistics') : null
    return {
      organization: {
        ...org,
        statistics: stats,
      },
      success: organization != null,
    }
  },
  fromName: slug => {
    const org = packageDbOrg(Organizations.query({ slug: slug }).first())
    const stats = org.statistics
    // const stats = org ? org.$relatedQuery('statistics') : null
    return {
      organization: {
        ...org,
        statistics: stats,
      },
      success: organization != null,
    }
  },
})
