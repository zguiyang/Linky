import { inject } from '@adonisjs/core'
import User from '#models/user'

@inject()
export default class AuthService {
  async register(data: { fullName: string | null; email: string; password: string }) {
    const existingUser = await User.findBy('email', data.email)
    if (existingUser) {
      throw new Error('Email already exists')
    }

    return await User.create(data)
  }

  async login(email: string, password: string) {
    return await User.verifyCredentials(email, password)
  }
}
