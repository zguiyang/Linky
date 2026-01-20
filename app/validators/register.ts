import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .trim()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    name: vine.string().trim().minLength(2).maxLength(50),
    password: vine.string().minLength(6).maxLength(100),
  })
)
