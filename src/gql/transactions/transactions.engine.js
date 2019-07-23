const dummyTxs = [
  {
    id: 1,
    from: 'John',
    to: 'unicef',
    amount: 1024,
    date: '1/1/17',
    charge: '0192h4',
  },
  {
    id: 2,
    from: 'Miles',
    to: 'heifer',
    amount: 50600,
    date: '1/3/17',
    charge: 'abdslf',
  },
  {
    id: 3,
    from: 'Gary',
    to: 'wwf',
    amount: 991,
    date: '1/2/17',
    charge: '0asdf2h4',
  },
]

const TransactionsModel = context => ({
  fromId: async id => {
    return dummyTxs[id < dummyTxs.length ? id - 1 : 0]
  },
  create: ({ from, to, amount }) => {
    // ADMIN ONLY
    const newTx = {
      from,
      to,
      amount,
      id: dummyTxs.length,
    }
    dummyTxs.push(newTx)
    return newTx
  },
})
