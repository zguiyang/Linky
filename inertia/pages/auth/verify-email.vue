<template>
  <auth-layout>
    <div class="w-full max-w-[400px] p-4">
      <u-card
        class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-[40px] border border-gray-200 dark:border-gray-700"
        variant="outline"
      >
        <template #header>
          <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">邮箱验证</h2>
        </template>

        <div v-if="loading" class="flex flex-col items-center justify-center py-8">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary-500)]"
          ></div>
          <p class="mt-4 text-gray-600 dark:text-gray-400">正在验证您的邮箱...</p>
        </div>

        <div v-else-if="success" class="flex flex-col items-center py-6">
          <div
            class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4"
          >
            <i-heroicons-check-circle class="w-10 h-10 text-green-500" />
          </div>
          <u-alert
            color="success"
            variant="subtle"
            icon="i-heroicons-check-circle"
            title="验证成功"
            class="w-full mb-4"
          >
            您的邮箱已验证成功，正在跳转...
          </u-alert>
        </div>

        <div v-else-if="error" class="flex flex-col items-center py-6">
          <div
            class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4"
          >
            <i-heroicons-x-circle class="w-10 h-10 text-red-500" />
          </div>
          <u-alert
            color="error"
            variant="subtle"
            icon="i-heroicons-x-circle"
            title="验证失败"
            class="w-full mb-4"
          >
            {{ error }}
          </u-alert>
          <div class="flex flex-col gap-2 w-full">
            <Link
              href="/auth/forgot-password"
              class="text-center w-full px-4 py-2 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] text-white rounded-lg transition-colors"
            >
              重新发送验证邮件
            </Link>
            <Link
              href="/sign-in"
              class="text-center text-[var(--color-primary-500)] dark:text-[var(--color-primary-300)] font-medium transition-all duration-200 ease hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-primary-200)] hover:underline"
            >
              返回登录
            </Link>
          </div>
        </div>
      </u-card>
    </div>
  </auth-layout>
</template>

<script setup lang="ts">
import { Link, router, usePage } from '@inertiajs/vue3'
import { onMounted, ref } from 'vue'
import AuthLayout from '~/layouts/auth.vue'

const page = usePage()
const loading = ref(false)
const success = ref(false)
const error = ref('')

const urlParams = new URLSearchParams(page.url.split('?')[1] || '')
const token = urlParams.get('token') || ''

onMounted(() => {
  if (!token) {
    error.value = '验证链接无效，缺少验证令牌'
    return
  }

  loading.value = true
  error.value = ''

  router.get(
    '/api/auth/verify-email',
    { token },
    {
      onFinish: () => {
        loading.value = false
      },
      onSuccess: () => {
        success.value = true
        setTimeout(() => {
          window.location.href = '/workspace/bookmarks'
        }, 2000)
      },
      onError: (errors) => {
        const errorMessage = Object.values(errors)[0] || '验证失败，请重试'
        error.value = errorMessage
      },
    }
  )
})
</script>
