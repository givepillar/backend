import UsersEngine from './users.engine'
export default {
  Query: {
    viewer: async (_, __, ctx) => ctx.user,
  },
  User: {
    portfolio: async (_, { id }, ctx) => {},
    // HERE, resolve any user fields not returned by Users model.
  },
}
