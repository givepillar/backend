/*
 * User model file that contains logic for querying and mutating users.
 */

const dummyUsers = [
  {
    id: 1,
    firstName: 'Cersei',
    lastName: 'Lannister',
    email: 'cersei@gmail.com',
    role: 'ADMIN',
  },
  {
    id: 2,
    firstName: 'Daenerys',
    lastName: 'Targaryen',
    email: 'daenerys@gmail.com',
    role: 'DONOR',
  },
  {
    id: 3,
    firstName: 'Jon',
    lastName: 'Snow',
    email: 'jonsnow@gmail.com',
    role: 'DONOR',
  },
  {
    id: 4,
    firstName: 'Tormund',
    lastName: 'Gianstbane',
    email: 'tormund@gmail.com',
    role: 'DONOR',
  },
  {
    id: 5,
    firstName: 'Eddard',
    lastName: 'Stark',
    email: 'ned@gmail.com',
    role: 'DONOR',
  },
]

const UserModel = context => ({
  fromId: id => {
    return dummyUsers[id < dummyUsers.length ? id - 1 : 0]
  },
  fromEmail: email => {
    for (let idx in dummyUsers) {
      if (dummyUsers[idx].email === email) return dummyUsers[idx]
    }
    return {}
  },
  me: () => {
    return dummyUsers[0]
  },
  create: ({ email, firstName, lastName, zipCode }) => {
    // ADMIN ONLY
    const newUser = {
      email,
      firstName,
      lastName,
      zipCode,
      id: dummyUsers.length,
      role: 'DONOR',
    }
    dummyUsers.push(newUser)
    return newUser
  },
  // update: ({ email, firstName, lastName, zipCode }) => {
  //   const newUser = {
  //     email ? email :
  //     firstName,
  //     lastName,
  //     zipCode,
  //     id: dummyUsers.length,
  //     role: 'DONOR',
  //   }
  //   dummyUsers.push(newUser)
  //   return newUser
  // },
})

export default UserModel
