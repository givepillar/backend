import BaseModel from './base.model'

class DonationTransaction extends BaseModel {
  static get tableName() {
    return 'donations_transactions'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['transactionId', 'donationId'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        transactionId: { type: 'string', format: 'uuid' },
        donationId: { type: 'string', format: 'uuid' },
      },
    }
  }

  static get relationMappings() {
    const Transaction = require(BaseModel.modelPaths + '/transaction.model')
    const Donation = require(BaseModel.modelPaths + '/donation.model')
    return {
      transaction: {
        relation: BaseModel.HasOneRelation,
        modelClass: Transaction,
        join: {
          from: 'donations_transactions.transactionId',
          to: 'transactions.id',
        },
      },
      donation: {
        relation: BaseModel.HasOneRelation,
        modelClass: Donation,
        join: {
          from: 'donations_transactions.donationId',
          to: 'donations.id',
        },
      },
    }
  }
}

module.exports = DonationTransaction
