export interface User {
  id: number
  fullName: string | null
  email: string
  emailVerifiedAt: string | null
  verificationEmailSentAt: string | null
  createdAt: string
  updatedAt: string | null
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterRequest {
  email: string
  name: string
  password: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  passwordConfirmation: string
}

export interface Tag {
  id: number
  name: string
  color: string | null
  userId: number
  createdAt: string
  updatedAt: string | null
}

export interface CreateTagRequest {
  name: string
  color?: string
}

export interface UpdateTagRequest {
  name?: string
  color?: string
}

export interface Bookmark {
  id: number
  title: string
  url: string
  description: string | undefined | null
  visitCount: number
  userId: number
  tags: Tag[]
  createdAt: string
  updatedAt: string | null
}

export interface CreateBookmarkRequest {
  title: string
  url: string
  description?: string
  tagIds?: number[]
}

export interface UpdateBookmarkRequest {
  title?: string
  url?: string
  description?: string
  tagIds?: number[]
}

export interface PaginatorMeta {
  currentPage: number
  perPage: number
  total: number
  lastPage: number
}

export interface Memo {
  id: number
  title: string
  content: string
  isPinned: boolean
  userId: number
  tags: Tag[]
  createdAt: string
  updatedAt: string | null
}

export interface CreateMemoRequest {
  title: string
  content: string
  isPinned?: boolean
  tagIds?: number[]
}

export interface UpdateMemoRequest {
  title?: string
  content?: string
  isPinned?: boolean
  tagIds?: number[]
}

export interface PaginatedResponse<T> {
  meta: PaginatorMeta
  data: T[]
}
