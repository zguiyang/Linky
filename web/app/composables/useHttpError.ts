import { navigateTo } from '#app'

export const useHttpError = () => {
  const currentError = useState<unknown | null>('currentError', () => null)
  const isLoggingOut = useState('isLoggingOut', () => false)

  const getErrorMessage = (error: unknown): string => {
    if ((error as any)?.data?.message) {
      return (error as any).data.message
    }
    if ((error as any)?.message) {
      return (error as any).message
    }
    return '操作失败，请稍后重试'
  }

  const handle401 = () => {
    if (isLoggingOut.value) return
    isLoggingOut.value = true

    const toast = useToast()
    toast.add({
      title: '未登录或登录已过期',
      description: getErrorMessage(currentError.value),
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
      description: getErrorMessage(error),
      color: 'error',
      icon: 'i-heroicons-x-mark'
    })
  }

  return {
    getErrorMessage,
    handle401,
    handleError
  }
}
