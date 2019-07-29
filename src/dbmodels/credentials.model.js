import BaseModel from './base.model'

class Credentials extends BaseModel {
  static get tableName() {
    return 'credentials'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'string', format: 'uuid' },
        password: { type: 'string' },
        facebookAccessToken: { type: 'string' },
        verificationCode: { type: 'string' },
        refreshToken: { type: 'string' },
        verified: { type: 'boolean' },
      },
    }
  }
}

module.exports = Credentials
