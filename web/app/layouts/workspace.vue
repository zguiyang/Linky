<template>
  <u-dashboard-group>
    <u-dashboard-sidebar>
      <template #header>
        <div class="flex items-center justify-center p-4">
          <div class="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            Linky
          </div>
        </div>
      </template>

      <template #default>
        <nav class="flex flex-col gap-1 p-2">
          <u-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :inactive="false"
            class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
            :class="route.path === item.to ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'"
          >
            <u-icon
              :name="item.icon"
              class="size-5"
            />
            <span class="font-medium">{{ item.label }}</span>
          </u-link>
        </nav>
      </template>

      <template #footer>
        <div class="p-2 border-t border-gray-200 dark:border-gray-700">
          <u-link
            to="/workspace/settings"
            class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
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
const route = useRoute()

const navItems = [
  { label: '书签', to: '/workspace/bookmarks', icon: 'i-heroicons-bookmark' },
  { label: '备忘录', to: '/workspace/memos', icon: 'i-heroicons-document-text' }
]
</script>
