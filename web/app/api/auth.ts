import { request } from '~/lib/request'
import type {
  User,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthResponse
} from './types'

export const authApi = {
  login: (data: LoginRequest) => request.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) => request.post<AuthResponse>('/auth/register', data),

  logout: () => request.post('/auth/logout'),

  forgotPassword: (data: ForgotPasswordRequest) =>
    request.post<{ message: string }>('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordRequest) => request.post<AuthResponse>('/auth/reset-password', data),

  verifyEmail: (token: string) => request.get('/auth/verify-email', { token }),

  resendVerification: () => request.post<{ message: string }>('/auth/resend-verification'),

  me: () => request.get<User>('/auth/me')
}

export default authApi
