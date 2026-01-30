import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { useHttpError } from '~/composables/useHttpError'

export type ApiError = {
  status: number
  message: string
  data?: any
}

export type ApiResult<T> = {
  data: T | null
  error: ApiError | null
}

export type ApiRequestOptions<R extends NitroFetchRequest = NitroFetchRequest>
  = NitroFetchOptions<R>

function parseError(error: unknown): ApiError {
  if ((error as any)?.data?.message) {
    return {
      status: (error as any).status || (error as any).statusCode || 500,
      message: (error as any).data.message,
      data: (error as any).data
    }
  }

  if ((error as any)?.message) {
    return {
      status: (error as any).status || (error as any).statusCode || 500,
      message: (error as any).message,
      data: (error as any).data
    }
  }

  return {
    status: 500,
    message: '操作失败，请稍后重试',
    data: null
  }
}

async function apiRequest<T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(
  url: R,
  options: ApiRequestOptions<R> = {}
): Promise<ApiResult<T>> {
  const config = useRuntimeConfig()
  const { baseURL = config.public.apiBaseUrl, ...fetchOptions } = options
  const fetcher: typeof $fetch = import.meta.server ? (useRequestFetch() as any) : $fetch

  const token = useCookie('auth_token').value

  try {
    const response = await fetcher<T>(url as any, {
      ...fetchOptions,
      baseURL: `${baseURL}${config.public.apiPrefix}`,
      timeout: 10000,
      credentials: 'include',
      headers: {
        ...fetchOptions.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    })

    return { data: response as T, error: null }
  } catch (error: unknown) {
    const apiError = parseError(error)

    const isLogoutRequest = options.method === 'post' && url === '/auth/logout'
    if (isLogoutRequest) {
      return { data: null, error: apiError }
    }

    useHttpError().handleError(error)

    return { data: null, error: apiError }
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

    if ((error as any)?.message) {
      return (error as any).message
    }

    return '操作失败，请稍后重试'
  }
}
