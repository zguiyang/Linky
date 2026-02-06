<template>
  <div class="flex h-screen overflow-hidden bg-[var(--bg-canvas)]">
    <aside class="flex flex-col flex-shrink-0 w-64 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] overflow-y-auto">
      <div class="flex items-center gap-2 px-4 py-4">
        <span class="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
          Linky
        </span>
      </div>

      <nav class="flex flex-col gap-1 p-2">
        <u-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :inactive="false"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
          :class="[
            $route.path === item.to
              ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
          ]"
        >
          <u-icon
            :name="item.icon"
            class="size-5"
          />
          <span class="font-medium">{{ item.label }}</span>
          <div
            v-if="$route.path === item.to"
            class="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500"
          />
        </u-link>
      </nav>

      <div class="mx-3 my-2 border-t border-[var(--border-subtle)]" />

      <div class="border-t border-[var(--border-subtle)] w-full mt-auto">
        <div class="flex flex-col items-center gap-1 px-4 py-4">
          <span class="text-xs text-[var(--text-secondary)] font-medium">
            版本号: {{ APP_INFO.VERSION }}
          </span>
          <span class="text-xs text-[var(--text-muted)]">
            © {{ APP_INFO.COPYRIGHT_YEAR }} {{ APP_INFO.NAME }}
          </span>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <header class="flex items-center justify-end px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div class="flex items-center gap-3">
          <u-dashboard-search-button
            variant="subtle"
            @click="openSearch"
          />
          <u-button
            icon="i-heroicons-cog-6-tooth"
            color="neutral"
            variant="ghost"
            size="md"
            to="/workspace/settings"
            aria-label="设置"
          />
          <user-dropdown />
        </div>
      </header>

      <u-dashboard-search
        v-model:open="isOpen"
        v-model:search-term="searchQuery"
        v-model:groups="groups"
        :loading="isLoading"
        :color-mode="false"
        placeholder="搜索书签、备忘录、标签..."
        :autofocus="true"
        shortcut="meta_k"
        :fuse="{ fuseOptions: { includeMatches: true } }"
      >
        <template #empty>
          <div
            v-if="searchQuery.trim()"
            class="flex flex-col items-center gap-2 py-6 text-center"
          >
            <u-icon
              name="i-lucide-search"
              class="size-8 text-muted"
            />
            <p class="text-sm text-muted">
              未找到相关结果
            </p>
            <p class="text-xs text-muted">
              尝试使用其他关键词
            </p>
          </div>
          <div
            v-else
            class="flex flex-col items-center gap-2 py-8 text-center"
          >
            <div class="flex gap-2 items-center justify-center">
              <u-icon
                name="i-lucide-sparkles"
                class="size-5 text-primary"
              />
              <span class="text-sm font-medium">全局搜索</span>
            </div>
            <p class="text-xs text-muted">
              输入关键词搜索书签、备忘录、标签
            </p>
          </div>
        </template>
      </u-dashboard-search>

      <div class="flex-1 overflow-y-auto">
        <nuxt-page />
      </div>

      <memo-detail-modal
        v-model:open="memoModalOpen"
        :memo-id="selectedMemoId"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useGlobalSearch } from '~/composables/useGlobalSearch'
import { APP_INFO } from '~/constants'

const {
  isOpen,
  searchQuery,
  groups,
  isLoading,
  memoModalOpen,
  selectedMemoId,
  open,
  close
} = useGlobalSearch()

const navItems = [
  { label: '书签', to: '/workspace/bookmarks', icon: 'i-heroicons-bookmark' },
  { label: '备忘录', to: '/workspace/memos', icon: 'i-heroicons-document-text' },
  { label: '标签管理', to: '/workspace/tags', icon: 'i-heroicons-tag' }
]

const openSearch = () => {
  open()
}

const handleKeydown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault()
    open()
  }
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
