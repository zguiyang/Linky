import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'
import User from '#models/user'
import { DateTime } from 'luxon'

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

    const user = await User.findBy('verificationToken', token)
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
}
