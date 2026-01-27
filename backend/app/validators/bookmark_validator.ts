import vine from '@vinejs/vine'
import { VALIDATION, ORDER_BY, SORT_ORDER } from '#constants/index'

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
    sortBy: vine.enum([ORDER_BY.CREATED_AT, ORDER_BY.UPDATED_AT]).optional(),
    sortOrder: vine.enum([SORT_ORDER.ASC, SORT_ORDER.DESC]).optional(),
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
