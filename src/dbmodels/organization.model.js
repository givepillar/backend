import BaseModel from './base.model'
import { Model } from 'objection'

class Organization extends BaseModel {
  static get tableName() {
    return 'organizations'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        accountId: { type: 'string', format: 'uuid' },
        addressId: { type: 'string', format: 'uuid' },
        shortDescription: { type: 'string' },
        description: { type: 'string' },
        taxId: { type: 'string' },
        type: { type: 'string', enum: ['CHARITY'] },
        slug: { type: 'string' },
        annualRevenue: { type: 'integer' },
        categoryId: { type: 'string', format: 'uuid' },
        impacts: { type: 'object' },
        imageId: { type: 'string', format: 'uuid' },
      },
    }
  }

  static get relationMappings() {
    // import account model here
    const Account = require(BaseModel.modelPaths + '/account.model')
    const Address = require(BaseModel.modelPaths + '/address.model')
    const Category = require(BaseModel.modelPaths + '/category.model')
    const Image = require(BaseModel.modelPaths + '/image.model')
    const Bundle = reqire(BaseModel.modelPaths + 'bundle.model')
    const OrganizationBundle = reqire(BaseModel.modelPaths + 'organizationbundle.model')

    return {
      account: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account,
        join: {
          from: 'organizations.accountId',
          to: 'accounts.id',
        },
      },
      address: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account,
        join: {
          from: 'organizations.addressId',
          to: 'addresses.id',
        },
      },
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'organizations.categoryId',
          to: 'categories.id',
        },
      },
      image: {
        relation: Model.BelongsToOneRelation,
        modelClass: Image,
        join: {
          from: 'organizations.imageId',
          to: 'images.id',
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
