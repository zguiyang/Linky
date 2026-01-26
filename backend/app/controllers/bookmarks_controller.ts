import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { createBookmarkValidator } from '#validators/create_bookmark'
import { updateBookmarkValidator } from '#validators/update_bookmark'
import { bookmarkPaginationValidator } from '#validators/bookmark_pagination'
import { BookmarkService } from '#services/bookmark_service'

@inject()
export default class BookmarksController {
  constructor(private bookmarkService: BookmarkService) {}

  async index({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return await this.bookmarkService.findAll(user.id)
  }

  async paginate({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(bookmarkPaginationValidator)
    return await this.bookmarkService.paginate(user.id, {
      page: data.page,
      perPage: data.perPage,
      search: data.search,
      tagIds: data.tagIds,
      sortBy: data.sortBy,
      sortOrder: data.sortOrder,
    })
  }

  async show({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    return await this.bookmarkService.findById(user.id, params.id)
  }

  async store({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createBookmarkValidator)
    return await this.bookmarkService.create(user.id, data)
  }

  async update({ auth, params, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(updateBookmarkValidator)
    return await this.bookmarkService.update(user.id, params.id, data)
  }

  async destroy({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    await this.bookmarkService.delete(user.id, params.id)
  }
}
