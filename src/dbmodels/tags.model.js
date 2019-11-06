import BaseModel from './base.model'

class Tag extends BaseModel {
  static get tableName() {
    return 'tags'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
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

module.exports = Tag
