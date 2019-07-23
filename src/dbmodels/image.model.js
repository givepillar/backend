import { BaseModel } from './base.model'

class Image extends BaseModel {
  static get tableName() {
    return 'images'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['url'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        url: { type: 'string' },
        alt: { type: 'string' },
      },
    }
  }
}
