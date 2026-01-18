import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().nullable(),
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(6),
  })
)
