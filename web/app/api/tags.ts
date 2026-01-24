import { request } from '~/lib/request'
import type { Tag, CreateTagRequest, UpdateTagRequest } from './types'

export const tagsApi = {
  index: () => request.get<Tag[]>('/tags'),
  show: (id: number) => request.get<Tag>(`/tags/${id}`),
  create: (data: CreateTagRequest) => request.post<Tag>('/tags', data),
  update: (id: number, data: UpdateTagRequest) => request.put<Tag>(`/tags/${id}`, data),
  delete: (id: number) => request.delete(`/tags/${id}`)
}

export default tagsApi
