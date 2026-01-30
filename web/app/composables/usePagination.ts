import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { PAGINATION } from '~/constants'
import type { PaginatedResponse } from '~/api/types'

interface UsePaginationReturn<T> {
  page: Ref<number>
  perPage: Ref<number>
  items: ComputedRef<T[]>
  total: ComputedRef<number>
  lastPage: ComputedRef<number>
  pending: Ref<boolean>
  execute: () => Promise<void>
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void
  reset: () => void
}

interface UsePaginationOptions {
  perPage?: number
  query?: ComputedRef<Record<string, any>>
}

export function usePagination<T>(
  url: string | (() => string),
  options?: UsePaginationOptions
): UsePaginationReturn<T> {
  const page = ref<number>(PAGINATION.DEFAULT_PAGE)
  const perPage = ref<number>(options?.perPage ?? PAGINATION.DEFAULT_PER_PAGE)

  const query = computed(() => ({
    page: page.value,
    perPage: perPage.value,
    ...(options?.query?.value ?? {})
  }))

  const pending = ref(false)
  const data = ref<PaginatedResponse<T> | null>(null)

  const execute = async () => {
    const { $api } = useNuxtApp()
    const requestUrl = typeof url === 'function' ? url() : url
    pending.value = true
    try {
      data.value = await $api<PaginatedResponse<T>>(requestUrl, {
        method: 'get',
        query: query.value
      })
    } finally {
      pending.value = false
    }
  }

  const items = computed(() =>
    data.value?.data ?? []
  ) as ComputedRef<T[]>

  const total = computed(() =>
    data.value?.meta.total ?? 0
  )

  const lastPage = computed(() =>
    data.value?.meta.lastPage ?? 1
  )

  const setPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage.value) {
      page.value = newPage
    }
  }

  const setPerPage = (newPerPage: number) => {
    perPage.value = newPerPage
    page.value = PAGINATION.DEFAULT_PAGE
  }

  const reset = async () => {
    page.value = PAGINATION.DEFAULT_PAGE
    await execute()
  }

  return {
    page,
    perPage,
    items,
    total,
    lastPage,
    pending,
    execute,
    setPage,
    setPerPage,
    reset
  }
}
