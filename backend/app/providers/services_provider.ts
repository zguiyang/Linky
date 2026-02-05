import type { ApplicationService } from '@adonisjs/core/types'
import { BookmarkService } from '../services/bookmark_service.js'
import { MemoService } from '../services/memo_service.js'
import { TagService } from '../services/tag_service.js'
import { AuthService } from '../services/auth_service.js'
import { SearchService } from '../services/search_service.js'
import { SettingService } from '../services/setting_service.js'
import { AiService } from '../services/ai_service.js'
import PromptService from '../services/prompt_service.js'
import { TransmitService } from '../services/transmit_service.js'
import { BookmarkMetadataService } from '../services/bookmark_metadata_service.js'
import { BookmarkParserService } from '../services/bookmark_parser_service.js'

export default class ServicesProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.bind(BookmarkService, () => new BookmarkService())
    this.app.container.bind(MemoService, () => new MemoService())
    this.app.container.bind(AuthService, () => new AuthService())
    this.app.container.bind(SearchService, () => new SearchService())
    this.app.container.bind(SettingService, () => new SettingService())
    this.app.container.bind(AiService, () => new AiService())
    this.app.container.bind(PromptService, () => new PromptService())
    this.app.container.bind(TransmitService, () => new TransmitService())
    this.app.container.bind(BookmarkMetadataService, () => new BookmarkMetadataService())
    this.app.container.bind(BookmarkParserService, () => new BookmarkParserService())
  }

  async boot() {
    const bookmarkService = new BookmarkService()
    const memoService = new MemoService()
    this.app.container.bind(TagService, () => new TagService(bookmarkService, memoService))
  }

  async start() {}

  async ready() {}

  async shutdown() {}
}
