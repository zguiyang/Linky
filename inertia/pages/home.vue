<template>
  <workspace-layout>
    <div class="home-page">
      <div class="container mx-auto px-12 py-16">
        <div class="text-center mb-16">
          <h1
            class="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent"
          >
            欢迎使用 Linky
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400">您的个人知识管理空间</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link href="/workspace/bookmarks" class="feature-card">
            <div class="card-icon">
              <u-icon name="i-heroicons-bookmark" class="icon" />
            </div>
            <h3 class="card-title">书签管理</h3>
            <p class="card-description">高效管理您的网络书签，支持分类和标签</p>
          </Link>

          <Link href="/workspace/memos" class="feature-card">
            <div class="card-icon">
              <u-icon name="i-heroicons-document-text" class="icon" />
            </div>
            <h3 class="card-title">备忘录</h3>
            <p class="card-description">记录您的想法和灵感，随时随地访问</p>
          </Link>

          <Link href="/sign-in" class="feature-card">
            <div class="card-icon">
              <u-icon name="i-heroicons-user" class="icon" />
            </div>
            <h3 class="card-title">登录</h3>
            <p class="card-description">登录您的账户，同步您的数据</p>
          </Link>
        </div>
      </div>
    </div>
  </workspace-layout>
</template>

<script setup lang="ts">
import WorkspaceLayout from '~/layouts/workspace.vue'
import { Link } from '@inertiajs/vue3'
</script>

<style scoped>
.home-page {
  min-height: 100%;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur-xl;
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.dark .feature-card {
  background: rgba(17, 24, 39, 0.5);
  border-color: rgba(55, 65, 81, 1);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-color: rgba(99, 102, 241, 0.3);
}

.card-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
  border-radius: 16px;
  margin-bottom: 1.5rem;
}

.icon {
  width: 32px;
  height: 32px;
  color: #6366f1;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
}

.dark .card-title {
  color: #f9fafb;
}

.card-description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
}

.dark .card-description {
  color: #9ca3af;
}
</style>
