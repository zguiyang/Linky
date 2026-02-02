import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import {
  createMemoValidator,
  updateMemoValidator,
  memoPaginationValidator,
} from '#validators/memo_validator'
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
    const data = await request.validateUsing(memoPaginationValidator)
    return await this.memoService.paginate(user.id, data.page, data.perPage, {
      search: data.search,
      tagIds: data.tagIds,
    })
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
