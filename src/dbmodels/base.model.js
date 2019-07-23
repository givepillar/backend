import { omit } from '../utils/arrays'
import { Model } from 'objection'

class BaseModel extends Model {
  static $secureFields = []

  static get modelPaths() {
    return [__dirname]
  }

  $formatJson(json, options) {
    return omit(super.$formatJson(json, options).filter(), this.constructor.$secureFields)
  }
}

export const BaseModel = softDelete()(BaseModel)
