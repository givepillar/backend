import SendgridMail from '@sendgrid/mail'

export default () => {
  SendgridMail.setApiKey(process.env.SENDGRID_API_KEY)
  return SendgridMail
}
