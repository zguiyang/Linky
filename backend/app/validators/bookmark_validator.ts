import vine from '@vinejs/vine'

export const createBookmarkValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(200),
    url: vine.string().trim().url(),
    description: vine.string().trim().maxLength(500).optional(),
    tagIds: vine.array(vine.number()).minLength(1).optional(),
  })
)

export const updateBookmarkValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(200).optional(),
    url: vine.string().trim().url().optional(),
    description: vine.string().trim().maxLength(500).optional(),
    tagIds: vine.array(vine.number()).minLength(1).optional(),
  })
)

export const bookmarkPaginationValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    perPage: vine.number().optional(),
    search: vine.string().optional(),
    tagIds: vine.array(vine.number()).optional(),
    sortBy: vine.enum(['createdAt', 'updatedAt']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
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
