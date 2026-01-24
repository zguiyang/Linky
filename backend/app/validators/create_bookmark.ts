import vine from '@vinejs/vine'

export const createBookmarkValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(200),
    url: vine.string().trim().url(),
    description: vine.string().trim().maxLength(500).optional(),
    tagIds: vine.array(vine.number()).minLength(1).optional(),
  })
)
