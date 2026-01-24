import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { createMemoValidator } from '#validators/create_memo'
import { updateMemoValidator } from '#validators/update_memo'
import { MemoService } from '#services/memo_service'

@inject()
export default class MemosController {
  constructor(private memoService: MemoService) {}

  async index({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return await this.memoService.findAll(user.id)
  }

  async paginate({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    return await this.memoService.paginate(user.id, page, perPage)
  }

  async show({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    return await this.memoService.findById(user.id, params.id)
  }

  async store({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createMemoValidator)
    return await this.memoService.create(user.id, data)
  }

  async update({ auth, params, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(updateMemoValidator)
    return await this.memoService.update(user.id, params.id, data)
  }

  async destroy({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    await this.memoService.delete(user.id, params.id)
  }
}
