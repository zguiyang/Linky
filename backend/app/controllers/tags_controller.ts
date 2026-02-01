import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import {
  createTagValidator,
  updateTagValidator,
  tagItemsValidator,
} from '#validators/tag_validator'
import { TagService } from '#services/tag_service'

@inject()
export default class TagsController {
  constructor(private tagService: TagService) {}

  async index({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return await this.tagService.findAll(user.id)
  }

  async show({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    return await this.tagService.findById(user.id, params.id)
  }

  async items({ auth, params, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(tagItemsValidator)
    return await this.tagService.getItems(user.id, params.id, {
      page: data.page,
      perPage: data.perPage,
      sortOrder: data.sortOrder,
    })
  }

  async store({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createTagValidator)
    return await this.tagService.create(user.id, data)
  }

  async update({ auth, params, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(updateTagValidator)
    return await this.tagService.update(user.id, params.id, data)
  }

  async destroy({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    await this.tagService.delete(user.id, params.id)
  }
}
