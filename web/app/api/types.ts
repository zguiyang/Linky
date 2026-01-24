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
