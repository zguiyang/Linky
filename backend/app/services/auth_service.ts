import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'
import User from '#models/user'
import VerifyEmailNotification from '#mails/verify_email_notification'
import ResetPasswordNotification from '#mails/reset_password_notification'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'
import { randomBytes } from 'node:crypto'
import { Exception } from '@adonisjs/core/exceptions'

function generateToken(): string {
  return randomBytes(32).toString('hex')
}

@inject()
export class AuthService {
  async register(data: { email: string; name: string; password: string }) {
    logger.info({ email: data.email }, 'Registration attempt')

    const user = await User.create({
      email: data.email,
      fullName: data.name,
      password: data.password,
    })

    await this.sendVerificationEmail(user)

    logger.info({ userId: user.id }, 'Registration successful')

    return user
  }

  async login(email: string, password: string) {
    logger.info({ email }, 'Login attempt')

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    logger.info({ userId: user.id }, 'Login successful')

    return { user, token }
  }

  async requestPasswordReset(email: string): Promise<void> {
    logger.info({ email }, 'Password reset request')

    const user = await User.findBy('email', email)

    if (!user) {
      throw new Exception('User not found with this email', { status: 422 })
    }

    if (!user.emailVerifiedAt) {
      throw new Exception('Please verify your email address first', { status: 422 })
    }

    await this.sendResetPasswordEmail(user)
  }

  async resetPassword(token: string, newPassword: string) {
    logger.info({ token }, 'Password reset attempt')

    const user = await User.findBy('resetPasswordToken', token)

    if (!user || !user.resetPasswordExpiresAt || user.resetPasswordExpiresAt < DateTime.now()) {
      logger.warn({ token }, 'Invalid or expired reset token')
      return null
    }

    user.password = newPassword
    user.resetPasswordToken = null
    user.resetPasswordExpiresAt = null
    await user.save()

    logger.info({ userId: user.id }, 'Password reset successful')

    return user
  }

  async verifyEmail(token: string) {
    logger.info({ token }, 'Email verification attempt')

    const user = await User.findBy('verificationToken', token)

    if (!user) {
      logger.warn({ token }, 'Invalid verification token')
      return null
    }

    user.emailVerifiedAt = DateTime.now()
    user.verificationToken = null
    user.verificationEmailSentAt = null
    await user.save()

    logger.info({ userId: user.id }, 'Email verification successful')

    return user
  }

  private async sendVerificationEmail(user: User): Promise<void> {
    const verificationToken = generateToken()

    user.verificationToken = verificationToken
    user.verificationEmailSentAt = DateTime.now()
    await user.save()

    await mail.send(new VerifyEmailNotification(user, verificationToken))
  }

  private async sendResetPasswordEmail(user: User): Promise<void> {
    const resetToken = generateToken()
    const expiresAt = DateTime.now().plus({ hours: 1 })

    user.resetPasswordToken = resetToken
    user.resetPasswordExpiresAt = expiresAt
    await user.save()

    await mail.send(new ResetPasswordNotification(user, resetToken))
  }

  async resendVerificationEmail(user: User): Promise<void> {
    logger.info({ userId: user.id }, 'Resend verification email attempt')

    if (user.emailVerifiedAt) {
      throw new Exception('Email has already been verified', { status: 422 })
    }

    if (user.verificationEmailSentAt) {
      const timeSinceLastSent = DateTime.now().diff(user.verificationEmailSentAt, 'minutes').minutes
      if (timeSinceLastSent < 1) {
        const remainingSeconds = Math.ceil(60 - timeSinceLastSent * 60)
        throw new Exception(`Please wait ${remainingSeconds} seconds before resending`, {
          status: 422,
        })
      }
    }

    await this.sendVerificationEmail(user)

    logger.info({ userId: user.id }, 'Verification email resent')
  }
}
