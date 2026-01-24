import { navigateTo } from '#app'

export const useHttpError = () => {
  const currentError = useState<unknown | null>('currentError', () => null)
  const isLoggingOut = useState('isLoggingOut', () => false)

  const getError = () => {
    return currentError.value
  }

  const clearError = () => {
    currentError.value = null
  }

  const handle401 = () => {
    if (isLoggingOut.value) return
    isLoggingOut.value = true

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
      isLoggingOut.value = false
    }, 1000)
  }

  const handleError = (error: unknown) => {
    currentError.value = error

    const toast = useToast()
    toast.add({
      title: '请求失败',
      description: (error as any)?.data?.message || (error as any)?.message || '操作失败，请稍后重试',
      color: 'error',
      icon: 'i-heroicons-x-mark'
    })

    if ((error as any)?.status === 401) {
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
