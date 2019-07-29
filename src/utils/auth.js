import User from '../dbmodels/user.model'
import { generate } from './crypto'

export const userFromAccessToken = async token => {
  return await User.query().findById(token)
}

export const generateAccessToken = async userId => userId

export const generateRefreshToken = async () => generate()
