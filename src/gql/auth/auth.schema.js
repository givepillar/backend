import { gql } from 'apollo-server-express'

export default gql`
  ####################### Q U E R I E S ##########################################

  ###############################################################################

  ####################### T Y P E S ##########################################

  input OnboardingInput {
    causes: [String!]!
    budget: [String!]! # eventually make this an enum, and the one before as well. Separate into its own module?
  }

  input SignupInput {
    firstName: String!
    lastName: String!
    zipCode: String
    onboarding: OnboardingInput
  }

  input AuthInput {
    email: String!
    password: String!
  }

  input ChangePasswordInput {
    email: String!
    newPassword: String!
    verificationCode: String!
  }

  type ChangePasswordResponse implements Response {
    accessToken: String!
    code: String
    success: Boolean!
    message: String
  }

  type SignupResponse implements Response {
    user: User
    code: String
    success: Boolean!
    message: String
  }

  type LoginResponse implements Response {
    accessToken: String
    code: String
    success: Boolean!
    message: String
  }
  ###########################################################################

  ####################### M U T A T I O N S ##########################################
  extend type Mutation {
    signupUser(newUser: SignupInput!, credentials: AuthInput!): SignupResponse!
    signupUserFacebook(facebookCode: String!): SignupResponse!
    verifyNewUser(email: String!, verificationCode: String!): LoginResponse!
    loginUser(credentials: AuthInput!): LoginResponse!
    refreshAccess(refreshToken: String!): LoginResponse!
    changePassword(newPassword: ChangePasswordInput!): ChangePasswordResponse!
    requestChangePassword: Response!
    deleteAccount: Response!
  }
  ################################################################################
`
