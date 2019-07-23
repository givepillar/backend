import { BaseModel } from './base.model'
import { Model } from 'objection'

class User extends BaseModel {
  static get tableName() {
    return 'users'
  }

  static get virtualAttributes() {
    return ['fullName']
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'email'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        addressId: { type: 'string', format: 'uuid' },
        email: { type: 'string' },
        credentialsId: { type: 'string', format: 'uuid' },
        role: { type: 'string', enum: ['DONOR', 'ADMIN'] },
        accountId: { type: 'string', format: 'uuid' },
      },
    }
  }

  static get relationMappings() {
    const Address = require(super.modelPaths() + '/address.model')
    const Credentials = require(super.modelPaths() + '/credentials.model')
    const Account = require(super.modelPaths() + 'account.model')

    return {
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: 'users.addressId',
          to: 'addresses.id',
        },
      },
      credentials: {
        relation: Model.HasOneRelation,
        modelClass: Credentials,
        join: {
          from: 'users.credentialsId',
          to: 'credentials.id',
        },
      },
      account: {
        relation: Model.HasOneRelation,
        modelClass: Account,
        join: {
          from: 'users.accountId',
          to: 'accounts.id',
        },
      },
    }
  }
}
