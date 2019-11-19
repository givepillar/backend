import Organizations from '../../dbmodels/organization.model'
import OrganizationBundle from '../../dbmodels/organizationbundle.model'
import OrgStats from '../../dbmodels/orgstats.model'

// takes bundle object from DB and formats for gql
const packageDbBundle = ({ bundleFromDb }) => ({
  id,
  name,
  tags,
  active,
  slug,
  shortDescription,
  goals,
  strategy,
  summary,
  lede,
  callToAction,
  imageUrl,
})

export const BundlesEngine = context => ({
  fromId: async id => {
    const bundle = packageDbBundle(
      Bundles.query()
        .findById(id)
        .first()
    )
    // const orgs =
    const why = OrganizationBundle.query({ bundleId: bundleId }).first()
    return {
      bundle: {
        ...bundle,
        statistics: stats,
      },
      success: organization != null,
    }
  },
  fromName: slug => {
    const bundle = packageDbBundle(Bundles.query({ slug: slug }).first())
    const stats = org ? org.$relatedQuery('statistics') : null
    return {
      organization: {
        ...org,
        statistics: stats,
      },
      success: organization != null,
    }
  },
})
