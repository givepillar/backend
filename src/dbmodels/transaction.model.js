import { BaseModel } from './base.model'

class Transaction extends BaseModel {
  static get tableName() {
    return 'transactions'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['amount', 'toId', 'fromId'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        amount: { type: 'integer' },
        toId: { type: 'string', format: 'uuid' },
        fromId: { type: 'string', format: 'uuid' },
        description: { type: 'string' },
        currency: { type: 'string', enum: ['USD'] },
      },
    }
  }

  static get relationMappings() {
    // import account model here
    const Account = require(super.modelPaths() + '/account.model')

    return {
      to: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Account,
        join: {
          from: 'transactions.toId',
          to: 'accounts.id',
        },
      },
      from: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Account,
        join: {
          from: 'transactions.fromId',
          to: 'accounts.id',
        },
      },
    }
  }
}
