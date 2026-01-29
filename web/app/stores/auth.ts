import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '~/api/auth'
import type { User } from '~/api/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)

  const tokenCookie = useCookie('auth_token', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30
  })

  const isAuthenticated = computed(() => !!tokenCookie.value)
  const isEmailVerified = computed(() => user.value?.emailVerifiedAt !== null)

  const fetchUser = async () => {
    try {
      user.value = await authApi.me()
    } catch {
      user.value = null
    }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const { user: userData, token: newToken } = await authApi.login({ email, password })
      user.value = userData
      tokenCookie.value = newToken
    } finally {
      loading.value = false
    }
  }

  const register = async (email: string, password: string, fullName: string) => {
    loading.value = true
    try {
      const { user: userData, token: newToken } = await authApi.register({ email, password, name: fullName })
      user.value = userData
      tokenCookie.value = newToken
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      await authApi.logout()
    } finally {
      user.value = null
      tokenCookie.value = null
      loading.value = false
    }
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
})
