import type { HttpContext } from '@adonisjs/core/http'
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

    return response.redirect('/workspace/bookmarks')
  }

  async login(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(loginValidator)

    const authService = new AuthService()
    await authService.login(ctx, data.email, data.password, data.rememberMe ?? false)

    return ctx.response.redirect('/workspace/bookmarks')
  }

  async logout(ctx: HttpContext) {
    const authService = new AuthService()
    await authService.logout(ctx)

    return ctx.response.redirect('/sign-in')
  }

  async forgotPassword({ request, response }: HttpContext) {
    const data = request.only(['email'])
    const authService = new AuthService()
    await authService.requestPasswordReset(data.email)

    return response.redirect('/sign-in?status=reset-sent')
  }

  async resetPassword({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(resetPasswordValidator)
    const authService = new AuthService()
    const user = await authService.resetPassword(data.token, data.password)

    if (!user) {
      return response.redirect('/sign-in?status=reset-failed')
    }

    await auth.use('web').login(user)
    return response.redirect('/workspace/bookmarks')
  }

  async verifyEmail({ request, response, auth }: HttpContext) {
    const data = request.only(['token'])
    const authService = new AuthService()
    const user = await authService.verifyEmail(data.token)

    if (!user) {
      if (request.accepts(['html', 'json']) === 'json') {
        return response.status(422).json({
          errors: { token: ['验证令牌无效或已过期'] },
        })
      }
      return response.redirect('/sign-in?status=verify-failed')
    }

    await auth.use('web').login(user)

    if (request.accepts(['html', 'json']) === 'json') {
      return response.json({ success: true })
    }
    return response.redirect('/workspace/bookmarks')
  }
}
