import BaseModel from './base.model'

class Account extends BaseModel {
  static get tableName() {
    return 'accounts'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        stripeCustomerId: { type: 'string' },
        cardBrand: { type: 'string' },
        cardLast4: { type: 'string' },
        currency: { type: 'string', enum: ['USD'] },
      },
    }
  }
}
