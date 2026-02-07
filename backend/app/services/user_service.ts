import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import hash from '@adonisjs/core/services/hash'
import logger from '@adonisjs/core/services/logger'
import { randomUUID } from 'node:crypto'
import redis from '@adonisjs/redis/services/main'
import User from '#models/user'
import { DateTime } from 'luxon'
import { EMAIL_VERIFICATION } from '#constants'
import { NotificationService } from '#services/notification_service'

@inject()
export class UserService {
  constructor(private notificationService: NotificationService) {}
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
    logger.info({ token }, 'Verifying email via Redis')

    const email = await this.getEmailFromToken(token)
    if (!email) {
      return null
    }

    const user = await User.findBy('email', email)
    if (!user) {
      throw new Exception('User not found', { status: 404 })
    }

    user.isEmailVerified = true
    await user.save()

    logger.info({ userId: user.id }, 'Email verified')

    return user
  }

  async getEmailFromToken(token: string): Promise<string | null> {
    const key = `verify:${token}`
    const email = await redis.get(key)
    if (!email) {
      return null
    }
    await redis.del(key)
    return email
  }

  async verifyEmailByUser(userId: number, token: string) {
    const email = await this.getEmailFromToken(token)
    if (!email) {
      throw new Exception('Invalid or expired verification token', { status: 403 })
    }

    const user = await User.findOrFail(userId)
    if (user.email !== email) {
      throw new Exception('Email mismatch', { status: 403 })
    }

    return await this.verifyEmail(token)
  }

  async resetPassword(token: string, newPassword: string) {
    logger.info({ token }, 'Resetting password')

    const user = await User.findBy('resetPasswordToken', token)
    if (!user || !user.resetPasswordExpiresAt || user.resetPasswordExpiresAt < DateTime.now()) {
      throw new Exception('Invalid or expired reset token', { status: 403 })
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
      throw new Exception('Invalid password', { status: 403 })
    }

    if (user.email === newEmail) {
      throw new Exception('New email must be different from current email', { status: 400 })
    }

    const existingUser = await User.findBy('email', newEmail)
    if (existingUser) {
      throw new Exception('Email is already in use', { status: 400 })
    }

    const canSend = await this.checkCanSend(newEmail)
    if (!canSend) {
      throw new Exception('Verification email already sent, please wait 30 minutes', {
        status: 429,
      })
    }

    logger.info({ userId, newEmail }, 'Changing email')

    const token = await this.storeEmailVerificationToken(newEmail)

    await this.notificationService.sendVerificationEmail(newEmail, user.fullName, token)

    await this.setSendRate(newEmail)

    logger.info({ userId, newEmail }, 'Email change initiated, verification email sent')

    return user
  }

  async resendVerificationEmail(userId: number): Promise<void> {
    const user = await User.findOrFail(userId)

    if (user.isEmailVerified) {
      throw new Exception('Email already verified', { status: 400 })
    }

    const canSend = await this.checkCanSend(user.email)
    if (!canSend) {
      throw new Exception('Verification email already sent, please wait 30 minutes', {
        status: 429,
      })
    }

    const token = await this.storeEmailVerificationToken(user.email)

    await this.notificationService.sendVerificationEmail(user.email, user.fullName, token)

    await this.setSendRate(user.email)

    logger.info({ userId }, 'Verification email resent')
  }

  async storeEmailVerificationToken(email: string): Promise<string> {
    const token = randomUUID()
    const key = `verify:${token}`

    await redis.set(key, email, 'EX', EMAIL_VERIFICATION.EXPIRY_MINUTES * 60)

    logger.info({ email, token }, 'Email verification token stored in Redis')

    return token
  }

  private async checkCanSend(email: string): Promise<boolean> {
    const rateKey = `verify:rate:${email}`
    return !(await redis.exists(rateKey))
  }

  private async setSendRate(email: string): Promise<void> {
    const rateKey = `verify:rate:${email}`
    await redis.set(rateKey, '1', 'EX', EMAIL_VERIFICATION.EXPIRY_MINUTES * 60)
  }
}
