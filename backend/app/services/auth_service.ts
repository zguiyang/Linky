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

export class AuthService {
  async register(data: { email: string; name: string; password: string }) {
    const user = await User.create({
      email: data.email,
      fullName: data.name,
      password: data.password,
    })

    await this.sendVerificationEmail(user)

    return user
  }

  async login(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return { user, token }
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await User.findBy('email', email)

    if (!user) {
      throw new Exception('该邮箱未绑定用户', { status: 422 })
    }

    if (!user.emailVerifiedAt) {
      throw new Exception('请先验证您的邮箱地址', { status: 422 })
    }

    await this.sendResetPasswordEmail(user)
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await User.findBy('resetPasswordToken', token)

    if (!user || !user.resetPasswordExpiresAt || user.resetPasswordExpiresAt < DateTime.now()) {
      return null
    }

    user.password = newPassword
    user.resetPasswordToken = null
    user.resetPasswordExpiresAt = null
    await user.save()

    return user
  }

  async verifyEmail(token: string) {
    const user = await User.findBy('verificationToken', token)

    if (!user) {
      return null
    }

    user.emailVerifiedAt = DateTime.now()
    user.verificationToken = null
    user.verificationEmailSentAt = null
    await user.save()

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
    if (user.emailVerifiedAt) {
      throw new Exception('邮箱已验证', { status: 422 })
    }

    if (user.verificationEmailSentAt) {
      const timeSinceLastSent = DateTime.now().diff(user.verificationEmailSentAt, 'minutes').minutes
      if (timeSinceLastSent < 1) {
        const remainingSeconds = Math.ceil(60 - timeSinceLastSent * 60)
        throw new Exception(`请等待 ${remainingSeconds} 秒后重新发送`, { status: 422 })
      }
    }

    await this.sendVerificationEmail(user)
  }
}
