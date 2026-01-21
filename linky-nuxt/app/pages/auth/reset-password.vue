<template>
  <div class="w-full max-w-[400px] p-4">
    <u-card
      class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-[40px] border border-gray-200 dark:border-gray-700"
      variant="outline"
    >
      <template #header>
        <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          重置密码
        </h2>
      </template>

      <u-form
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <u-form-field
          label="新密码"
          name="password"
          size="lg"
        >
          <u-input
            v-model="state.password"
            placeholder="请输入新密码（至少8个字符）"
            type="password"
            class="w-full"
          />
        </u-form-field>

        <u-form-field
          label="确认新密码"
          name="passwordConfirmation"
          size="lg"
        >
          <u-input
            v-model="state.passwordConfirmation"
            placeholder="请再次输入新密码"
            type="password"
            class="w-full"
          />
        </u-form-field>

        <p class="text-sm text-gray-600 dark:text-gray-400">
          密码至少需要 8 个字符
        </p>

        <u-button
          type="submit"
          block
          :loading="loading"
          class="bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-bg-hover)] text-white"
        >
          重置密码
        </u-button>
      </u-form>

      <u-alert
        v-if="success"
        color="success"
        variant="subtle"
        icon="i-heroicons-check-circle"
        title="重置成功"
        class="mt-4"
      >
        密码重置成功，正在登录...
      </u-alert>

      <u-alert
        v-if="error"
        color="error"
        variant="subtle"
        icon="i-heroicons-x-circle"
        title="重置失败"
        class="mt-4"
      >
        {{ error }}
      </u-alert>

      <div class="text-center mt-4">
        <NuxtLink
          v-if="showRetryLink"
          to="/auth/forgot-password"
          class="text-[var(--color-primary-500)] dark:text-[var(--color-primary-light)] font-medium transition-all duration-200 ease hover:text-[var(--color-primary-bg-hover)] dark:hover:text-[var(--color-primary-light)] hover:underline"
        >
          重新发送重置链接
        </NuxtLink>
        <NuxtLink
          to="/auth/sign-in"
          class="text-[var(--color-primary-500)] dark:text-[var(--color-primary-light)] font-medium transition-all duration-200 ease hover:text-[var(--color-primary-bg-hover)] dark:hover:text-[var(--color-primary-light)] hover:underline"
        >
          ← 返回登录
        </NuxtLink>
      </div>
    </u-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from '#app'

definePageMeta({ layout: 'auth' })

const route = useRoute()
const loading = ref(false)
const success = ref(false)
const error = ref('')
const showRetryLink = ref(false)

const token = (route.query.token as string) || ''

const state = reactive({
  password: '',
  passwordConfirmation: '',
  token
})

const onSubmit = async () => {
  loading.value = true
  error.value = ''
  success.value = false
  showRetryLink.value = false

  try {
    // TODO: Replace with actual API call
    // await $fetch('/api/auth/reset-password', {
    //   method: 'POST',
    //   body: state,
    // })

    console.log('Mock: Reset password with token', token)
    success.value = true
    setTimeout(() => {
      navigateTo('/workspace/bookmarks')
    }, 2000)
  } catch (err: any) {
    const errorMessage = err.data?.message || '重置失败，请重试'
    error.value = errorMessage

    if (errorMessage.includes('过期') || errorMessage.includes('无效')) {
      showRetryLink.value = true
    }
  } finally {
    loading.value = false
  }
}
</script>
