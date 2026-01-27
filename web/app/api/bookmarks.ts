import { request } from '~/lib/request'
import type { Bookmark, CreateBookmarkRequest, UpdateBookmarkRequest, PaginatedResponse, BookmarkPaginationParams } from './types'

export interface ImportOptions {
  createTags?: boolean
  skipDuplicates?: boolean
}

export interface ImportResult {
  mode: 'sync'
  data: {
    total: number
    imported: number
    skipped: number
    errors: number
    tagsCreated: number
    errorsList: Array<{
      title: string
      url: string
      reason: string
    }>
  }
}

export interface AsyncImportResponse {
  mode: 'async'
  data: {
    jobId: string
    status: 'waiting'
    progress: number
  }
}

export interface ImportStatusResponse {
  data: {
    jobId: string
    status: 'waiting' | 'active' | 'completed'
    progress: number
    data?: {
      total: number
      imported: number
      skipped: number
      errors: number
      tagsCreated: number
      errorsList: Array<{
        title: string
        url: string
        reason: string
      }>
      completedAt: string
    }
  }
}

export const bookmarksApi = {
  paginate: (params: BookmarkPaginationParams = {}) =>
    request.get<PaginatedResponse<Bookmark>>('/bookmarks/paginate', params),

  index: () => request.get<Bookmark[]>('/bookmarks'),

  show: (id: number) => request.get<Bookmark>(`/bookmarks/${id}`),

  create: (data: CreateBookmarkRequest) => request.post<Bookmark>('/bookmarks', data),

  update: (id: number, data: UpdateBookmarkRequest) =>
    request.put<Bookmark>(`/bookmarks/${id}`, data),

  delete: (id: number) => request.delete(`/bookmarks/${id}`),

  import: (file: File, options: ImportOptions = {}) => {
    const formData = new FormData()
    formData.append('file', file)
    if (options.createTags !== undefined) {
      formData.append('createTags', String(options.createTags))
    }
    if (options.skipDuplicates !== undefined) {
      formData.append('skipDuplicates', String(options.skipDuplicates))
    }
    return request.post<ImportResult | AsyncImportResponse>('/bookmarks/import', formData)
  },

  getImportStatus: (jobId: string) =>
    request.get<ImportStatusResponse>(`/bookmarks/import/${jobId}/status`)
}

export default bookmarksApi
