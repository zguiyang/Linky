import vine from '@vinejs/vine'

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
