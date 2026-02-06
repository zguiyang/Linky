import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'
import { UserService } from '#services/user_service'
import { updateProfileValidator, changeEmailValidator } from '#validators/user_validator'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async me({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    console.log(user)
    return user.serialize()
  }

  async update({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(updateProfileValidator)

    const updatedUser = await this.userService.update(user.id, {
      fullName: data.fullName,
    })

    return updatedUser.serialize()
  }

  async changeEmail({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(changeEmailValidator)

    await this.userService.changeEmail(user.id, data.newEmail, data.password)

    return { message: 'Verification email sent' }
  }

  async verifyEmail({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = request.input('token')
    const verifiedUser = await this.userService.verifyEmailByUser(user.id, token)

    if (!verifiedUser) {
      throw new Exception('Verification token is invalid or expired', { status: 422 })
    }
  }

  async resendVerification({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    await this.userService.resendVerificationEmail(user.id)
  }
}
