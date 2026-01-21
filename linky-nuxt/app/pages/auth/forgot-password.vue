<template>
  <div class="w-full max-w-[400px] p-4">
    <u-card
      class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-[40px] border border-gray-200 dark:border-gray-700"
      variant="outline"
    >
      <template #header>
        <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">忘记密码</h2>
      </template>

      <u-form class="flex flex-col gap-4" @submit="onSubmit">
        <u-form-field label="邮箱" name="email" size="lg">
          <u-input
            v-model="state.email"
            placeholder="请输入您的注册邮箱"
            type="email"
            class="w-full"
          />
        </u-form-field>

        <u-button
          type="submit"
          block
          :loading="loading"
          class="bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-bg-hover)] text-white"
        >
          发送重置链接
        </u-button>
      </u-form>

      <u-alert
        v-if="success"
        color="success"
        variant="subtle"
        icon="i-heroicons-check-circle"
        title="发送成功"
        class="mt-4"
      >
        重置邮件已发送，请检查您的邮箱
      </u-alert>

      <u-alert
        v-if="error"
        color="error"
        variant="subtle"
        icon="i-heroicons-x-circle"
        title="发送失败"
        class="mt-4"
      >
        {{ error }}
      </u-alert>

      <div class="text-center mt-4">
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
definePageMeta({ layout: 'auth' })

const loading = ref(false)
const success = ref(false)
const error = ref('')

const state = reactive({
  email: '',
})

const onSubmit = async () => {
  loading.value = true
  error.value = ''
  success.value = false

  try {
    // TODO: Replace with actual API call
    // await $fetch('/api/auth/forgot-password', {
    //   method: 'POST',
    //   body: state,
    // })

    console.log('Mock: Forgot password request for', state.email)
    success.value = true
    setTimeout(() => {
      navigateTo('/auth/sign-in')
    }, 3000)
  } catch (err: any) {
    error.value = err.data?.message || '发送失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>
