import { navigateTo } from '#app'

let currentError: any = null
let isLoggingOut = false

export const useHttpError = () => {
  const getError = () => {
    return currentError
  }

  const clearError = () => {
    currentError = null
  }

  const handle401 = () => {
    if (isLoggingOut) return
    isLoggingOut = true

    const toast = useToast()
    toast.add({
      title: '未登录或登录已过期',
      description: '请重新登录',
      color: 'error',
      icon: 'i-heroicons-lock-closed'
    })

    const tokenCookie = useCookie('auth_token')
    tokenCookie.value = null

    navigateTo('/auth/sign-in')

    setTimeout(() => {
      isLoggingOut = false
    }, 1000)
  }

  const handleError = (error: any) => {
    currentError = error

    const toast = useToast()
    toast.add({
      title: '请求失败',
      description: error?.data?.message || error?.message || '操作失败，请稍后重试',
      color: 'error',
      icon: 'i-heroicons-x-mark'
    })

    if (error?.status === 401) {
      handle401()
    }
  }

  return {
    getError,
    clearError,
    handleError,
    handle401
  }
}
