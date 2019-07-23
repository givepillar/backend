export default {
  Query: {
    a: (root, args, context, info) => {
      return {
        b: 'HELLO',
        c: 'WORLD',
      }
    },
  },
}
