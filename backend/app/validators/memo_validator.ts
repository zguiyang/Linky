import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { VALIDATION, ORDER_BY, SORT_ORDER } from '#constants'

const createMemoSchema = vine.object({
  title: vine.string().minLength(VALIDATION.TITLE_MIN).maxLength(VALIDATION.TITLE_MAX).optional(),
  content: vine.string().minLength(VALIDATION.TITLE_MIN),
  isPinned: vine.boolean().optional(),
  tagIds: vine.array(vine.number()).minLength(0).optional(),
})

export const createMemoValidator = vine.compile(createMemoSchema)

const updateMemoSchema = vine.object({
  title: vine.string().minLength(VALIDATION.TITLE_MIN).maxLength(VALIDATION.TITLE_MAX).optional(),
  content: vine.string().minLength(VALIDATION.TITLE_MIN).optional(),
  isPinned: vine.boolean().optional(),
  tagIds: vine.array(vine.number()).minLength(0).optional(),
})

export const updateMemoValidator = vine.compile(updateMemoSchema)

export const memoPaginationValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    perPage: vine.number().optional(),
    search: vine.string().optional(),
    tagIds: vine.array(vine.number()).optional(),
    sortBy: vine.enum([ORDER_BY.CREATED_AT, ORDER_BY.UPDATED_AT]).optional(),
    sortOrder: vine.enum([SORT_ORDER.ASC, SORT_ORDER.DESC]).optional(),
  })
)

export type CreateMemoValidator = Infer<typeof createMemoValidator>
export type UpdateMemoValidator = Infer<typeof updateMemoValidator>
export type MemoPaginationValidator = Infer<typeof memoPaginationValidator>
