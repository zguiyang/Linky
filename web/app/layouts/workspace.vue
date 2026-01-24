<template>
  <div class="w-full">
    <AmbientBackground />
    <email-verification-alert :user="user" />

    <div class="flex h-screen relative overflow-hidden">
      <nav
        class="relative w-[72px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-6 z-0"
      >
        <div class="mb-8">
          <div
            class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12L12 2L22 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <div class="flex-1 w-full">
          <u-navigation-menu
            :items="navigationItems"
            orientation="vertical"
            collapsed
            :tooltip="{ content: { side: 'right' } }"
            :popover="false"
            :ui="{
              link: 'w-full h-12 rounded-xl flex items-center justify-center data-[state=active]:bg-primary/10',
              linkLeadingIcon: 'w-6 h-6 data-[state=active]:text-primary'
            }"
          />
        </div>

        <div class="flex flex-col gap-2 p-3">
          <u-button
            icon="i-heroicons-magnifying-glass"
            color="neutral"
            variant="ghost"
            class="cursor-pointer"
            @click="showGlobalSearchModal = true"
          />
          <u-button
            icon="i-heroicons-cog-6-tooth"
            color="neutral"
            variant="ghost"
            class="cursor-pointer"
          />
          <u-dropdown-menu
            :items="userMenuItems"
            :content="{ align: 'start', side: 'top', sideOffset: 8 }"
            :ui="{ content: 'w-56' }"
          >
            <template #default>
              <u-avatar
                :alt="user?.fullName || user?.email || 'User'"
                size="sm"
                class="cursor-pointer"
              >
                <template #fallback>
                  {{ (user?.fullName || user?.email || 'U').charAt(0).toUpperCase() }}
                </template>
              </u-avatar>
            </template>
          </u-dropdown-menu>
          <u-color-mode-button />
        </div>
      </nav>

      <aside
        class="relative w-[280px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-y-auto z-0 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        <tags-card />
      </aside>

      <main
        class="relative flex-1 overflow-y-auto z-0 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
      >
        <slot />
      </main>

      <u-modal
        v-model:open="showGlobalSearchModal"
        title="全局搜索"
      >
        <template #body>
          <u-input
            v-model="globalSearchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="搜索..."
            size="md"
            @keyup.enter="handleGlobalSearch"
          />
          <div
            v-if="searchResults.length > 0"
            class="mt-4 space-y-2"
          >
            <div
              v-for="result in searchResults"
              :key="`${result.type}-${result.id}`"
              class="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all"
            >
              <div class="flex items-center gap-3">
                <u-icon
                  :name="result.icon"
                  class="w-5 h-5 text-gray-400"
                />
                <div class="flex-1 min-w-0">
                  <h4 class="font-medium text-gray-900 dark:text-white truncate">
                    {{ result.title }}
                  </h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {{ result.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else-if="globalSearchQuery"
            class="mt-4 text-center py-8"
          >
            <u-icon
              name="i-heroicons-magnifying-glass"
              class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto"
            />
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              暂无搜索结果
            </p>
          </div>
        </template>
        <template #footer="{ close }">
          <u-button
            label="关闭"
            color="neutral"
            variant="outline"
            @click="close"
          />
        </template>
      </u-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'
import AmbientBackground from '~/components/shared/AmbientBackground.vue'
import EmailVerificationAlert from '../components/EmailVerificationAlert.vue'
import TagsCard from '~/components/TagsCard.vue'
import { useAuth } from '~/composables/useAuth'

const { user, logout, fetchUser } = useAuth()

const showGlobalSearchModal = ref(false)
const globalSearchQuery = ref('')
const searchResults = ref<any[]>([])

const navigationItems = ref<NavigationMenuItem[]>([
  { label: '书签', icon: 'i-heroicons-bookmark', to: '/workspace/bookmarks' },
  { label: '备忘录', icon: 'i-heroicons-document-text', to: '/workspace/memos' }
])

const handleLogout = async () => {
  await logout()
}

const userMenuItems = computed(() => {
  return [
    [
      {
        label: '当前用户'
      },
      {
        label: user.value?.fullName || user.value?.email || 'User',
        description: user.value?.email,
        avatar: {
          alt: user.value?.fullName || user.value?.email || 'User',
          size: 'md'
        }
      }
    ],
    [
      {
        label: '登出',
        icon: 'i-heroicons-arrow-right-on-rectangle',
        onSelect: handleLogout,
        color: 'error' as const
      }
    ]
  ]
})

const handleGlobalSearch = () => {
  const query = globalSearchQuery.value.toLowerCase()
  if (!query) {
    return
  }

  console.log('Mock: 搜索', query)
  searchResults.value = [
    {
      type: 'bookmark',
      id: 1,
      title: 'Vue.js 官方文档',
      description: 'https://vuejs.org',
      icon: 'i-heroicons-bookmark'
    },
    {
      type: 'memo',
      id: 1,
      title: '项目规划',
      description: '这是一个关于项目规划的备忘录...',
      icon: 'i-heroicons-document-text'
    }
  ]
}

onMounted(async () => {
  fetchUser()
})
</script>
