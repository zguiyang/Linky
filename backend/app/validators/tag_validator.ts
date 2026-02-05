import vine from '@vinejs/vine'
import { VALIDATION, SORT_ORDER, PAGINATION, TAG_ITEM_TYPE } from '#constants'
import { Infer } from '@vinejs/vine/types'

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

export const tagItemsValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    perPage: vine.number().min(1).max(PAGINATION.MAX_PER_PAGE).optional(),
    sortOrder: vine.enum([SORT_ORDER.ASC, SORT_ORDER.DESC]).optional(),
    type: vine.enum([TAG_ITEM_TYPE.BOOKMARK, TAG_ITEM_TYPE.MEMO]),
  })
)

export type CreateTagValidator = Infer<typeof createTagValidator>
export type UpdateTagValidator = Infer<typeof updateTagValidator>
export type TagItemsValidator = Infer<typeof tagItemsValidator>
