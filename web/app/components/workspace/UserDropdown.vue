<template>
  <UDropdownMenu
    :items="menuItems"
    :content="{ align: 'end' }"
  >
    <template #default>
      <UAvatar
        :alt="user?.fullName || user?.email || 'User'"
        size="md"
        class="cursor-pointer hover:ring-2 hover:ring-primary-20 transition-all duration-200"
      >
        <template #fallback>
          {{ (user?.fullName || user?.email || 'U').charAt(0).toUpperCase() }}
        </template>
      </UAvatar>
    </template>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user, logout } = useAuth()

const menuItems = computed(() => [
  [
    {
      label: '当前用户'
    },
    {
      label: user.value?.fullName || 'User',
      description: user.value?.email,
      avatar: {
        alt: user.value?.fullName || 'User',
        size: 'md'
      }
    }
  ],
  [
    {
      label: '个人资料',
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
