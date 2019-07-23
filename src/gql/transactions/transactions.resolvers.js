import { async } from 'rxjs/internal/scheduler/async'
import Transactions from './transactions.engine'
export default {
  Query: {
    transactionFromId: async (root, { id }) => Transactions(ctx).fromId(id),
  },
  //   Transaction: {
  //     id: async ({ id }) => {
  //       return id
  //     },
  //     from: async ({ id }) => {
  //       return 'FROM'
  //     },
  //     to: async ({ id }) => {
  //       return 'TO'
  //     },
  //     amount: async ({ id }) => {
  //       return 123
  //     },
  //     date: async ({ id }) => {
  //       return '1/11/2011'
  //     },
  //     charge: async ({ id }) => {
  //       return 501
  //     },
  //   },
}
