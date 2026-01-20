import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import mail from '@adonisjs/mail/services/main'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { randomBytes } from 'node:crypto'

function generateToken(): string {
  return randomBytes(32).toString('hex')
}

export class AuthService {
  async register(data: { email: string; name: string; password: string }) {
    const hashedPassword = await hash.use('scrypt').make(data.password)
    const verificationToken = generateToken()

    const user = await User.create({
      email: data.email,
      fullName: data.name,
      password: hashedPassword,
      verificationToken,
    })

    const verifyEmailModule = await import('#mails/verify_email_notification')
    const VerifyEmailNotification = verifyEmailModule.default
    await mail.sendLater(new VerifyEmailNotification(user, verificationToken))

    return user
  }

  async login(ctx: HttpContext, email: string, password: string, rememberMe: boolean = false) {
    const user = await User.verifyCredentials(email, password)
    await ctx.auth.use('web').login(user, rememberMe)

    return user
  }

  async logout(ctx: HttpContext) {
    await ctx.auth.use('web').logout()
  }

  async requestPasswordReset(email: string) {
    const user = await User.findBy('email', email)

    if (!user) {
      return
    }

    const resetToken = generateToken()
    const expiresAt = DateTime.now().plus({ hours: 1 })

    user.resetPasswordToken = resetToken
    user.resetPasswordExpiresAt = expiresAt
    await user.save()

    const resetPasswordModule = await import('#mails/reset_password_notification')
    const ResetPasswordNotification = resetPasswordModule.default
    await mail.sendLater(new ResetPasswordNotification(user, resetToken))
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await User.findBy('resetPasswordToken', token)

    if (!user || !user.resetPasswordExpiresAt || user.resetPasswordExpiresAt < DateTime.now()) {
      return null
    }

    const hashedPassword = await hash.use('scrypt').make(newPassword)

    user.password = hashedPassword
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
    await user.save()

    return user
  }
}
