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
  ASYNC_SIZE_THRESHOLD: 512 * 1024,
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

export { ORDER_BY, PAGINATION, BOOKMARK_STATUS, SORT_ORDER, VALIDATION, METADATA_FETCH, IMPORT, AI }
export type {
  OrderBy,
  Pagination,
  BookmarkStatus,
  SortOrder,
  Validation,
  MetadataFetch,
  Import,
  Ai,
}
