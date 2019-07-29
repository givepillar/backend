import { BaseModel } from './base.model'
import { Model } from 'objection'

class Donation extends BaseModel {
  static get tableName() {
    return 'donations'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'frequency', 'recipientType', 'amount'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        userId: { type: 'string', format: 'uuid' },
        amount: { type: 'integer' },
        recipientType: { type: 'string', enum: ['ORGANIZATION', 'BUNDLE'] },
        frequency: { type: 'string', enum: ['MONTHLY', 'ONETIME'] },
        organizationId: { type: 'string', format: 'uuid' },
        bundleId: { type: 'string', format: 'uuid' },
      },
    }
  }

  static get relationMappings() {
    const User = require(BaseModel.modelPaths + '/user.model')
    const Organization = require(BaseModel.modelPaths + '/organization.model')
    const Bundle = require(BaseModel.modelPaths + '/bundle.model')

    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'donations.userId',
          to: 'users.id',
        },
      },
      organization: {
        relation: Model.HasOneRelation,
        modelClass: Organization,
        join: {
          from: 'donations.organizationId',
          to: 'organizations.id',
        },
      },
      bundle: {
        relation: Model.HasOneRelation,
        modelClass: Bundle,
        join: {
          from: 'donations.bundleId',
          to: 'bundles.id',
        },
      },
    }
  }
}
