import vine from '@vinejs/vine'
import { VALIDATION } from '#constants/index'

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
  })
)

export type CreateMemoValidator = typeof createMemoValidator
export type UpdateMemoValidator = typeof updateMemoValidator
export type MemoPaginationValidator = typeof memoPaginationValidator
