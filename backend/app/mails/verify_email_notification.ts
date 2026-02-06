import { BaseMail } from '@adonisjs/mail'
import User from '#models/user'
import env from '#start/env'

export default class VerifyEmailNotification extends BaseMail {
  constructor(
    private user: User,
    private token: string
  ) {
    super()
  }

  from = env.get('MAIL_FROM_ADDRESS')
  subject = 'Verify Your Email Address - Linky'

  prepare() {
    const verifyUrl = `${env.get('CLIENT_URL', env.get('APP_URL'))}/verify-email?token=${this.token}`

    this.message.to(this.user.email).htmlView('emails/verify_email', {
      user: this.user,
      verifyUrl,
    })
  }
}
