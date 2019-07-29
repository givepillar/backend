import { BaseModel } from './base.model'
import { Model } from 'objection'

class Charge extends BaseModel {
  static get tableName() {
    return 'charges'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['accountId', 'amount', 'stripeChargeId'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        accountId: { type: 'string', format: 'uuid' },
        amount: { type: 'integer' },
        stripeChargeId: { type: 'string' },
        type: { type: 'string' },
        paymentMethod: { type: 'string' },
        currency: { type: 'string', enum: ['USD'] },
      },
    }
  }

  static get relationMappings() {
    const Account = require(BaseModel.modelPaths + '/account.model')

    return {
      account: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account,
        join: {
          from: 'charges.accountId',
          to: 'accounts.id',
        },
      },
    }
  }
}
