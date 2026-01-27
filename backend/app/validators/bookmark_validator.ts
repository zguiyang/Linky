import vine from '@vinejs/vine'
import { VALIDATION } from '#constants/index'

export const createBookmarkValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(VALIDATION.TITLE_MIN).maxLength(VALIDATION.TITLE_MAX),
    url: vine.string().trim().url(),
    description: vine.string().trim().maxLength(VALIDATION.DESCRIPTION_MAX).optional(),
    tagIds: vine.array(vine.number()).minLength(1).optional(),
  })
)

export const updateBookmarkValidator = vine.compile(
  vine.object({
    title: vine
      .string()
      .trim()
      .minLength(VALIDATION.TITLE_MIN)
      .maxLength(VALIDATION.TITLE_MAX)
      .optional(),
    url: vine.string().trim().url().optional(),
    description: vine.string().trim().maxLength(VALIDATION.DESCRIPTION_MAX).optional(),
    tagIds: vine.array(vine.number()).minLength(1).optional(),
  })
)

export const bookmarkPaginationValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    perPage: vine.number().optional(),
    search: vine.string().optional(),
    tagIds: vine.array(vine.number()).optional(),
    sortBy: vine.enum([VALIDATION.SORT_BY_CREATED_AT, VALIDATION.SORT_BY_UPDATED_AT]).optional(),
    sortOrder: vine.enum([VALIDATION.SORT_ORDER_ASC, VALIDATION.SORT_ORDER_DESC]).optional(),
  })
)

export const importBookmarkValidator = vine.compile(
  vine.object({
    file: vine.file({
      size: '2mb',
      extnames: ['html', 'htm'],
    }),
    createTags: vine.boolean().optional(),
    skipDuplicates: vine.boolean().optional(),
  })
)

export type CreateBookmarkValidator = typeof createBookmarkValidator
export type UpdateBookmarkValidator = typeof updateBookmarkValidator
export type BookmarkPaginationValidator = typeof bookmarkPaginationValidator
export type ImportBookmarkValidator = typeof importBookmarkValidator
