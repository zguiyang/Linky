import vine from '@vinejs/vine'

export const updateSettingsValidator = vine.compile(
  vine.object({
    aiBaseUrl: vine.string().trim().url().optional(),
    aiApiKey: vine.string().trim().minLength(10).maxLength(200).optional(),
  })
)

export type UpdateSettingsValidator = typeof updateSettingsValidator
