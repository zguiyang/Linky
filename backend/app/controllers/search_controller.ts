import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { SearchService } from '#services/search_service'
import { searchValidator } from '#validators/search_validator'

@inject()
export default class SearchController {
  constructor(private searchService: SearchService) {}

  async search({ request, auth }: HttpContext) {
    const userId = auth.user?.id
    if (!userId) {
      return { query: '', bookmarks: [], memos: [], tags: [] }
    }

    const { q: query } = await request.validateUsing(searchValidator)

    return await this.searchService.search(userId, query)
  }
}
