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
    try {
      const userData = await authApi.me()
      user.value = userData
    } catch (error) {
      console.error('Failed to fetch user:', error)
    } finally {
      loading.value = false
    }
  }

  const login = async (data: LoginRequest) => {
    loading.value = true
    try {
      const userData = await authApi.login(data)
      user.value = userData

      const lastPath = useCookie('lastPath')
      const redirectPath = lastPath.value || '/workspace/bookmarks'
      lastPath.value = null

      await navigateTo(redirectPath)
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      loading.value = false
    }
  }

  const register = async (data: RegisterRequest) => {
    loading.value = true
    try {
      const userData = await authApi.register(data)
      user.value = userData

      const lastPath = useCookie('lastPath')
      const redirectPath = lastPath.value || '/workspace/bookmarks'
      lastPath.value = null

      await navigateTo(redirectPath)
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      await authApi.logout()
      user.value = null
      await navigateTo('/auth/sign-in')

      const toast = useToast()
      toast.add({
        title: '已退出登录',
        color: 'neutral',
        icon: 'i-heroicons-arrow-right-on-rectangle'
      })
    } catch {
      user.value = null
      await navigateTo('/auth/sign-in')

      const toast = useToast()
      toast.add({
        title: '已退出登录',
        color: 'neutral',
        icon: 'i-heroicons-arrow-right-on-rectangle'
      })
    } finally {
      loading.value = false
    }
  }

  const forgotPassword = async (data: ForgotPasswordRequest) => {
    loading.value = true
    try {
      const result = await authApi.forgotPassword(data)

      const toast = useToast()
      toast.add({
        title: '发送成功',
        description: result.message || '重置邮件已发送',
        color: 'success',
        icon: 'i-heroicons-check-circle'
      })

      return { success: true, message: result.message }
    } catch (error) {
      console.error('Forgot password failed:', error)
      return { success: false, message: null }
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (data: ResetPasswordRequest) => {
    loading.value = true
    try {
      const userData = await authApi.resetPassword(data)
      user.value = userData

      const lastPath = useCookie('lastPath')
      const redirectPath = lastPath.value || '/workspace/bookmarks'
      lastPath.value = null

      await navigateTo(redirectPath)

      const toast = useToast()
      toast.add({
        title: '密码重置成功',
        description: '已自动登录',
        color: 'success',
        icon: 'i-heroicons-check-circle'
      })
    } catch (error) {
      console.error('Reset password failed:', error)
    } finally {
      loading.value = false
    }
  }

  const verifyEmail = async (token: string) => {
    loading.value = true
    try {
      await authApi.verifyEmail(token)
      await fetchUser()

      const lastPath = useCookie('lastPath')
      const redirectPath = lastPath.value || '/workspace/bookmarks'
      lastPath.value = null

      await navigateTo(redirectPath)

      const toast = useToast()
      toast.add({
        title: '邮箱验证成功',
        color: 'success',
        icon: 'i-heroicons-check-circle'
      })
    } catch (error) {
      console.error('Email verification failed:', error)
    } finally {
      loading.value = false
    }
  }

  const resendVerification = async () => {
    loading.value = true
    try {
      const result = await authApi.resendVerification()

      const toast = useToast()
      toast.add({
        title: '验证邮件已发送',
        description: result.message || '请检查您的邮箱',
        color: 'success',
        icon: 'i-heroicons-envelope'
      })

      return result.message
    } catch (error) {
      console.error('Resend verification failed:', error)
      return null
    } finally {
      loading.value = false
    }
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
