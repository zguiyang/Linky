<template>
  <auth-layout>
    <div class="auth-container">
      <u-card class="auth-card glass-heavy" variant="outline">
        <template #header>
          <h2 class="auth-title">系统注册</h2>
        </template>
        <u-form @submit="onSubmit" class="auth-form">
          <u-form-field label="邮箱" name="email" size="lg">
            <u-input
              v-model="state.email"
              placeholder="邮箱"
              type="email"
              class="w-full input-base"
            />
          </u-form-field>
          <u-form-field label="用户名" name="name" size="lg">
            <u-input v-model="state.name" placeholder="用户名" class="w-full input-base" />
          </u-form-field>
          <u-form-field label="密码" name="password" size="lg">
            <u-input
              v-model="state.password"
              placeholder="密码"
              type="password"
              class="w-full input-base"
            />
          </u-form-field>
          <u-button type="submit" class="w-full btn btn-primary">注册</u-button>
          <div class="auth-footer">
            <Link href="/sign-in" class="auth-link">已有账号？去登录</Link>
          </div>
        </u-form>
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
  name: '',
  password: '',
})

const onSubmit = () => {
  console.log('Mock: 注册提交', state)
  alert('注册成功！请登录（Mock演示）')
  window.location.href = '/sign-in'
}
</script>

<style scoped>
.auth-container {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
}

.auth-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(229, 231, 235, 1);
}

.dark .auth-card {
  background: rgba(17, 24, 39, 0.95);
  border-color: rgba(55, 65, 81, 1);
}

.auth-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #111827;
}

.dark .auth-title {
  color: #f9fafb;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-footer {
  text-align: center;
  margin-top: 1rem;
}

.auth-link {
  color: #818cf8;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.auth-link:hover {
  color: #6366f1;
  text-decoration: underline;
}
</style>
