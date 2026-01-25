<template>
  <u-dashboard-group>
    <u-dashboard-sidebar
      resizable
      collapsible
    >
      <template #header>
        <div class="flex items-center gap-2 p-4">
          <app-logo class="h-8 w-auto" />
          <span class="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            Linky
          </span>
        </div>
      </template>

      <template #default>
        <nav class="flex flex-col gap-1 p-2">
          <u-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :inactive="false"
            class="nav-item"
            :class="{ active: $route.path === item.to }"
          >
            <u-icon
              :name="item.icon"
              class="size-5"
            />
            <span class="font-medium">{{ item.label }}</span>
          </u-link>
        </nav>

        <div class="mx-3 my-2 border-t border-gray-200 dark:border-gray-700" />

        <div class="p-2">
          <sidebar-tags
            :tags="tagsData || []"
            :pending="pending"
            @refresh-tags="refreshTags"
          />
        </div>
      </template>

      <template #footer>
        <div class="border-t border-gray-200 dark:border-gray-700 w-full">
          <u-link
            to="/workspace/settings"
            class="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <u-icon
              name="i-heroicons-cog-6-tooth"
              class="size-5"
            />
            <span class="font-medium">设置</span>
          </u-link>
        </div>
      </template>
    </u-dashboard-sidebar>

    <div class="flex flex-col min-w-0 flex-1">
      <u-dashboard-navbar>
        <template #right>
          <u-dashboard-search-button />
          <workspace-user-dropdown />
        </template>
      </u-dashboard-navbar>

      <u-dashboard-search />

      <div class="flex-1 overflow-y-auto">
        <nuxt-page />
      </div>
    </div>
  </u-dashboard-group>
</template>

<script setup lang="ts">
import WorkspaceUserDropdown from '~/components/workspace/UserDropdown.vue'
import SidebarTags from '~/components/workspace/SidebarTags.vue'
import { tagsApi } from '~/api/tags'
import type { Tag } from '~/api/types'

const navItems = [
  { label: '书签', to: '/workspace/bookmarks', icon: 'i-heroicons-bookmark' },
  { label: '备忘录', to: '/workspace/memos', icon: 'i-heroicons-document-text' },
  { label: '标签管理', to: '/workspace/tags', icon: 'i-heroicons-tag' }
]

const { data: tagsData, pending, refresh: refreshTags } = await useAsyncData<Tag[]>('tags', () => tagsApi.index(), {
  server: true,
  default: () => []
})
</script>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition-property: background-color, color, transform, box-shadow;
  transition-duration: 200ms;
  color: rgb(55 65 81 / 0.7);
}

.nav-item.active {
  background-color: rgb(239 246 255 / 0.95);
  color: rgb(79 70 229 / 1);
}
</style>
