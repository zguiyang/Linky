import vine from '@vinejs/vine'

export const updateBookmarkValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(200).optional(),
    url: vine.string().trim().url().optional(),
    description: vine.string().trim().maxLength(500).optional(),
    tagIds: vine.array(vine.number()).minLength(1).optional(),
  })
)
