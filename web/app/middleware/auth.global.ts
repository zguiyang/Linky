import { useAuthStore } from '@/stores/auth'
import { useTagsStore } from '@/stores/tags'

export default defineNuxtRouteMiddleware(async (to) => {
  const publicRoutes = ['/', '/auth/sign-in', '/auth/sign-up', '/auth/forgot-password', '/auth/reset-password']

  if (publicRoutes.includes(to.path)) {
    return
  }

  const token = useCookie('auth_token')
  if (!token.value) {
    const lastPath = useCookie('lastPath', { maxAge: 60 * 60 })
    lastPath.value = to.path
    return navigateTo('/auth/sign-in')
  }

  const authStore = useAuthStore()
  const tagsStore = useTagsStore()

  if (!authStore.user) {
    try {
      await authStore.fetchUser()
    } catch {
      token.value = null
      authStore.setUser(null)
      const lastPath = useCookie('lastPath', { maxAge: 60 * 60 })
      lastPath.value = to.path
      return navigateTo('/auth/sign-in')
    }
  }

  await tagsStore.fetchTags()
})
