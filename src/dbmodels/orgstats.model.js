import BaseModel from './base.model'

class OrgStats extends BaseModel {
  static get tableName() {
    return 'orgstats'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'totalExpenses',
        'programmingExpenses',
        'fundraisingExpenses',
        'managementExpenses',
        'employeeCount',
        'volunteerCount',
        'executiveSalary',
        'hq',
      ],
      properties: {
        id: { type: 'string', format: 'uuid' },
        totalExpenses: { type: 'integer' },
        fundraisingExpenses: { type: 'integer' },
        programmingExpenses: { type: 'integer' },
        managementExpenses: { type: 'integer' },
        totalContributions: { type: 'integer' },
        employeeCount: { type: 'integer' },
        volunteerCount: { type: 'integer' },
        executiveSalary: { type: 'integer' },
        foundedDate: { type: 'string ' },
        hq: { type: 'string' },
      },
    }
  }
}

module.exports = OrgStats
