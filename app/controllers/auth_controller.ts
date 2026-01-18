import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/register'
import { loginValidator } from '#validators/login'
import AuthService from '#services/auth_service'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async register({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const user = await this.authService.register(payload)
    const token = await auth.use('api').createToken(user)

    return { user: user.serialize(), token }
  }

  async login({ request, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await this.authService.login(email, password)
    const token = await auth.use('api').createToken(user)

    return { user: user.serialize(), token }
  }

  async logout({ auth }: HttpContext) {
    await auth.use('api').invalidateToken()
    return { message: 'Successfully logged out' }
  }
}
