export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const publicRoutes = [
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify-email',
    '/'
  ]

  if (
    publicRoutes.some((route) => {
      return to.path.startsWith(route)
    })
  ) {
    return
  }

  const lastPath = useCookie('lastPath', {
    default: () => '/workspace/bookmarks',
    maxAge: 60 * 60
  })
  lastPath.value = to.path
})
