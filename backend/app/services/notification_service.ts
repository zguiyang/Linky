import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'
import User from '#models/user'
import VerifyEmailNotification from '#mails/verify_email_notification'
import ResetPasswordNotification from '#mails/reset_password_notification'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'
import { randomBytes } from 'node:crypto'

function generateToken(): string {
  return randomBytes(32).toString('hex')
}

@inject()
export class NotificationService {
  async sendVerificationEmail(email: string, name: string | null, token: string): Promise<void> {
    logger.info({ email }, 'Sending verification email')

    await mail.send(new VerifyEmailNotification(email, name, token))

    logger.info({ email }, 'Verification email sent')
  }

  async sendPasswordResetEmail(user: User): Promise<void> {
    logger.info({ userId: user.id }, 'Sending password reset email')

    const token = generateToken()
    const expiresAt = DateTime.now().plus({ hours: 1 })

    user.resetPasswordToken = token
    user.resetPasswordExpiresAt = expiresAt
    await user.save()

    await mail.send(new ResetPasswordNotification(user, token))

    logger.info({ userId: user.id }, 'Password reset email sent')
  }
}
