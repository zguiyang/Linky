import { request } from '~/lib/request'
import type { Bookmark, CreateBookmarkRequest, UpdateBookmarkRequest, PaginatedResponse } from './types'

export const bookmarksApi = {
  paginate: (page: number = 1, perPage: number = 20) =>
    request.get<PaginatedResponse<Bookmark>>('/bookmarks/paginate', { page, perPage }),

  index: () => request.get<Bookmark[]>('/bookmarks'),

  show: (id: number) => request.get<Bookmark>(`/bookmarks/${id}`),

  create: (data: CreateBookmarkRequest) => request.post<Bookmark>('/bookmarks', data),

  update: (id: number, data: UpdateBookmarkRequest) =>
    request.put<Bookmark>(`/bookmarks/${id}`, data),

  delete: (id: number) => request.delete(`/bookmarks/${id}`)
}

export default bookmarksApi
