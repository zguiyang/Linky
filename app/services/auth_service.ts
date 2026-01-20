import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

export class AuthService {
  async register(data: { email: string; name: string; password: string }) {
    const hashedPassword = await hash.use('scrypt').make(data.password)

    const user = await User.create({
      email: data.email,
      fullName: data.name,
      password: hashedPassword,
    })

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
}
