<template>
  <div class="w-full max-w-[400px] p-4">
    <u-card
      class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-[40px] border border-gray-200 dark:border-gray-700"
      variant="outline"
    >
      <template #header>
        <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          系统注册
        </h2>
      </template>

      <u-form
        :state="state"
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <u-form-field
          label="邮箱"
          name="email"
          size="lg"
        >
          <u-input
            v-model="state.email"
            placeholder="邮箱"
            type="email"
            class="w-full"
          />
        </u-form-field>

        <u-form-field
          label="用户名"
          name="name"
          size="lg"
        >
          <u-input
            v-model="state.name"
            placeholder="用户名"
            class="w-full"
          />
        </u-form-field>

        <u-form-field
          label="密码"
          name="password"
          size="lg"
        >
          <u-input
            v-model="state.password"
            placeholder="密码"
            type="password"
            class="w-full"
          />
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

      <div class="text-center mt-4">
        <nuxt-link
          to="/auth/sign-in"
          class="text-[var(--color-primary-500)] dark:text-[var(--color-primary-300)] font-medium transition-all duration-200 ease hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-primary-200)] hover:underline"
        >
          已有账号？去登录
        </nuxt-link>
      </div>
    </u-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'auth' })

const { register, loading } = useAuth()

const state = reactive({
  email: '',
  name: '',
  password: ''
})

const onSubmit = async () => {
  await register(state)
}
</script>
