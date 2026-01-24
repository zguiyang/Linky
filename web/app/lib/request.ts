import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { useHttpError } from '~/composables/useHttpError'

export type ApiRequestOptions<R extends NitroFetchRequest = NitroFetchRequest>
  = NitroFetchOptions<R>

export async function apiRequest<T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(
  url: R,
  options: ApiRequestOptions<R> = {}
): Promise<T> {
  const { baseURL = 'http://localhost:3333/api', ...fetchOptions } = options
  const fetcher: typeof $fetch = import.meta.server ? (useRequestFetch() as any) : $fetch

  const token = useCookie('auth_token').value

  try {
    const response = await fetcher<T>(url as any, {
      ...fetchOptions,
      baseURL,
      timeout: 10000,
      credentials: 'include',
      headers: {
        ...fetchOptions.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    })

    return response as T
  } catch (error: unknown) {
    const isLogoutRequest = options.method === 'post' && url === '/auth/logout'
    if (!isLogoutRequest) {
      const { handleError } = useHttpError()
      handleError(error)
    }

    throw error
  }
}

export const request = {
  get: <T = unknown>(url: string, params?: Record<string, any>, options?: ApiRequestOptions) =>
    apiRequest<T>(url as any, { method: 'get', params, ...options }),
  post: <T = unknown>(url: string, body?: any, options?: ApiRequestOptions) =>
    apiRequest<T>(url as any, { method: 'post', body, ...options }),
  put: <T = unknown>(url: string, body?: any, options?: ApiRequestOptions) =>
    apiRequest<T>(url as any, { method: 'put', body, ...options }),
  patch: <T = unknown>(url: string, body?: any, options?: ApiRequestOptions) =>
    apiRequest<T>(url as any, { method: 'patch', body, ...options }),
  delete: <T = unknown>(url: string, paramsOrBody?: any, options?: ApiRequestOptions) => {
    const hasBody = paramsOrBody && typeof paramsOrBody === 'object' && !Array.isArray(paramsOrBody)
    return apiRequest<T>(url as any, {
      method: 'delete',
      ...(hasBody ? { body: paramsOrBody } : { params: paramsOrBody }),
      ...options
    })
  },

  getErrorMessage: (error: unknown): string => {
    if ((error as any)?.data?.message) {
      return (error as any).data.message
    }

    if ((error as any)?.data?.errors) {
      const errors = (error as any).data.errors
      const firstField = Object.keys(errors)[0]
      if (firstField && errors[firstField]?.[0]) {
        return errors[firstField][0]
      }
      return '表单验证失败，请检查输入'
    }

    if ((error as any)?.message) {
      return (error as any).message
    }

    return '操作失败，请稍后重试'
  }
}
