/**
 * Nuxt Composables - API Data Fetching
 *
 * Provides useApi<T>() - Nuxt-native data fetching with:
 * - Full SSR compatibility
 * - Type safety via generics
 * - Access to pending, error, status, refresh states
 *
 * Usage:
 * const { data, pending, error, refresh } = await useApi<T>('/api/endpoint')
 */

import type { UseFetchOptions } from 'nuxt/app'

/**
 * Nuxt-compatible API fetching composable
 *
 * Wraps useFetch with custom $fetch instance, maintaining
 * full compatibility with Nuxt's data fetching ecosystem.
 *
 * @param url - API endpoint URL (relative to API base, e.g., '/auth/me')
 * @param options - useFetch options (method, body, params, etc.)
 * @returns useFetch return value with type-safe data
 */
export function useApi<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api
  } as UseFetchOptions<T>)
}
