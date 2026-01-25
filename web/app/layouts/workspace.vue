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
            class="flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 ease-in-out text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            :class="{ 'bg-primary-50 text-primary-600 shadow-sm dark:bg-primary-500/20 dark:text-primary-300': $route.path === item.to }"
          >
            <u-icon
              :name="item.icon"
              class="size-5"
            />
            <span class="font-medium">{{ item.label }}</span>
          </u-link>
        </nav>

        <div class="mx-3 my-2 border-t border-neutral-200 dark:border-neutral-700" />

        <div class="p-2">
          <sidebar-tags />
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

const navItems = [
  { label: '书签', to: '/workspace/bookmarks', icon: 'i-heroicons-bookmark' },
  { label: '备忘录', to: '/workspace/memos', icon: 'i-heroicons-document-text' },
  { label: '标签管理', to: '/workspace/tags', icon: 'i-heroicons-tag' }
]
</script>
