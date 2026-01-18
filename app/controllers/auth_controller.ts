import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/register'
import { loginValidator } from '#validators/login'
import User from '#models/user'

export default class AuthController {
  async register({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const existingUser = await User.findBy('email', payload.email)
    if (existingUser) {
      return response.badRequest({
        success: false,
        message: 'Email already exists',
      })
    }

    const user = await User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
    })

    const token = await auth.use('api').createToken(user)

    return response.created({
      success: true,
      data: {
        user: user.serialize(),
        token,
      },
    })
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await auth.use('api').createToken(user)

    return response.ok({
      success: true,
      data: {
        user: user.serialize(),
        token,
      },
    })
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()

    return response.ok({
      success: true,
      message: 'Successfully logged out',
    })
  }
}
