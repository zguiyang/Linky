<template>
  <u-dropdown-menu
    :items="menuItems"
    :content="{ align: 'end' }"
  >
    <template #default="{ open }">
      <div class="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
        <u-avatar
          :alt="user?.fullName || user?.email || 'User'"
          size="md"
        >
          <template #fallback>
            {{ (user?.fullName || user?.email || 'U').charAt(0).toUpperCase() }}
          </template>
        </u-avatar>
        <div class="flex flex-col flex-1 min-w-0">
          <span class="font-medium text-sm text-neutral-900 dark:text-neutral-100 truncate">
            {{ user?.fullName || user?.email }}
          </span>
        </div>
        <u-icon
          name="i-heroicons-chevron-down"
          class="size-4 text-neutral-500 transition-transform duration-200"
          :class="{ 'rotate-180': open }"
        />
      </div>
    </template>
  </u-dropdown-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user, logout } = useAuth()

const menuItems = computed(() => [
  [
    {
      label: '个人信息',
      icon: 'i-heroicons-user',
      onSelect: () => navigateTo('/workspace/profile')
    },
    {
      label: '设置',
      icon: 'i-heroicons-cog-6-tooth',
      onSelect: () => navigateTo('/workspace/settings')
    }
  ],
  [
    {
      label: '退出登录',
      icon: 'i-heroicons-arrow-right-on-rectangle',
      color: 'error' as const,
      onSelect: handleLogout
    }
  ]
])

const handleLogout = async () => {
  await logout()
}
</script>
