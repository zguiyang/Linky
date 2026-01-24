import { ref, computed } from 'vue'
import { navigateTo } from '#app'
import authApi from '~/api/auth'
import type {
  User,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest
} from '~/api/types'

const user = ref<User | null>(null)
const loading = ref(false)

export const useAuth = () => {
  const fetchUser = async () => {
    loading.value = true
    const userData = await authApi.me()
    user.value = userData
    loading.value = false
  }

  const login = async (data: LoginRequest) => {
    loading.value = true
    const authResponse = await authApi.login(data)
    user.value = authResponse.user

    const tokenCookie = useCookie('auth_token', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    })
    tokenCookie.value = authResponse.token

    const lastPath = useCookie('lastPath')
    const redirectPath = lastPath.value || '/workspace/bookmarks'
    lastPath.value = null

    loading.value = false

    await navigateTo(redirectPath)
  }

  const register = async (data: RegisterRequest) => {
    loading.value = true
    const authResponse = await authApi.register(data)
    user.value = authResponse.user

    const tokenCookie = useCookie('auth_token', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    })
    tokenCookie.value = authResponse.token

    const lastPath = useCookie('lastPath')
    const redirectPath = lastPath.value || '/workspace/bookmarks'
    lastPath.value = null

    loading.value = false

    await navigateTo(redirectPath)
  }

  const logout = async () => {
    loading.value = true
    await authApi.logout()

    const tokenCookie = useCookie('auth_token')
    tokenCookie.value = null
    user.value = null
    loading.value = false

    const toast = useToast()
    toast.add({
      title: '已退出登录',
      color: 'neutral',
      icon: 'i-heroicons-arrow-right-on-rectangle'
    })

    await navigateTo('/auth/sign-in')
  }

  const forgotPassword = async (data: ForgotPasswordRequest) => {
    loading.value = true
    await authApi.forgotPassword(data)
    loading.value = false

    const toast = useToast()
    toast.add({
      title: '发送成功',
      description: '重置邮件已发送，请检查您的邮箱',
      color: 'success',
      icon: 'i-heroicons-check-circle'
    })
  }

  const resetPassword = async (data: ResetPasswordRequest) => {
    loading.value = true
    const authResponse = await authApi.resetPassword(data)
    user.value = authResponse.user

    const tokenCookie = useCookie('auth_token', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    })
    tokenCookie.value = authResponse.token

    const lastPath = useCookie('lastPath')
    const redirectPath = lastPath.value || '/workspace/bookmarks'
    lastPath.value = null

    loading.value = false

    await navigateTo(redirectPath)

    const toast = useToast()
    toast.add({
      title: '密码重置成功',
      description: '已自动登录',
      color: 'success',
      icon: 'i-heroicons-check-circle'
    })
  }

  const verifyEmail = async (token: string) => {
    loading.value = true
    await authApi.verifyEmail(token)
    await fetchUser()

    const lastPath = useCookie('lastPath')
    const redirectPath = lastPath.value || '/workspace/bookmarks'
    lastPath.value = null

    loading.value = false

    await navigateTo(redirectPath)

    const toast = useToast()
    toast.add({
      title: '邮箱验证成功',
      color: 'success',
      icon: 'i-heroicons-check-circle'
    })
  }

  const resendVerification = async () => {
    loading.value = true
    await authApi.resendVerification()
    loading.value = false

    const toast = useToast()
    toast.add({
      title: '验证邮件已发送',
      description: '请检查您的邮箱',
      color: 'success',
      icon: 'i-heroicons-envelope'
    })
  }

  const isEmailVerified = computed(() => {
    return user.value?.emailVerifiedAt !== null
  })

  return {
    user: readonly(user),
    loading: readonly(loading),
    fetchUser,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerification,
    isEmailVerified
  }
}
