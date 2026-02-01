<template>
  <u-dropdown-menu
    :items="menuItems"
    :content="{ align: 'end' }"
  >
    <template #default>
      <u-avatar
        :alt="user?.fullName || user?.email || 'User'"
        size="md"
        class="cursor-pointer ring-2 ring-transparent hover:ring-primary-500 transition-all"
      >
        <template #fallback>
          {{ (user?.fullName || user?.email || 'U').charAt(0).toUpperCase() }}
        </template>
      </u-avatar>
    </template>
  </u-dropdown-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DropdownMenuItem } from '@nuxt/ui'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

const menuItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: 'label' as const,
      label: user.value?.fullName || user.value?.email || '用户',
      avatar: {
        alt: user.value?.fullName || user.value?.email || 'User'
      }
    }
  ],
  [
    {
      label: '个人信息',
      icon: 'i-heroicons-user',
      onSelect: () => navigateTo('/workspace/profile')
    }
  ],
  [
    {
      type: 'separator' as const
    },
    {
      label: '退出登录',
      icon: 'i-heroicons-arrow-right-on-rectangle',
      color: 'error' as const,
      onSelect: handleLogout
    }
  ]
])

const handleLogout = async () => {
  await authStore.logout()
  const toast = useToast()
  toast.add({
    title: '已退出登录',
    color: 'neutral',
    icon: 'i-heroicons-arrow-right-on-rectangle'
  })
  await navigateTo('/auth/sign-in')
}
</script>
