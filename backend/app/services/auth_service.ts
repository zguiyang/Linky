import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'
import { randomBytes } from 'node:crypto'

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

  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    const user = await User.findBy('email', email)

    if (!user) {
      return { success: false, message: '该邮箱未绑定用户' }
    }

    if (!user.emailVerifiedAt) {
      return { success: false, message: '请先验证您的邮箱地址' }
    }

    await this.sendResetPasswordEmail(user)
    return { success: true, message: '重置密码邮件已发送' }
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

    const verifyEmailModule = await import('#mails/verify_email_notification')
    const VerifyEmailNotification = verifyEmailModule.default
    await mail.send(new VerifyEmailNotification(user, verificationToken))
  }

  private async sendResetPasswordEmail(user: User): Promise<void> {
    const resetToken = generateToken()
    const expiresAt = DateTime.now().plus({ hours: 1 })

    user.resetPasswordToken = resetToken
    user.resetPasswordExpiresAt = expiresAt
    await user.save()

    const resetPasswordModule = await import('#mails/reset_password_notification')
    const ResetPasswordNotification = resetPasswordModule.default
    await mail.send(new ResetPasswordNotification(user, resetToken))
  }

  async resendVerificationEmail(user: User): Promise<{ success: boolean; message: string }> {
    if (user.emailVerifiedAt) {
      return { success: false, message: '邮箱已验证' }
    }

    if (user.verificationEmailSentAt) {
      const timeSinceLastSent = DateTime.now().diff(user.verificationEmailSentAt, 'minutes').minutes
      if (timeSinceLastSent < 1) {
        const remainingSeconds = Math.ceil(60 - timeSinceLastSent * 60)
        return { success: false, message: `请等待 ${remainingSeconds} 秒后重新发送` }
      }
    }

    await this.sendVerificationEmail(user)

    return { success: true, message: '验证邮件已发送' }
  }
}
