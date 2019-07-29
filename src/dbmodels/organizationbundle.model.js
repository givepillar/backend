import { BaseModel } from './base.model'

class OrganizationBundle extends BaseModel {
  static get tableName() {
    return 'organizations_bundles'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['organizationId', 'bundleId'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        organizationId: { type: 'string', format: 'uuid' },
        bundleId: { type: 'string', format: 'uuid' },
        why: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    const Organization = require(BaseModel.modelPaths + '/organization.model')
    const Bundle = require(BaseModel.modelPaths + '/bundle.model')
    return {
      organization: {
        relation: BaseModel.HasOneRelation,
        modelClass: Organization,
        join: {
          from: 'organization_bundles.organizationId',
          to: 'organizations.id',
        },
      },
      bundle: {
        relation: BaseModel.HasOneRelation,
        modelClass: Bundle,
        join: {
          from: 'organization_bundles.bundleId',
          to: 'bundles.id',
        },
      },
    }
  }
}
