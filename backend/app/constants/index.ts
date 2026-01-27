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
  PAGINATION_DEFAULT_PER_PAGE: 20,
} as const

type Validation = (typeof VALIDATION)[keyof typeof VALIDATION]

export { ORDER_BY, PAGINATION, BOOKMARK_STATUS, SORT_ORDER, VALIDATION }

export type { OrderBy, Pagination, BookmarkStatus, SortOrder, Validation }
