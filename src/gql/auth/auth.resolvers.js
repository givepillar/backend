import AuthEngine from '../auth/auth.engine'
export default {
  Mutation: {
    signupUser: async (p, { newUser, credentials }, context, _) => {
      return await AuthEngine(context).signupUser({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        zipCode: newUser.zipCode,
        onboarding: newUser.onboarding,
        email: credentials.email,
        password: credentials.password,
      })
    },
    signupUserFacebook: async (p, { facebookCode }, context, _) =>
      await AuthEngine(context).signupUserFacebook(facebookCode),
    verifyNewUser: async (p, { email, verificationCode }, context, _) =>
      await AuthEngine(context).verifyNewUser({ email, verificationCode }),
    loginUser: async (p, { credentials }, context, _) =>
      await AuthEngine(context).loginUser({
        email: credentials.email,
        password: credentials.password,
      }),
    // loginUserFacebook: async (p, { facebookCode }, context, _) =>
    //   await AuthEngine(context).loginUserFacebook(facebookCode),
    refreshAccess: async (p, { refreshToken }, context, _) =>
      await AuthEngine(context).refreshAccess(refreshToken),
    changePassword: async (p, { email, verificationCode, newPassword }, context, _) =>
      await AuthEngine(context).changePassword({ email, verificationCode, newPassword }),
    requestChangePassword: async (p, args, context, _) =>
      await AuthEngine(context).requestChangePassword(),
    deleteAccount: async (p, args, context, _) => await AuthEngine(context).deleteAccount(),
  },
}
