import UsersEngine from '../users/users.engine'
import Credentials from '../../dbmodels/credentials.model'
import Address from '../../dbmodels/address.model'
import { generateAccessToken, generateRefreshToken } from '../../utils/auth'
import bcrypt from 'bcryptjs'
import User from '../../dbmodels/user.model'
import { AuthenticationError, ApolloError } from 'apollo-server-core'

const SALT_ROUNDS = 12

const AuthEngine = context => ({
  signupUser: async ({ firstName, lastName, email, password, zipCode, onboarding }) => {
    if (
      await User.query()
        .where('email', email)
        .first()
    ) {
      throw new ApolloError('email already exists')
    }

    // 1. CREATE ADDRESS and ADD to 'addresses' TABLE
    const address = zipCode ? await Address.query().insert({ zipCode }) : null

    // 2. HASH PW and CREATE CREDENTIALS and ADD to 'credentials' TABLE
    const user = await new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
        if (err) reject(err)
        const credentials = await Credentials.query()
          .insert({
            verified: true, // user automatically verified when they go through FB
            verificationCode: null,
            password: hash,
          })
          .returning('*')

        // 3. CREATE USER and ADD to 'users' TABLE
        const user = await UsersEngine(context).createUser({
          firstName,
          lastName,
          email,
          addressId: address ? address.id : null,
          credentialsId: credentials.id,
        })

        resolve(user)
      })
    })
    if (user)
      return {
        user,
        success: true,
        message: 'signup successful',
      }
    throw new ApolloError('failed to sign up user')
  },
  signupUserFacebook: async facebookCode => {
    // populate user object
    const userFromFB = null
    const fbAccessToken = facebookCode // grab this from fb

    // ADD CREDENTIALS
    const credentials = await new Promise((resolve, reject) => {
      bcrypt.hash(fbAccessToken, SALT_ROUNDS, async (err, hash) => {
        if (err) reject(err)
        resolve(
          await Credentials.query()
            .insert({
              verified: true, // user automatically verified when they go through fb
              verificationCode: null,
              facebookAccessToken: hash,
            })
            .returning('*')
        )
      })
    })

    // add user to db (from userFromFB)
    return await UsersEngine(context).createUser({ credentialsId: credentials.id })
  },
  verifyNewUser: async ({ verificationCode }) => {
    // generate refresh token
    const refreshToken = await generateRefreshToken()
    const credentials = await Credentials.query()
      .patch({ refreshToken })
      .returning('*')
    const user = await User.query()
      .where({ credentialsId: credentials.id })
      .first()

    // hash refresh token before attempting to add to DB
    // ADD CREDENTIALS
    // const credentials = await new Promise((resolve, reject) => {
    //   bcrypt.hash(refreshToken, SALT_ROUNDS, async (err, hash) => {
    //     if (err) reject(err)
    //     resolve(
    //       await Credentials.query()
    //         .where('verificationCode', verificationCode)
    //         .first()
    //         .patch({ verified: true, verificationCode: null, refreshToken: hash })
    //         .returning('*')
    //     )
    //   })
    // })

    // if above ADD was successful (verification code was matched)
    // then return an access token with success, otherwise failure
    if (credentials) {
      return successfulLoginResponse({ id: user.id }, 'verification successful')
    }
    throw new AuthenticationError('verification failed')
  },
  loginUser: async ({ email, password }, checkVerification = false) => {
    const user = await User.query()
      .where('email', email)
      .first()
    if (!user) throw new AuthenticationError('email does not exist')
    const credentials = await user.$relatedQuery('credentials')

    const success = await new Promise((resolve, reject) => {
      bcrypt.compare(password, credentials.password, async (err, res) => {
        if (err) reject(err)
        resolve(checkVerification ? res && credentials.verified : res)
      })
    })
    if (success) return successfulLoginResponse({ id: user.id }, 'login successful')
    throw new AuthenticationError('login failed')
  },
  loginUserFacebook: async ({ email, password }) => {
    // THIS RUNS IN THE CASE THAT A USER IS LOGGED OUT AND HAS TO SIGN BACK IN THROUGH FACEBOOL
    // DO I CHECK AGAINST OUR REFRESH TOKEN, OR DOES A NEW FACEBOOK CODE GET SENT, OR WHAT?
  },
  refreshAccess: async (refreshToken, checkVerification = false) => {
    const user = await User.query()
      .where('email', email)
      .first()
    const credentials = await user.$relatedQuery('credentials')
    const success = await new Promise((resolve, reject) => {
      bcrypt.compare(refreshToken, credentials.refreshToken, async (err, res) => {
        // make sure user is verified AND the password is correct
        if (err) reject(err)
        resolve(checkVerification ? res && credentials.verified : res)
      })
    })
    if (success) return successfulLoginResponse({ id: user.id }, 'refresh successful')
    throw new AuthenticationError('invalid refresh token')
  },
  requestChangePassword: async () => {
    const user = await User.query().findById(context.user.id)
    // null out current password AND
    user.$relatedQuery('credentials').patch({ verified: false, password: null })
    // send email to user.email
    return { success: true, message: 'request for password change successful' }
  },
  changePassword: async ({ email, verificationCode, newPassword }) => {
    const userFromEmail = User.query()
      .where('email', email)
      .first()
    const userFromVerificationCode = User.query()
      .where('verificationCode', verificationCode)
      .first()
    // check to make sure this user is the one who requested password change
    if (userFromEmail.id === userFromVerificationCode.id) {
      // hash and enter new password
      const success = await new Promise((resolve, reject) => {
        bcrypt.hash(newPassword, SALT_ROUNDS, async (err, hash) => {
          if (err) reject(err)
          resolve(
            await Credentials.query()
              .insert({
                verified: true, // user automatically verified when they go through FB
                verificationCode: null,
                password: hash,
              })
              .returning('*')
          )
        })
      })
      if (success)
        return successfulLoginResponse({ id: userFromEmail.id }, 'password change successful')
      throw new AuthenticationError('password change unsuccessful')
    }
  },
  deleteAccount: async () => {
    const user = await User.query()
      .deleteById(context.user.id)
      .returning('*')
    return { success: true, message: 'delete successful' }
  },
})

const successfulLoginResponse = async (userInfo, message) => ({
  success: true,
  message,
  accessToken: await generateAccessToken(userInfo.id),
})

export default AuthEngine
