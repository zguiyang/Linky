import { request } from '~/lib/request'
import type { Memo, CreateMemoRequest, UpdateMemoRequest, PaginatedResponse } from './types'

export const memosApi = {
  index: (params?: { page?: number, perPage?: number }) =>
    request.get<PaginatedResponse<Memo>>('/memos', params),
  show: (id: number) => request.get<Memo>(`/memos/${id}`),
  create: (data: CreateMemoRequest) => request.post<Memo>('/memos', data),
  update: (id: number, data: UpdateMemoRequest) => request.put<Memo>(`/memos/${id}`, data),
  delete: (id: number) => request.delete(`/memos/${id}`)
}

export default memosApi
