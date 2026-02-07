import { BaseMail } from '@adonisjs/mail'
import env from '#start/env'

export default class VerifyEmailNotification extends BaseMail {
  constructor(
    private email: string,
    private name: string | null,
    private token: string
  ) {
    super()
  }

  from = env.get('MAIL_FROM_ADDRESS')
  subject = 'Verify Your Email Address - Linky'

  prepare() {
    const verifyUrl = `${env.get('CLIENT_URL', env.get('APP_URL'))}/verify-email?token=${this.token}`

    this.message.to(this.email).htmlView('emails/verify_email', {
      email: this.email,
      name: this.name,
      verifyUrl,
    })
  }
}
