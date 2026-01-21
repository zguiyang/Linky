import { navigateTo } from '#app'

let currentError: any = null

export const useHttpError = () => {
  const getError = () => {
    return currentError
  }

  const clearError = () => {
    currentError = null
  }

  const handle401 = () => {
    const toast = useToast()
    toast.add({
      title: '未登录或登录已过期',
      description: '请重新登录',
      color: 'error',
      icon: 'i-heroicons-lock-closed'
    })

    const { logout } = useAuth()
    logout()

    navigateTo('/auth/sign-in')
  }

  const handleError = (error: any) => {
    currentError = error

    const toast = useToast()
    toast.add({
      title: '请求失败',
      description: error?.data?.message || error?.message || '操作失败，请稍后重试',
      color: 'error',
      icon: 'i-heroicons-x-circle'
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
