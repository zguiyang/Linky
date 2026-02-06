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
  const isEmailVerified = computed(() => user.value?.isEmailVerified === true)

  const fetchUser = async () => {
    const { $api } = useNuxtApp()
    const data = await $api<User>('/user/me')
    if (data) {
      user.value = data
    }
    return user.value
  }

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    const { $api } = useNuxtApp()
    loading.value = true
    const data = await $api<AuthResponse>('/auth/login', {
      method: 'post',
      body: { email, password, rememberMe }
    })
    if (data) {
      user.value = data.user
      tokenCookie.value = data.token
    }
    loading.value = false
    return data
  }

  const register = async (email: string, password: string, fullName: string) => {
    const { $api } = useNuxtApp()
    loading.value = true
    const data = await $api<AuthResponse>('/auth/register', {
      method: 'post',
      body: { email, password, name: fullName }
    })
    if (data) {
      user.value = data.user
      tokenCookie.value = data.token
    }
    loading.value = false
    return data
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
