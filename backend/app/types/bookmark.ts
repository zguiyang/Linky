export interface ParsedBookmark {
  title: string
  url: string
  addDate: number
  icon?: string
  tags: string[]
}

export interface ParsedFolder {
  name: string
  bookmarks: ParsedBookmark[]
  children: ParsedFolder[]
  addDate: number
  lastModified: number
}

export interface ParseResult {
  bookmarks: ParsedBookmark[]
  totalCount: number
  errors: ParseError[]
}

export interface ParseError {
  title?: string
  url?: string
  reason: string
}

export interface WorkerMessage {
  success: boolean
  data?: ParseResult
  error?: string
}

export interface BookmarkMetadata {
  ogTitle?: string | null
  ogDescription?: string | null
  ogImage?: {
    url?: string | null
    width?: number | null
    height?: number | null
    type?: string | null
  } | null
  favicon?: string | null
  requestUrl: string
  success: boolean
  error?: string | null
  fetchedAt: string | null
}
