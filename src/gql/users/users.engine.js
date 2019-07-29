import User from '../../dbmodels/user.model'

/*
 * User model file that contains logic for querying and mutating users.
 */

const UsersEngine = context => ({
  viewer: () => {
    return context.user
  },
  createUser: async ({ firstName, lastName, email, addressId, credentialsId }) => {
    console.log('ADDRESS')
    console.log(addressId)
    const body = { firstName, lastName, email, addressId: null, credentialsId }
    console.log(body)
    return await User.query()
      .insert(body)
      .returning('*')
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
