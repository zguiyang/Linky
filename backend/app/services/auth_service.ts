import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'
import { Exception } from '@adonisjs/core/exceptions'
import { DateTime } from 'luxon'
import User from '#models/user'
import { UserService } from '#services/user_service'
import { NotificationService } from '#services/notification_service'

@inject()
export class AuthService {
  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  async register(data: { email: string; name: string; password: string }) {
    logger.info({ email: data.email }, 'Registration attempt')

    const user = await this.userService.create(data)
    await this.notificationService.sendVerificationEmail(user)

    const token = await User.accessTokens.create(user)

    logger.info({ userId: user.id }, 'Registration successful')

    return { user, token }
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

    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw new Exception('User not found with this email', { status: 422 })
    }

    if (!user.emailVerifiedAt) {
      throw new Exception('Please verify your email address first', { status: 422 })
    }

    await this.notificationService.sendPasswordResetEmail(user)
  }

  async resetPassword(token: string, newPassword: string) {
    logger.info({ token }, 'Password reset attempt')

    const user = await this.userService.resetPassword(token, newPassword)

    if (!user) {
      logger.warn({ token }, 'Invalid or expired reset token')
      return null
    }

    logger.info({ userId: user.id }, 'Password reset successful')

    return user
  }

  async verifyEmail(token: string) {
    logger.info({ token }, 'Email verification attempt')

    const user = await this.userService.verifyEmail(token)

    if (!user) {
      logger.warn({ token }, 'Invalid verification token')
      return null
    }

    logger.info({ userId: user.id }, 'Email verification successful')

    return user
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

    await this.notificationService.sendVerificationEmail(user)

    logger.info({ userId: user.id }, 'Verification email resent')
  }
}
