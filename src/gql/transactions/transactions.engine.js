const TransactionsModel = context => ({
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
