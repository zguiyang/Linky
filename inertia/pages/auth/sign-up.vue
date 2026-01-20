<template>
  <auth-layout>
    <div class="w-full max-w-[400px] p-4">
      <u-card
        class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-[40px] border border-gray-200 dark:border-gray-700"
        variant="outline"
      >
        <template #header>
          <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">系统注册</h2>
        </template>

        <u-form @submit="onSubmit" class="flex flex-col gap-4">
          <u-form-field label="邮箱" name="email" size="lg">
            <u-input v-model="state.email" placeholder="邮箱" type="email" class="w-full" />
          </u-form-field>

          <u-form-field label="用户名" name="name" size="lg">
            <u-input v-model="state.name" placeholder="用户名" class="w-full" />
          </u-form-field>

          <u-form-field label="密码" name="password" size="lg">
            <u-input v-model="state.password" placeholder="密码" type="password" class="w-full" />
          </u-form-field>

          <u-button
            type="submit"
            block
            :loading="loading"
            class="bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] text-white"
          >
            注册
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
            href="/sign-in"
            class="text-[var(--color-primary-500)] dark:text-[var(--color-primary-300)] font-medium transition-all duration-200 ease hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-primary-200)] hover:underline"
          >
            已有账号？去登录
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
  name: '',
  password: '',
})

const onSubmit = () => {
  loading.value = true
  error.value = ''

  router.post('/auth/register', state, {
    onFinish: () => {
      loading.value = false
    },
    onError: (errors) => {
      error.value = Object.values(errors)[0] || '注册失败，请稍后重试'
    },
  })
}
</script>
