import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';

export type ApiRequestOptions<R extends NitroFetchRequest = NitroFetchRequest> = NitroFetchOptions<R>;

export async function apiRequest<T = any, R extends NitroFetchRequest = NitroFetchRequest>(
  url: R,
  options: ApiRequestOptions<R> = {}
): Promise<T> {
  const { baseURL = '/api', ...fetchOptions } = options;
  const fetcher: typeof $fetch = import.meta.server ? (useRequestFetch() as any) : $fetch;

  const response = await fetcher<T>(url as any, {
    ...fetchOptions,
    baseURL,
    timeout: 10000,
  });

  return response as T;
}

export const request = {
  get: <T = any>(url: string, params?: Record<string, any>, options?: ApiRequestOptions) =>
    apiRequest<T>(url as any, { method: 'get', params, ...options }),
  post: <T = any>(url: string, body?: any, options?: ApiRequestOptions) =>
    apiRequest<T>(url as any, { method: 'post', body, ...options }),
  put: <T = any>(url: string, body?: any, options?: ApiRequestOptions) =>
    apiRequest<T>(url as any, { method: 'put', body, ...options }),
  patch: <T = any>(url: string, body?: any, options?: ApiRequestOptions) =>
    apiRequest<T>(url as any, { method: 'patch', body, ...options }),
  delete: <T = any>(url: string, paramsOrBody?: any, options?: ApiRequestOptions) => {
    const hasBody = paramsOrBody && typeof paramsOrBody === 'object' && !Array.isArray(paramsOrBody);
    return apiRequest<T>(url as any, {
      method: 'delete',
      ...(hasBody ? { body: paramsOrBody } : { params: paramsOrBody }),
      ...options,
    });
  },
};
