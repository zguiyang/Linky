import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { PAGINATION } from '~/constants'
import type { PaginatedResponse } from '~/api/types'

interface UsePaginationReturn<T> {
  page: Ref<number>
  perPage: Ref<number>
  items: ComputedRef<T[]>
  rawData: ComputedRef<PaginatedResponse<T> | null>
  total: ComputedRef<number>
  lastPage: ComputedRef<number>
  pending: Ref<boolean>
  error: Ref<Error | null>
  errorMessage: ComputedRef<string>
  execute: () => Promise<void>
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void
  reset: () => void
}

interface UsePaginationOptions {
  perPage?: number
  query?: ComputedRef<Record<string, unknown>>
}

export function usePagination<T>(
  url: string | (() => string),
  options?: UsePaginationOptions
): UsePaginationReturn<T> {
  const page = ref<number>(PAGINATION.DEFAULT_PAGE)
  const perPage = ref<number>(options?.perPage ?? PAGINATION.DEFAULT_PER_PAGE)
  const pending = ref(false)
  const error = ref<Error | null>(null)

  const query = computed(() => ({
    page: page.value,
    perPage: perPage.value,
    ...(options?.query?.value ?? {})
  }))

  const data = ref<PaginatedResponse<T> | null>(null)

  const rawData = computed(() => data.value) as ComputedRef<PaginatedResponse<T> | null>

  const items = computed({
    get: () => (data.value?.data ?? []) as T[],
    set: (newItems: T[]) => {
      if (data.value) {
        (data.value.data as T[]) = newItems
      }
    }
  }) as ComputedRef<T[]>

  const total = computed(() => data.value?.meta.total ?? 0)

  const lastPage = computed(() => data.value?.meta.lastPage ?? 1)

  const execute = async () => {
    const { $api } = useNuxtApp()
    const requestUrl = typeof url === 'function' ? url() : url
    pending.value = true
    error.value = null

    try {
      data.value = await $api<PaginatedResponse<T>>(requestUrl, {
        method: 'get',
        query: query.value
      })
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
    } finally {
      pending.value = false
    }
  }

  const setPage = (newPage: number) => {
    console.log('setPage called with:', newPage)
    page.value = newPage
    execute()
  }

  const setPerPage = (newPerPage: number) => {
    perPage.value = newPerPage
    page.value = PAGINATION.DEFAULT_PAGE
  }

  const reset = () => {
    page.value = PAGINATION.DEFAULT_PAGE
    error.value = null
  }

  return {
    page,
    perPage,
    items,
    rawData,
    total,
    lastPage,
    pending,
    error,
    errorMessage: computed(() => error.value?.message ?? ''),
    execute,
    setPage,
    setPerPage,
    reset
  }
}
