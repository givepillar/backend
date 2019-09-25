import UsersEngine from './users.engine'
import Axios from 'axios'
export default {
  Query: {
    viewer: async (_, __, ctx) => {
      return UsersEngine(ctx).viewer()
    },
  },
  User: {
    portfolio: async (_, { id }, ctx) => {},
    // HERE, resolve any user fields not returned by Users model.
  },
  Mutation: {
    listSignup: async (_, { email }, ctx) => {
      let mailchimpInstance = 'us20'
      let listUniqueId = '3f09e86dbe'
      let mailchimpApiKey = 'e336aaf30182035236952901158bfce2-us20-us6'

      try {
        await Axios({
          method: 'post',
          url: `https://${mailchimpInstance}.api.mailchimp.com/3.0/lists/${listUniqueId}`,
          // headers: {
          // 'Content-Type': 'application/json;charset=utf-8',
          // },
          auth: {
            username: 'anystring',
            password: 'e336aaf30182035236952901158bfce2-us20',
          },
          data: {
            members: [{ email_address: email, status: 'subscribed', merge_fields: {} }],
            update_existing: true,
          },
        })

        return {
          code: 200,
          success: true,
        }
      } catch (e) {
        console.error(e.response.data)
        return {
          code: 500,
          success: false,
          message: 'Could not subscribe',
        }
      }
    },
  },
}
