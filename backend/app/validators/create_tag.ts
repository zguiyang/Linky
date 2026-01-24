import vine from '@vinejs/vine'

export const createTagValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(100),
    color: vine
      .string()
      .trim()
      .minLength(7)
      .maxLength(7)
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .optional(),
  })
)
