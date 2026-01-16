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

          <u-button
            type="submit"
            block
            class="bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] text-white"
          >
            登录
          </u-button>
        </u-form>

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
import { Link } from '@inertiajs/vue3'
import { reactive } from 'vue'
import AuthLayout from '~/layouts/auth.vue'

const state = reactive({
  email: '',
  password: '',
})

const onSubmit = () => {
  console.log('Mock: 登录提交', state)
  alert('登录成功！（Mock演示）')
  window.location.href = '/'
}
</script>
