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

    const user = await this.verifyEmailFromRedis(token)
    if (!user) {
      return null
    }

    logger.info({ userId: user.id }, 'Email verified')
    return user
  }

  async verifyEmailByUser(userId: number, token: string) {
    const key = `${EMAIL_VERIFICATION.KEY_PREFIX}${token}`
    const data = await redis.hgetall(key)

    if (!data || Number(data.userId) !== userId) {
      return null
    }

    return await this.verifyEmail(token)
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

    logger.info({ userId, newEmail }, 'Changing email')

    const token = await this.storeEmailVerificationToken(userId, user.email, newEmail)

    await this.notificationService.sendVerificationEmail(newEmail, user.fullName, token)

    logger.info({ userId, newEmail }, 'Email change initiated, verification email sent')

    return user
  }

  async resendVerificationEmail(userId: number): Promise<void> {
    const user = await User.findOrFail(userId)

    if (user.isEmailVerified) {
      throw new Exception('Email already verified', { status: 400 })
    }

    const inCooldown = await this.checkVerificationCooldown(userId)
    if (inCooldown) {
      throw new Exception(
        `Please wait ${EMAIL_VERIFICATION.COOLDOWN_MINUTES} minute(s) before resending`,
        { status: 429 }
      )
    }

    const token = await this.storeEmailVerificationToken(userId, user.email, user.email)

    await this.notificationService.sendVerificationEmail(user.email, user.fullName, token)

    await this.setVerificationCooldown(userId)

    logger.info({ userId }, 'Verification email resent')
  }

  private async storeEmailVerificationToken(
    userId: number,
    oldEmail: string,
    newEmail: string
  ): Promise<string> {
    const token = randomUUID()
    const key = `${EMAIL_VERIFICATION.KEY_PREFIX}${token}`
    const now = DateTime.now().toISO()

    await redis.hset(key, {
      userId: userId.toString(),
      oldEmail,
      newEmail,
      createdAt: now,
    })

    await redis.expire(key, EMAIL_VERIFICATION.EXPIRY_MINUTES * 60)

    logger.info({ userId, oldEmail, newEmail, token }, 'Email verification token stored in Redis')

    return token
  }

  async verifyEmailFromRedis(token: string): Promise<User | null> {
    const key = `${EMAIL_VERIFICATION.KEY_PREFIX}${token}`
    const data = await redis.hgetall(key)

    if (!data || Object.keys(data).length === 0) {
      logger.warn({ token }, 'Token not found or expired in Redis')
      return null
    }

    const createdAt = DateTime.fromISO(data.createdAt)
    const elapsed = DateTime.now().diff(createdAt, 'minutes').minutes
    if (elapsed > EMAIL_VERIFICATION.EXPIRY_MINUTES) {
      await redis.del(key)
      logger.warn({ token }, 'Token expired, deleted from Redis')
      return null
    }

    const user = await User.find(Number(data.userId))
    if (!user) {
      await redis.del(key)
      logger.warn({ token, userId: data.userId }, 'User not found')
      return null
    }

    if (user.email !== data.oldEmail) {
      await redis.del(key)
      logger.warn({ token }, 'Email mismatch during verification, token deleted')
      return null
    }

    user.email = data.newEmail
    user.isEmailVerified = true
    await user.save()

    await redis.del(key)

    logger.info({ userId: user.id }, 'Email verified via Redis')

    return user
  }

  private async checkVerificationCooldown(userId: number): Promise<boolean> {
    const cooldownKey = `${EMAIL_VERIFICATION.KEY_PREFIX}cooldown:${userId}`
    const inCooldown = await redis.get(cooldownKey)
    return !!inCooldown
  }

  private async setVerificationCooldown(userId: number): Promise<void> {
    const cooldownKey = `${EMAIL_VERIFICATION.KEY_PREFIX}cooldown:${userId}`
    await redis.setex(cooldownKey, EMAIL_VERIFICATION.COOLDOWN_MINUTES * 60, '1')
  }
}
