import User from '../../dbmodels/user.model'

/*
 * User model file that contains logic for querying and mutating users.
 */

const UsersEngine = context => ({
  viewer: () => {
    return context.viewer
  },
  createUser: async ({ firstName, lastName, email, addressId, credentialsId }) => {
    return await User.query().insert({ firstName, lastName, email, addressId, credentialsId })
  },
  fromId: id => {
    return User.query().findById(id)
  },
  fromEmail: email => {
    return User.query()
      .findOne()
      .where('email', email)
  },
})

export default UsersEngine
