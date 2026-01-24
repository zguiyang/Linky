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
        <tags-card
          :tags="tags"
          :selected-tags="selectedTags"
          :loading="loading"
          @add-tag="openAddModal"
          @edit-tag="openEditModal"
          @delete-tag="openDeleteConfirm"
          @toggle-tag="toggleTag"
        />
      </aside>

      <main
        class="relative flex-1 overflow-y-auto z-0 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
      >
        <slot />
      </main>

      <u-modal
        v-model:open="showTagModal"
        :title="isEditMode ? '编辑标签' : '新增标签'"
      >
        <template #body>
          <div class="space-y-4">
            <div>
              <label
                for="tagName"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                标签名称 <span class="text-red-500">*</span>
              </label>
              <u-input
                id="tagName"
                v-model="tagForm.name"
                placeholder="输入标签名称"
                autofocus
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                标签颜色
              </label>
              <div class="flex items-center gap-2">
                <input
                  v-model="tagForm.color"
                  type="color"
                  class="w-10 h-10 rounded cursor-pointer border border-gray-200 dark:border-gray-600"
                >
                <u-input
                  v-model="tagForm.color"
                  placeholder="#000000"
                  class="flex-1"
                />
              </div>
            </div>
          </div>
        </template>
        <template #footer="{ close }">
          <u-button
            label="取消"
            color="neutral"
            variant="outline"
            @click="close"
          />
          <u-button
            :label="isEditMode ? '保存' : '创建'"
            :loading="isSubmitting"
            :disabled="!tagForm.name.trim()"
            color="primary"
            @click="isEditMode ? handleUpdateTag(close) : handleCreateTag(close)"
          />
        </template>
      </u-modal>

      <u-modal
        v-model:open="showDeleteConfirm"
        title="确认删除"
      >
        <template #body>
          <div class="text-center space-y-4">
            <div class="flex justify-center">
              <div class="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <u-icon
                  name="i-heroicons-exclamation-triangle"
                  class="w-8 h-8 text-red-500"
                />
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                确定要删除这个标签吗？
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                标签名称: <strong>{{ contextTag?.name }}</strong>
              </p>
            </div>
          </div>
        </template>
        <template #footer="{ close }">
          <u-button
            label="取消"
            color="neutral"
            variant="outline"
            @click="close"
          />
          <u-button
            label="删除"
            color="error"
            :loading="isDeleting"
            @click="handleDeleteTag(close)"
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
import { tagsApi } from '~/api/tags'
import type { Tag, CreateTagRequest, UpdateTagRequest } from '~/api/types'

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

const tags = ref<Tag[]>([])
const loading = ref(false)
const selectedTags = ref<number[]>([])

const _handleGlobalSearch = () => {
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

const toggleTag = (tagId: number) => {
  const index = selectedTags.value.indexOf(tagId)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tagId)
  }
}

const loadTags = async () => {
  try {
    loading.value = true
    const data = await tagsApi.index()
    tags.value = data
  } finally {
    loading.value = false
  }
}

const showTagModal = ref(false)
const isEditMode = ref(false)
const showDeleteConfirm = ref(false)

const tagForm = ref<{ name: string, color: string }>({ name: '', color: '' })
const isSubmitting = ref(false)
const isDeleting = ref(false)

const contextTag = ref<Tag | null>(null)

const handleCreateTag = async (close?: () => void) => {
  if (!tagForm.value.name.trim()) {
    return
  }

  try {
    isSubmitting.value = true
    const data: CreateTagRequest = {
      name: tagForm.value.name.trim(),
      color: tagForm.value.color || undefined
    }
    const result = await tagsApi.create(data)
    tags.value.push(result)

    close?.()
    showTagModal.value = false
    tagForm.value = { name: '', color: '' }
  } finally {
    isSubmitting.value = false
  }
}

const handleUpdateTag = async (close?: () => void) => {
  if (!contextTag.value || !tagForm.value.name.trim()) {
    return
  }

  try {
    isSubmitting.value = true
    const data: UpdateTagRequest = {
      name: tagForm.value.name.trim(),
      color: tagForm.value.color || undefined
    }
    const result = await tagsApi.update(contextTag.value.id, data)

    const index = tags.value.findIndex(t => t.id === result.id)
    if (index !== -1) {
      tags.value[index] = result
    }

    close?.()
    showTagModal.value = false
    tagForm.value = { name: '', color: '' }
    contextTag.value = null
  } finally {
    isSubmitting.value = false
  }
}

const handleDeleteTag = async (close?: () => void) => {
  if (!contextTag.value) {
    return
  }

  try {
    isDeleting.value = true
    await tagsApi.delete(contextTag.value.id)

    tags.value = tags.value.filter(t => t.id !== contextTag.value?.id)
    selectedTags.value = selectedTags.value.filter(id => id !== contextTag.value?.id)

    close?.()
    showDeleteConfirm.value = false
    contextTag.value = null
  } finally {
    isDeleting.value = false
  }
}

const openEditModal = (tag: Tag) => {
  isEditMode.value = true
  tagForm.value = { name: tag.name, color: tag.color || '' }
  contextTag.value = tag
  showTagModal.value = true
}

const openAddModal = () => {
  isEditMode.value = false
  tagForm.value = { name: '', color: '' }
  showTagModal.value = true
}

const openDeleteConfirm = (tag: Tag) => {
  contextTag.value = tag
  showDeleteConfirm.value = true
}

onMounted(async () => {
  await loadTags()
  fetchUser()
})

defineExpose({
  tags,
  selectedTags,
  toggleTag
})
</script>
