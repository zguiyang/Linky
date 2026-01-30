import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, AuthResponse } from '~/api/types'

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
    const { data } = await useApi<User>('/auth/me')
    if (data.value) {
      user.value = data.value
    }
    return user.value
  }

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    loading.value = true
    const { data } = await useApi<AuthResponse>('/auth/login', {
      method: 'post',
      body: { email, password, rememberMe }
    })
    if (data.value) {
      user.value = data.value.user
      tokenCookie.value = data.value.token
    }
    loading.value = false
    return data.value
  }

  const register = async (email: string, password: string, fullName: string) => {
    loading.value = true
    const { data } = await useApi<AuthResponse>('/auth/register', {
      method: 'post',
      body: { email, password, name: fullName }
    })
    if (data.value) {
      user.value = data.value.user
      tokenCookie.value = data.value.token
    }
    loading.value = false
    return data.value
  }

  const logout = async () => {
    const { $api } = useNuxtApp()
    loading.value = true
    await $api('/auth/logout', { method: 'post' })
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
