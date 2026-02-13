<template>
  <u-dashboard-group>
    <u-dashboard-sidebar
      :resizable="true"
      :collapsible="true"
      :min-size="16"
      :max-size="30"
      :default-size="20"
    >
      <template #header="{ collapsed }">
        <span
          v-if="!collapsed"
          class="text-2xl font-bold bg-linear-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent"
        >
          Linky
        </span>
      </template>

      <template #default>
        <u-navigation-menu
          v-model:active="activeNav"
          :items="navItems"
          orientation="vertical"
          class="w-full"
        />
      </template>

      <template #footer="{ collapsed }">
        <div class="flex flex-col items-center gap-1 px-4 py-2">
          <span
            v-if="!collapsed"
            class="text-xs text-(--text-secondary) font-medium"
          >
            版本号: {{ APP_INFO.VERSION }}
          </span>
          <span
            v-if="!collapsed"
            class="text-xs text-(--text-muted)"
          >
            © {{ APP_INFO.COPYRIGHT_YEAR }} {{ APP_INFO.NAME }}
          </span>
          <span
            v-else
            class="text-xs text-(--text-muted)"
          >
            v{{ APP_INFO.VERSION }}
          </span>
        </div>
      </template>
    </u-dashboard-sidebar>

    <u-dashboard-panel>
      <template #header>
        <u-dashboard-navbar title="Linky">
          <template #leading>
            <u-dashboard-sidebar-collapse />
          </template>

          <template #right>
            <email-verification-alert v-if="authStore.isAuthenticated && !authStore.isEmailVerified" />
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
          </template>
        </u-dashboard-navbar>
      </template>

      <template #body>
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

        <div class="flex-1 overflow-y-auto p-4">
          <nuxt-page />
        </div>

        <memo-detail-modal
          v-model:open="memoModalOpen"
          :memo-id="selectedMemoId"
        />
      </template>
    </u-dashboard-panel>
  </u-dashboard-group>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useGlobalSearch } from '~/composables/useGlobalSearch'
import { APP_INFO } from '~/constants'
import EmailVerificationAlert from '~/components/EmailVerificationAlert.vue'
import { useAuthStore } from '~/stores/auth'

defineOptions({
  name: 'WorkspaceLayout'
})

const authStore = useAuthStore()
const route = useRoute()
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

const activeNav = computed({
  get: () => route.path,
  set: () => {}
})

const navItems = [
  {
    label: '书签',
    to: '/workspace/bookmarks',
    icon: 'i-heroicons-bookmark'
  },
  {
    label: '备忘录',
    to: '/workspace/memos',
    icon: 'i-heroicons-document-text'
  },
  {
    label: '标签管理',
    to: '/workspace/tags',
    icon: 'i-heroicons-tag'
  }
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
