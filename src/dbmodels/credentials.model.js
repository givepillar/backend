import { BaseModel } from './base.model'

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
        userId: { type: 'integer', format: 'uuid' },
        password: { type: 'string' },
        facebookCode: { type: 'string' },
        verificationCode: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    }
  }
}
