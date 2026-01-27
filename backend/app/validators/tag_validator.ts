import vine from '@vinejs/vine'
import { VALIDATION } from '#constants/index'

export const createTagValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(VALIDATION.TAG_NAME_MIN)
      .maxLength(VALIDATION.TAG_NAME_MAX),
    color: vine
      .string()
      .trim()
      .minLength(VALIDATION.COLOR_HEX_LENGTH)
      .maxLength(VALIDATION.COLOR_HEX_LENGTH)
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .optional(),
  })
)

export const updateTagValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(VALIDATION.TAG_NAME_MIN)
      .maxLength(VALIDATION.TAG_NAME_MAX)
      .optional(),
    color: vine
      .string()
      .trim()
      .minLength(VALIDATION.COLOR_HEX_LENGTH)
      .maxLength(VALIDATION.COLOR_HEX_LENGTH)
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .optional(),
  })
)

export type CreateTagValidator = typeof createTagValidator
export type UpdateTagValidator = typeof updateTagValidator
