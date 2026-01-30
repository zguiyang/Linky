import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '~/api/auth'
import type { User } from '~/api/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)

  const tokenCookie = useCookie('auth_token', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production'
  })

  const isAuthenticated = computed(() => !!tokenCookie.value)
  const isEmailVerified = computed(() => user.value?.emailVerifiedAt !== null)

  const fetchUser = async () => {
    const { data, error } = await authApi.me()
    if (error) {
      user.value = null
      return { data: null, error }
    }
    user.value = data
    return { data, error: null }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    const { data, error } = await authApi.login({ email, password })
    if (error) {
      loading.value = false
      return { data: null, error }
    }
    user.value = data!.user
    tokenCookie.value = data!.token
    loading.value = false
    return { data: data!.user, error: null }
  }

  const register = async (email: string, password: string, fullName: string) => {
    loading.value = true
    const { data, error } = await authApi.register({ email, password, name: fullName })
    if (error) {
      loading.value = false
      return { data: null, error }
    }
    user.value = data!.user
    tokenCookie.value = data!.token
    loading.value = false
    return { data: data!.user, error: null }
  }

  const logout = async () => {
    loading.value = true
    await authApi.logout()
    user.value = null
    tokenCookie.value = null
    loading.value = false
  }

  const setUser = (userData: User | null) => {
    user.value = userData
  }

  const setToken = (newToken: string | null) => {
    tokenCookie.value = newToken
  }

  return {
    user,
    loading,
    isAuthenticated,
    isEmailVerified,
    fetchUser,
    login,
    register,
    logout,
    setUser,
    setToken
  }
}, {
  persist: true
})
