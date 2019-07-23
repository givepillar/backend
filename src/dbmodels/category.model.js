import { BaseModel } from './base.model'

class Category extends BaseModel {
  static get tableName() {
    return 'categories'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'color'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        slug: { type: 'string' },
        color: { type: 'string' },
        colorLight: { type: 'string' },
        colorDark: { type: 'string' },
      },
    }
  }
}
