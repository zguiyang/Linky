import type { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'
import { registerValidator } from '#validators/register'
import { loginValidator } from '#validators/login'
import { resetPasswordValidator } from '#validators/reset_password'
import { AuthService } from '#services/auth_service'

export default class AuthController {
  async register({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    const authService = new AuthService()
    const user = await authService.register(data)

    const token = await auth.use('api').createToken(user)

    return response.json({
      user: user.serialize(),
      token: token.value?.release() ?? '',
    })
  }

  async login(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(loginValidator)

    const authService = new AuthService()
    const { user, token } = await authService.login(data.email, data.password)

    return ctx.response.json({
      user: user.serialize(),
      token: token.value?.release() ?? '',
    })
  }

  async logout(ctx: HttpContext) {
    await ctx.auth.use('api').invalidateToken()
    return ctx.response.json({ success: true })
  }

  async forgotPassword({ request, response }: HttpContext) {
    const data = request.only(['email'])
    const authService = new AuthService()
    const result = await authService.requestPasswordReset(data.email)

    return response.json(result)
  }

  async resetPassword({ request, response }: HttpContext) {
    const data = await request.validateUsing(resetPasswordValidator)
    const authService = new AuthService()
    const user = await authService.resetPassword(data.token, data.password)

    if (!user) {
      throw new Exception('重置令牌无效或已过期', { status: 422 })
    }

    return response.json({ success: true })
  }

  async verifyEmail({ request, response }: HttpContext) {
    const token = request.input('token')

    const authService = new AuthService()
    const user = await authService.verifyEmail(token)

    if (!user) {
      throw new Exception('验证令牌无效或已过期', { status: 422 })
    }

    return response.json({ success: true, message: '邮箱验证成功' })
  }

  async resendVerification({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const authService = new AuthService()
    const result = await authService.resendVerificationEmail(user)

    return response.json(result)
  }

  async me({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    return response.json(user.serialize())
  }
}
