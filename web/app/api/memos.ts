import { request } from '~/lib/request'
import type { Memo, CreateMemoRequest, UpdateMemoRequest, PaginatedResponse } from './types'

export const memosApi = {
  paginate: (page: number = 1, perPage: number = 20) =>
    request.get<PaginatedResponse<Memo>>('/memos/paginate', { page, perPage }),

  index: () => request.get<Memo[]>('/memos'),

  show: (id: number) => request.get<Memo>(`/memos/${id}`),

  create: (data: CreateMemoRequest) => request.post<Memo>('/memos', data),

  update: (id: number, data: UpdateMemoRequest) =>
    request.put<Memo>(`/memos/${id}`, data),

  delete: (id: number) => request.delete(`/memos/${id}`)
}

export default memosApi
