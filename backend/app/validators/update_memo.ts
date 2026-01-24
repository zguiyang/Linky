import vine from '@vinejs/vine'

const updateMemoSchema = vine.object({
  title: vine.string().minLength(1).maxLength(200).optional(),
  content: vine.string().minLength(1).optional(),
  isPinned: vine.boolean().optional(),
  tagIds: vine.array(vine.number()).minLength(0).optional(),
})

export const updateMemoValidator = vine.compile(updateMemoSchema)
