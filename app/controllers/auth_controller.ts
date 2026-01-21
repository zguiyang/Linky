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

    await auth.use('web').login(user)

    if (request.accepts(['html', 'json']) === 'json') {
      return response.json(user.serialize())
    }

    return response.redirect('/workspace/bookmarks')
  }

  async login(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(loginValidator)

    const authService = new AuthService()
    const user = await authService.login(ctx, data.email, data.password, data.rememberMe ?? false)

    if (ctx.request.accepts(['html', 'json']) === 'json') {
      return ctx.response.json(user.serialize())
    }

    return ctx.response.redirect('/workspace/bookmarks')
  }

  async logout(ctx: HttpContext) {
    const authService = new AuthService()
    await authService.logout(ctx)

    if (ctx.request.accepts(['html', 'json']) === 'json') {
      return ctx.response.json(undefined)
    }

    return ctx.response.redirect('/sign-in')
  }

  async forgotPassword({ request, response }: HttpContext) {
    const data = request.only(['email'])
    const authService = new AuthService()
    const result = await authService.requestPasswordReset(data.email)

    if (request.accepts(['html', 'json']) === 'json') {
      return response.json(result)
    }

    if (!result.success) {
      return response.redirect('/sign-in?error=' + encodeURIComponent(result.message))
    }

    return response.redirect('/sign-in?status=reset-sent')
  }

  async resetPassword({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(resetPasswordValidator)
    const authService = new AuthService()
    const user = await authService.resetPassword(data.token, data.password)

    if (!user) {
      if (request.accepts(['html', 'json']) === 'json') {
        throw new Exception('重置令牌无效或已过期', { status: 422 })
      }
      return response.redirect('/sign-in?status=reset-failed')
    }

    await auth.use('web').login(user)

    if (request.accepts(['html', 'json']) === 'json') {
      return response.json(user.serialize())
    }

    return response.redirect('/workspace/bookmarks')
  }

  async verifyEmail({ request, response, auth }: HttpContext) {
    const token = request.input('token')

    const authService = new AuthService()
    const user = await authService.verifyEmail(token)

    if (!user) {
      if (request.accepts(['html', 'json']) === 'json') {
        throw new Exception('验证令牌无效或已过期', { status: 422 })
      }
      return response.redirect('/sign-in?status=verification-failed')
    }

    if (request.accepts(['html', 'json']) === 'json') {
      await auth.use('web').login(user)
      return response.json(undefined)
    }

    return response.redirect('/workspace/bookmarks')
  }

  async resendVerification({ response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const authService = new AuthService()
    const result = await authService.resendVerificationEmail(user.email)

    return response.json(result)
  }

  async me({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    return response.json(user.serialize())
  }
}
