export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const publicRoutes = ['/', '/auth/sign-in', '/auth/sign-up', '/auth/forgot-password', '/auth/reset-password', '/auth/verify-email']

  if (publicRoutes.includes(to.path)) {
    return
  }

  const token = useCookie('auth_token')
  if (!token.value) {
    const lastPath = useCookie('lastPath', { maxAge: 60 * 60 })
    lastPath.value = to.path
    return navigateTo('/auth/sign-in')
  }
})
