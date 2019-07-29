import User from '../dbmodels/user.model'
import { generate } from './crypto'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-core'

export const userFromAccessToken = async token => {
  try {
    const payload = jwt.verify(token, process.env.SECRET)
    return await User.query().findById(payload.userId)
  } catch (err) {
    throw new AuthenticationError(err.message)
  }
}

export const generateAccessToken = async userId =>
  jwt.sign({ userId }, process.env.SECRET, { expiresIn: '7d' })

export const generateRefreshToken = async () => generate()

// AUTHORIZATION UTILITY FUNCTIONS
