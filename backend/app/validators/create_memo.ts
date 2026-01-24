import vine from '@vinejs/vine'

const createMemoSchema = vine.object({
  title: vine.string().minLength(1).maxLength(200),
  content: vine.string().minLength(1),
  isPinned: vine.boolean().optional(),
  tagIds: vine.array(vine.number()).minLength(0).optional(),
})

export const createMemoValidator = vine.compile(createMemoSchema)
