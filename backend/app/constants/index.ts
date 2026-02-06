const ORDER_BY = {
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  TITLE: 'title',
} as const

type OrderBy = (typeof ORDER_BY)[keyof typeof ORDER_BY]

const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 20,
  MAX_PER_PAGE: 100,
} as const

type Pagination = (typeof PAGINATION)[keyof typeof PAGINATION]

const BOOKMARK_STATUS = {
  FETCHING: 'fetching',
  ACTIVE: 'active',
  ARCHIVED: 'archived',
} as const

type BookmarkStatus = (typeof BOOKMARK_STATUS)[keyof typeof BOOKMARK_STATUS]

const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const

type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER]

const VALIDATION = {
  TITLE_MIN: 1,
  TITLE_MAX: 200,
  DESCRIPTION_MAX: 500,
  TAG_NAME_MIN: 1,
  TAG_NAME_MAX: 100,
  COLOR_HEX_LENGTH: 7,
  METADATA_MAX_SIZE: 65535,
  PASSWORD_MIN: 8,
  EMAIL_VERIFICATION_EXPIRY_MINUTES: 30,
  VERIFICATION_RESEND_COOLDOWN_MINUTES: 5,
} as const

type Validation = (typeof VALIDATION)[keyof typeof VALIDATION]

const METADATA_FETCH = {
  ATTEMPTS: 1,
  RETRY_DELAY_MIN: 5000,
  RETRY_DELAY_MAX: 10000,
  TIMEOUT: 3000,
} as const

type MetadataFetch = (typeof METADATA_FETCH)[keyof typeof METADATA_FETCH]

const IMPORT = {
  MAX_FILE_SIZE: '2mb',
  TEMP_DIR: '/tmp/linky-imports',
} as const

type Import = (typeof IMPORT)[keyof typeof IMPORT]

const AI = {
  DEFAULT_TIMEOUT: 30000,
  DEFAULT_MAX_RETRIES: 3,
  MAX_TOKENS_LIMIT: 4096,
  TEMPERATURE_RANGE: {
    MIN: 0,
    MAX: 2,
  },
  MAX_CONTENT_LENGTH: 100000,
} as const

type Ai = (typeof AI)[keyof typeof AI]

const AI_TAG = {
  MAX_TAGS: 3,
  CONFIDENCE_THRESHOLD: 0.6,
  TEMPERATURE: 0.3,
  TIMEOUT: 15000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000,
  RATE_LIMIT_PER_MINUTE: 20,
} as const

type AiTag = (typeof AI_TAG)[keyof typeof AI_TAG]

const BOOKMARK_EVENTS = {
  BOOKMARK_UPDATED: 'bookmark.updated',
  IMPORT_PROGRESS: 'bookmark.import.progress',
} as const

type BookmarkEvent = (typeof BOOKMARK_EVENTS)[keyof typeof BOOKMARK_EVENTS]

const TRANSMIT_CHANNEL_NAMES = {
  BOOKMARKS: 'bookmarks',
} as const

type TransmitEvent = BookmarkEvent

const TAG_ITEM_TYPE = {
  BOOKMARK: 'bookmark',
  MEMO: 'memo',
} as const

type TagItemType = (typeof TAG_ITEM_TYPE)[keyof typeof TAG_ITEM_TYPE]

const SEARCH = {
  RESULT_LIMIT: 10,
  MIN_QUERY_LENGTH: 1,
  MAX_QUERY_LENGTH: 100,
} as const

type Search = (typeof SEARCH)[keyof typeof SEARCH]

export {
  ORDER_BY,
  PAGINATION,
  BOOKMARK_STATUS,
  SORT_ORDER,
  VALIDATION,
  METADATA_FETCH,
  IMPORT,
  AI,
  AI_TAG,
  BOOKMARK_EVENTS,
  TRANSMIT_CHANNEL_NAMES,
  TAG_ITEM_TYPE,
  SEARCH,
}
export type {
  OrderBy,
  Pagination,
  BookmarkStatus,
  SortOrder,
  Validation,
  MetadataFetch,
  Import,
  Ai,
  AiTag,
  BookmarkEvent,
  TransmitEvent,
  TagItemType,
  Search,
}
