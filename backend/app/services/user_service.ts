import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import hash from '@adonisjs/core/services/hash'
import logger from '@adonisjs/core/services/logger'
import Mail from '@adonisjs/mail/services/main'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import { DateTime } from 'luxon'
import { VALIDATION } from '#constants'
import VerifyEmailNotification from '#mails/verify_email_notification'

@inject()
export class UserService {
  async create(data: { email: string; name: string; password: string }) {
    logger.info({ email: data.email }, 'Creating user')

    const user = await User.create({
      email: data.email,
      fullName: data.name,
      password: data.password,
    })

    logger.info({ userId: user.id }, 'User created')

    return user
  }

  async verifyEmail(token: string) {
    logger.info({ token }, 'Verifying email')

    const user = await this.isVerificationTokenValid(token)
    if (!user) {
      return null
    }

    user.emailVerifiedAt = DateTime.now()
    user.verificationToken = null
    user.verificationEmailSentAt = null
    await user.save()

    logger.info({ userId: user.id }, 'Email verified')

    return user
  }

  async resetPassword(token: string, newPassword: string) {
    logger.info({ token }, 'Resetting password')

    const user = await User.findBy('resetPasswordToken', token)
    if (!user || !user.resetPasswordExpiresAt || user.resetPasswordExpiresAt < DateTime.now()) {
      logger.warn({ token }, 'Invalid or expired reset token')
      return null
    }

    user.password = newPassword
    user.resetPasswordToken = null
    user.resetPasswordExpiresAt = null
    await user.save()

    logger.info({ userId: user.id }, 'Password reset')

    return user
  }

  async findByEmail(email: string) {
    return User.findBy('email', email)
  }

  async findById(userId: number) {
    return User.findOrFail(userId)
  }

  async update(userId: number, data: { fullName?: string | null }) {
    logger.info({ userId }, 'Updating user')

    const user = await User.findOrFail(userId)

    if (data.fullName !== undefined) {
      user.fullName = data.fullName
    }

    await user.save()

    logger.info({ userId }, 'User updated')

    return user
  }

  async updateVerificationToken(userId: number, token: string) {
    const user = await User.findOrFail(userId)
    user.verificationToken = token
    user.verificationEmailSentAt = DateTime.now()
    await user.save()
    return user
  }

  async updateResetPasswordToken(userId: number, token: string, expiresAt: DateTime) {
    const user = await User.findOrFail(userId)
    user.resetPasswordToken = token
    user.resetPasswordExpiresAt = expiresAt
    await user.save()
    return user
  }

  async changeEmail(userId: number, newEmail: string, password: string): Promise<User> {
    const user = await User.findOrFail(userId)

    const isValidPassword = await hash.verify(user.password, password)
    if (!isValidPassword) {
      throw new Exception('Invalid password', { status: 401 })
    }

    if (user.email === newEmail) {
      throw new Exception('New email must be different from current email', { status: 400 })
    }

    const newToken = randomUUID()
    logger.info({ userId, newEmail, oldToken: user.verificationToken, newToken }, 'Changing email')

    user.email = newEmail
    user.emailVerifiedAt = null
    user.verificationToken = newToken
    user.verificationEmailSentAt = DateTime.now()

    await user.save()

    logger.info({ userId, savedToken: user.verificationToken }, 'Email changed, token saved')

    await Mail.send(new VerifyEmailNotification(user, user.verificationToken!))

    logger.info({ userId, sentToken: user.verificationToken }, 'Verification email sent')

    return user
  }

  async isVerificationTokenValid(token: string): Promise<User | null> {
    logger.info({ token }, 'Validating verification token')

    const user = await User.findBy('verificationToken', token)

    logger.info(
      { token, found: !!user, hasSentAt: !!user?.verificationEmailSentAt },
      'Token lookup result'
    )

    if (!user || !user.verificationEmailSentAt) {
      return null
    }

    const sentAt = user.verificationEmailSentAt.toMillis()
    const now = DateTime.now().toMillis()
    const expiryMs = VALIDATION.EMAIL_VERIFICATION_EXPIRY_MINUTES * 60 * 1000

    logger.info({ token, sentAt, now, expiryMs, ageMs: now - sentAt }, 'Token expiry check')

    if (now - sentAt > expiryMs) {
      logger.warn({ token }, 'Token expired')
      return null
    }

    logger.info({ token, userId: user.id }, 'Token valid')
    return user
  }

  async resendVerificationEmail(userId: number): Promise<void> {
    const user = await User.findOrFail(userId)
    const cooldownMs = VALIDATION.VERIFICATION_RESEND_COOLDOWN_MINUTES * 60 * 1000

    if (user.verificationEmailSentAt) {
      const lastSent = user.verificationEmailSentAt.toMillis()
      const now = DateTime.now().toMillis()

      if (now - lastSent < cooldownMs) {
        throw new Exception(
          `Please wait ${VALIDATION.VERIFICATION_RESEND_COOLDOWN_MINUTES} minutes before resending`,
          { status: 429 }
        )
      }
    }

    user.verificationToken = randomUUID()
    user.verificationEmailSentAt = DateTime.now()
    await user.save()

    await Mail.send(new VerifyEmailNotification(user, user.verificationToken!))

    logger.info({ userId }, 'Verification email resent')
  }
}
