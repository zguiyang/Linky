<template>
  <auth-layout>
    <div class="w-full max-w-[400px] p-4">
      <u-card
        class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-[40px] border border-gray-200 dark:border-gray-700"
        variant="outline"
      >
        <template #header>
          <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">系统登录</h2>
        </template>

        <u-form @submit="onSubmit" class="flex flex-col gap-4">
          <u-form-field label="Email" name="email" size="lg">
            <u-input v-model="state.email" placeholder="Email" type="email" class="w-full" />
          </u-form-field>

          <u-form-field label="Password" name="password" size="lg">
            <u-input
              v-model="state.password"
              placeholder="Password"
              type="password"
              class="w-full"
            />
          </u-form-field>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <u-checkbox v-model="state.rememberMe" />
              <span class="text-sm text-gray-700 dark:text-gray-300">记住我</span>
            </div>
            <Link
              href="/auth/forgot-password"
              class="text-sm text-[var(--color-primary-500)] dark:text-[var(--color-primary-300)] hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-primary-200)] transition-colors"
            >
              忘记密码？
            </Link>
          </div>

          <u-button
            type="submit"
            block
            :loading="loading"
            class="bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] text-white"
          >
            登录
          </u-button>
        </u-form>

        <div
          v-if="error"
          class="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm"
        >
          {{ error }}
        </div>

        <div class="text-center mt-4">
          <Link
            href="/sign-up"
            class="text-[var(--color-primary-500)] dark:text-[var(--color-primary-300)] font-medium transition-all duration-200 ease hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-primary-200)] hover:underline"
          >
            注册新账号
          </Link>
        </div>
      </u-card>
    </div>
  </auth-layout>
</template>

<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import { reactive, ref } from 'vue'
import AuthLayout from '~/layouts/auth.vue'

const loading = ref(false)
const error = ref('')

const state = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

const onSubmit = () => {
  loading.value = true
  error.value = ''

  router.post('/auth/login', state, {
    onFinish: () => {
      loading.value = false
    },
    onError: (errors) => {
      error.value = Object.values(errors)[0] || '登录失败，请检查您的凭据'
    },
  })
}
</script>
