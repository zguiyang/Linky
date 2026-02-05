import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'
import {
  registerValidator,
  loginValidator,
  resetPasswordValidator,
} from '#validators/auth_validator'
import { AuthService } from '#services/auth_service'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const { user, token } = await this.authService.register(data)

    return {
      user: user.serialize(),
      token: token.value?.release() ?? '',
    }
  }

  async login({ request }: HttpContext) {
    const data = await request.validateUsing(loginValidator)
    const { user, token } = await this.authService.login(data.email, data.password)

    return {
      user: user.serialize(),
      token: token.value?.release() ?? '',
    }
  }

  async logout({ auth }: HttpContext) {
    await auth.use('api').invalidateToken()
  }

  async forgotPassword({ request }: HttpContext) {
    const data = request.only(['email'])
    const result = await this.authService.requestPasswordReset(data.email)
    return result
  }

  async resetPassword({ request }: HttpContext) {
    const data = await request.validateUsing(resetPasswordValidator)
    const user = await this.authService.resetPassword(data.token, data.password)

    if (!user) {
      throw new Exception('Reset token is invalid or expired', { status: 422 })
    }
  }

  async verifyEmail({ request }: HttpContext) {
    const token = request.input('token')
    const user = await this.authService.verifyEmail(token)

    if (!user) {
      throw new Exception('Verification token is invalid or expired', { status: 422 })
    }
  }

  async resendVerification({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return await this.authService.resendVerificationEmail(user)
  }

  async me({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return user.serialize()
  }
}
