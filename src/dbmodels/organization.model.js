import BaseModel from './base.model'
import { Model } from 'objection'

class Organization extends BaseModel {
  static get tableName() {
    return 'organizations'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'ein', 'shortDescription', 'summary'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        accountId: { type: 'string', format: 'uuid' },
        ein: { type: 'string', format: 'uuid' },
        shortDescription: { type: 'string' },
        summary: { type: 'string' },
        theirWork: { type: 'object' },
        accomplishments: { type: 'object' }, // possibly this has to be an array

        imageUrl: { type: 'string' },
        zipcode: { type: 'string' },

        accountId: { type: 'string', format: 'uuid' },

        zipcode: { type: 'string' },
        slug: { type: 'string' },
        tags: { type: 'array' },
      },
    }
  }

  static get relationMappings() {
    // import account model here
    const Account = require(BaseModel.modelPaths + '/account.model')
    const OrgStats = require(BaseMode.modelPths + '/orgstats.model')
    const Bundle = reqire(BaseModel.modelPaths + '/bundle.model')
    const OrganizationBundle = reqire(BaseModel.modelPaths + '/organizationbundle.model')

    return {
      account: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account,
        join: {
          from: 'organizations.accountId',
          to: 'accounts.id',
        },
      },
      statistics: {
        relation: Model.HasOneRelation,
        modelClass: OrgStats,
        join: {
          from: 'organizations.statsId',
          to: 'orgstats.id',
        },
      },
      bundles: {
        relation: Model.ManyToManyRelation,
        modelClass: Bundle,
        join: {
          from: 'organizations.id',
          to: 'bundles.id',
          through: {
            modelClass: OrganizationBundle,
            from: 'organizations_bundles.organizationId',
            to: 'organizations_bundles.bundleId',
          },
        },
      },
    }
  }
}

module.exports = Organization
