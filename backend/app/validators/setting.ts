import vine from '@vinejs/vine'

export const updateSettingsValidator = vine.compile(
  vine.object({
    aiBaseUrl: vine.string().trim().url().optional(),
    aiApiKey: vine.string().trim().minLength(10).maxLength(200).optional(),
    aiModelName: vine.string().trim().minLength(1).maxLength(100).optional(),
    aiEnabled: vine.boolean().optional(),
  })
)

export type UpdateSettingsValidator = typeof updateSettingsValidator
