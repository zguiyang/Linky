/**
 * Nuxt Plugin - Global API Configuration
 *
 * Provides:
 * - $api: Custom $fetch instance with interceptors
 * - Convenience methods: get, post, put, patch, delete
 *
 * Features:
 * - Automatic baseURL configuration
 * - Token injection from auth_token cookie
 * - Global error handling (401 redirect, error toasts)
 */

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()
  const tokenCookie = useCookie('auth_token')

  const $api = $fetch.create({
    baseURL: `${config.public.apiBaseUrl}${config.public.apiPrefix}`,
    timeout: 10000,
    credentials: 'include',

    onRequest({ options }) {
      if (tokenCookie.value) {
        options.headers = options.headers || {}
        options.headers.set('Authorization', `Bearer ${tokenCookie.value}`)
      }
    },

    onResponse() {
      // do something with response
    },
    onResponseError({ response }) {
      const { handle401, handleError } = useHttpError()

      if (response.status === 401) {
        handle401()
      } else {
        handleError(response)
      }
    }
  })

  const helpers = {
    get: <T = unknown>(url: string, params?: Record<string, any>) =>
      $api<T>(url, { method: 'get', params }),
    post: <T = unknown>(url: string, body?: any) =>
      $api<T>(url, { method: 'post', body }),
    put: <T = unknown>(url: string, body?: any) =>
      $api<T>(url, { method: 'put', body }),
    patch: <T = unknown>(url: string, body?: any) =>
      $api<T>(url, { method: 'patch', body }),
    delete: <T = unknown>(url: string, paramsOrBody?: any) => {
      const hasBody = paramsOrBody && typeof paramsOrBody === 'object'
      return $api<T>(url, {
        method: 'delete',
        ...(hasBody ? { body: paramsOrBody } : { params: paramsOrBody })
      })
    }
  }

  return {
    provide: {
      api: $api,
      ...helpers
    }
  }
})
