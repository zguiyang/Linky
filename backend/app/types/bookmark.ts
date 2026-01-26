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
