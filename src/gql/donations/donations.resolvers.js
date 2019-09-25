import stripeApi from 'stripe'

export default {
  Mutation: {
    hostedDonation: async (
      p,
      { bundleName, bundleSlug, bundleDescription, bundlePhoto, amount, origin },
      context,
      _
    ) => {
      const stripe = stripeApi(process.env.STRIPE_API_SECRET)

      const baseUrl = origin ? origin : 'https://pillar.gives'

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            name: bundleName,
            description: bundleDescription,
            images: [bundlePhoto],
            amount: amount,
            currency: 'usd',
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/to/${bundleSlug}/success`,
        cancel_url: `${baseUrl}/to/${bundleSlug}`,
      })

      return {
        code: 200,
        success: true,
        sessionId: session.id,
      }
    },
  },
}
