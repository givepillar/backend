import { omit } from '../utils/arrays'
import { Model } from 'objection'

export class BaseModel extends Model {
  static $secureFields = []

  static get modelPaths() {
    return [__dirname]
  }

  $formatJson(json, options) {
    return omit(super.$formatJson(json, options).filter(), this.constructor.$secureFields)
  }
}
