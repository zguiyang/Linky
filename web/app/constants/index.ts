const ORDER_BY = {
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt'
} as const

type OrderBy = (typeof ORDER_BY)[keyof typeof ORDER_BY]

const VIEW_MODE = {
  MASONRY: 'masonry',
  GRID: 'grid',
  LIST: 'list'
} as const

type ViewMode = (typeof VIEW_MODE)[keyof typeof VIEW_MODE]

const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc'
} as const

type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER]

const PAGINATION = {
  DEFAULT_PER_PAGE: 20
} as const

type Pagination = (typeof PAGINATION)[keyof typeof PAGINATION]

const SORT_BY_OPTIONS = [
  { label: '更新时间', value: 'updatedAt' },
  { label: '创建时间', value: 'createdAt' }
]

const SORT_ORDER_OPTIONS = [
  { label: '倒序', value: 'desc' },
  { label: '正序', value: 'asc' }
]

const BOOKMARK_STATUS = {
  FETCHING: 'fetching',
  ACTIVE: 'active',
  ARCHIVED: 'archived'
} as const

export {
  ORDER_BY,
  VIEW_MODE,
  SORT_ORDER,
  PAGINATION,
  SORT_BY_OPTIONS,
  SORT_ORDER_OPTIONS,
  BOOKMARK_STATUS
}

export type {
  OrderBy,
  ViewMode,
  SortOrder,
  Pagination
}
