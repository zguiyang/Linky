import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { SEARCH } from '#constants'

export const searchValidator = vine.compile(
  vine.object({
    q: vine.string().trim().minLength(SEARCH.MIN_QUERY_LENGTH).maxLength(SEARCH.MAX_QUERY_LENGTH),
  })
)

export type SearchValidator = Infer<typeof searchValidator>
