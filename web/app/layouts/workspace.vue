<template>
  <div class="flex h-screen overflow-hidden bg-[var(--bg-canvas)]">
    <aside class="flex flex-col flex-shrink-0 w-64 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] overflow-y-auto">
      <div class="flex items-center gap-2 px-4 py-4">
        <app-logo class="h-8 w-auto" />
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

      <div class="p-2">
        <sidebar-tags />
      </div>

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
          <u-dashboard-search-button />
          <u-button
            icon="i-heroicons-cog-6-tooth"
            color="neutral"
            variant="ghost"
            size="md"
            to="/workspace/settings"
            aria-label="设置"
          />
          <workspace-user-dropdown />
        </div>
      </header>

      <u-dashboard-search
        size="xl"
        class="bg-[var(--bg-surface)]"
      />

      <div class="flex-1 overflow-y-auto">
        <nuxt-page />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import WorkspaceUserDropdown from '~/components/workspace/UserDropdown.vue'
import SidebarTags from '~/components/workspace/SidebarTags.vue'
import { useTagsStore } from '~/stores/tags'
import { APP_INFO } from '~/constants'

const navItems = [
  { label: '书签', to: '/workspace/bookmarks', icon: 'i-heroicons-bookmark' },
  { label: '备忘录', to: '/workspace/memos', icon: 'i-heroicons-document-text' },
  { label: '标签管理', to: '/workspace/tags', icon: 'i-heroicons-tag' }
]

await useAsyncData('sidebar-tags', async () => {
  const tagsStore = useTagsStore()
  return await tagsStore.fetchTags()
})
</script>
