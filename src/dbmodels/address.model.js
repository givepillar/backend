import BaseModel from './base.model'

class Address extends BaseModel {
  static get tableName() {
    return 'addresses'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['zipCode'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        zipCode: { type: 'string' },
        streetAddress: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        country: { type: 'string' },
      },
    }
  }
}

module.exports = Address
