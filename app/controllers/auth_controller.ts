import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/register'
import { loginValidator } from '#validators/login'
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
}
