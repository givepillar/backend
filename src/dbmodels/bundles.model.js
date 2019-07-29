import BaseModel from './base.model'
import { Model } from 'objection'

class Bundle extends BaseModel {
  static get tableName() {
    return 'bundles'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'categoryId'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        categoryId: { type: 'string', format: 'uuid' },
        active: { type: 'boolean' },
        slug: { type: 'string' },
        shortDescription: { type: 'string' },
        description: { type: 'string' },
        imageId: { type: 'string', format: 'uuid' },
        callToAction: { type: 'string' },
        lede: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    const Organization = require(BaseModel.modelPaths + '/organization')
    const OrganizationBundle = require(BaseModel.modelPaths + '/organizationbundle.model')

    return {
      organizations: {
        relation: Model.ManyToManyRelation,
        modelClass: Organization,
        join: {
          from: 'bundles.id',
          to: 'organizations.id',
          through: {
            modelClass: OrganizationBundle,
            from: 'organizations_bundles.bundleId',
            to: 'organizations_bundles.organizationId',
          },
        },
      },
      image: {
        relation: Model.HasOneRelation,
        modelClass: Image,
        join: {
          from: 'bundles.imageId',
          to: 'images.id',
        },
      },
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'bundles.categoryId',
          to: 'categories.id',
        },
      },
    }
  }
}

module.exports = Bundle
