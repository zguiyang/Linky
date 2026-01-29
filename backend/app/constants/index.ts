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

const AI_TAG = {
  MAX_TAGS: 5,
  CONFIDENCE_THRESHOLD: 0.6,
  TEMPERATURE: 0.3,
  TIMEOUT: 15000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000,
  RATE_LIMIT_PER_MINUTE: 20,
  SYSTEM_PROMPT: `你是一个专业的书签标签生成助手。根据书签的标题、描述和URL，为其生成最合适的标签。

规则：
1. 每次最多生成 5 个标签
2. 根据内容自动判断使用中文或英文
3. 标签长度 2-10 个字符
4. 全小写（英文）
5. 避免过于宽泛的标签（如"网站"、"链接"）
6. 标签名称与用户已有标签重复时，使用已有标签

输出 JSON 格式：
{
  "tags": [
    {
      "name": "标签名",
      "confidence": 0.95
    }
  ]
}`,
} as const

type AiTag = (typeof AI_TAG)[keyof typeof AI_TAG]

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
}
