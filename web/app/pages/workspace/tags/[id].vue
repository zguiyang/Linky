<template>
  <div class="flex flex-col gap-4 md:gap-6 h-full min-h-0 p-4 md:p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div
        v-if="tag"
        class="flex items-center gap-3"
      >
        <div
          v-if="tag.color"
          class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
          :style="{ backgroundColor: tag.color }"
        >
          <u-icon
            name="i-heroicons-tag"
            class="w-5 h-5 text-white"
          />
        </div>
        <div
          v-else
          class="w-10 h-10 rounded-full flex-shrink-0 bg-(--bg-tertiary) flex items-center justify-center"
        >
          <u-icon
            name="i-heroicons-tag"
            class="w-5 h-5 text-(--text-secondary)"
          />
        </div>
        <div>
          <h1 class="text-lg md:text-xl font-bold text-(--text-primary)">
            {{ tag.name }}
          </h1>
          <p class="text-sm text-(--text-secondary)">
            {{ tag.bookmarksCount }} 个书签 · {{ tag.memosCount }} 个备忘录
          </p>
          <div class="flex items-center gap-2 mt-2">
            <button
              :class="[
                'text-sm px-3 py-1 rounded-full transition-colors',
                currentType === 'bookmark'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                  : 'text-(--text-secondary) hover:bg-(--bg-secondary)'
              ]"
              @click="currentType = 'bookmark'"
            >
              {{ tag.bookmarksCount }} 个书签
            </button>
            <span class="text-(--text-muted)">·</span>
            <button
              :class="[
                'text-sm px-3 py-1 rounded-full transition-colors',
                currentType === 'memo'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                  : 'text-(--text-secondary) hover:bg-(--bg-secondary)'
              ]"
              @click="currentType = 'memo'"
            >
              {{ tag.memosCount }} 个备忘录
            </button>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex items-center gap-3"
      >
        <div class="w-10 h-10 rounded-full bg-(--bg-tertiary) animate-pulse" />
        <div class="space-y-2">
          <div class="w-24 h-5 bg-(--bg-tertiary) rounded animate-pulse" />
          <div class="w-32 h-4 bg-(--bg-tertiary) rounded animate-pulse" />
        </div>
      </div>
      <u-dropdown-menu
        v-if="tag"
        class="flex-shrink-0"
        :items="menuItems"
      >
        <u-button
          icon="i-heroicons-ellipsis-horizontal"
          variant="ghost"
          color="neutral"
        />
      </u-dropdown-menu>
    </div>

    <u-scroll-area class="flex-1 min-h-0">
      <div
        v-if="pending"
        class="flex justify-center py-16"
      >
        <u-icon
          name="i-heroicons-arrow-path"
          class="w-8 h-8 animate-spin text-(--text-secondary)"
        />
      </div>
      <div
        v-else-if="items.length === 0"
        class="flex flex-col items-center justify-center py-16"
      >
        <u-icon
          name="i-heroicons-inbox"
          class="w-16 h-16 text-(--text-muted)"
        />
        <p class="text-sm text-(--text-secondary) mt-4">
          此标签下暂无内容
        </p>
      </div>
      <div
        v-else
        class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
      >
        <template v-if="currentType === 'bookmark'">
          <bookmark-card
            v-for="item in items"
            :key="`bookmark-${item.id}`"
            :bookmark="transformToBookmark(item)"
            view-mode="masonry"
            @click="handleClickBookmark"
            @edit="handleEditBookmark"
            @delete="handleDeleteBookmark"
          />
        </template>
        <template v-else>
          <memo-card
            v-for="item in items"
            :key="`memo-${item.id}`"
            :memo="transformToMemo(item)"
            view-mode="masonry"
            @edit="handleEditMemo"
            @delete="handleDeleteMemo"
          />
        </template>
      </div>
    </u-scroll-area>

    <div
      v-if="!pending && total > 0"
      class="flex justify-center py-4 shrink-0"
    >
      <u-pagination
        v-model:page="page"
        variant="soft"
        :total="total"
        :items-per-page="perPage"
        @update:page="setPage"
      />
    </div>

    <u-modal
      v-model:open="showEditModal"
      title="编辑标签"
    >
      <template #body>
        <u-form
          :state="tagForm"
          class="space-y-4"
          @submit="handleUpdateTag(() => showEditModal = false)"
        >
          <u-form-field
            label="标签名称"
            name="name"
            required
          >
            <u-input
              v-model="tagForm.name"
              placeholder="输入标签名称"
              autofocus
              class="w-full"
            />
          </u-form-field>
          <u-form-field
            label="标签颜色"
            name="color"
          >
            <div class="flex items-center gap-2">
              <input
                v-model="tagForm.color"
                type="color"
                class="w-10 h-10 rounded cursor-pointer border border-(--border-subtle)"
              >
              <u-input
                v-model="tagForm.color"
                placeholder="#000000"
                class="flex-1"
              />
            </div>
          </u-form-field>
        </u-form>
      </template>
      <template #footer="{ close }">
        <div class="flex justify-end gap-2 w-full">
          <u-button
            label="取消"
            color="neutral"
            variant="outline"
            @click="close"
          />
          <u-button
            label="保存"
            :loading="isSubmitting"
            :disabled="!tagForm.name.trim()"
            color="primary"
            @click="handleUpdateTag(close)"
          />
        </div>
      </template>
    </u-modal>

    <u-modal
      v-model:open="showDeleteConfirm"
      title="确认删除"
    >
      <template #body>
        <div class="text-center space-y-4">
          <div class="flex justify-center">
            <div class="w-16 h-16 rounded-full bg-error-50 dark:bg-error-900/20 flex items-center justify-center">
              <u-icon
                name="i-heroicons-exclamation-triangle"
                class="w-8 h-8 text-error"
              />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-(--text-primary)">
              确定要删除这个标签吗？
            </h3>
            <p class="text-sm text-(--text-secondary) mt-1">
              标签名称: <strong>{{ tag?.name }}</strong>
            </p>
          </div>
        </div>
      </template>
      <template #footer="{ close }">
        <div class="flex justify-end gap-2 w-full">
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
        </div>
      </template>
    </u-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, navigateTo } from '#app'
import type { ContextMenuItem } from '@nuxt/ui'
import type { Tag, TagItem, Bookmark, Memo } from '~/api/types'
import { TAG_ITEM_TYPE } from '~/constants'

definePageMeta({ layout: 'workspace' })

const route = useRoute()
const tagId = Number(route.params.id)

const { $api } = useNuxtApp()

const tag = ref<Tag | null>(null)
const showEditModal = ref(false)
const showDeleteConfirm = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const tagForm = ref({ name: '', color: '' })
const currentType = ref<'bookmark' | 'memo'>(TAG_ITEM_TYPE.BOOKMARK)

const pagination = usePagination<TagItem>(
  () => `/tags/${tagId}/items`,
  {
    query: computed(() => ({
      sortOrder: 'asc' as const,
      type: currentType.value
    }))
  }
)

watch(currentType, () => {
  pagination.reset()
  pagination.execute()
})

const { items, pending, page, perPage, total, setPage } = pagination

const transformToBookmark = (item: TagItem): Bookmark => ({
  id: item.id,
  title: item.title,
  url: item.url || '',
  description: item.content || '',
  visitCount: 0,
  userId: 0,
  status: 'active' as const,
  metadata: undefined,
  createdAt: item.createdAt,
  updatedAt: null,
  tags: item.tags
})

const transformToMemo = (item: TagItem): Memo => ({
  id: item.id,
  title: item.title,
  content: item.content || '',
  isPinned: false,
  userId: 0,
  tags: item.tags,
  createdAt: item.createdAt,
  updatedAt: null
})

const menuItems: ContextMenuItem[][] = [
  [
    {
      label: '编辑',
      icon: 'i-heroicons-pencil',
      onSelect: () => openEditModal()
    },
    {
      label: '删除',
      icon: 'i-heroicons-trash',
      color: 'error',
      onSelect: () => openDeleteConfirm()
    }
  ]
]

const fetchTag = async () => {
  try {
    tag.value = await $api<Tag>(`/tags/${tagId}`)
  } catch (error) {
    console.error('Failed to fetch tag:', error)
  }
}

const openEditModal = () => {
  if (!tag.value) return
  tagForm.value = {
    name: tag.value.name,
    color: tag.value.color || ''
  }
  showEditModal.value = true
}

const openDeleteConfirm = () => {
  showDeleteConfirm.value = true
}

const handleUpdateTag = async (close?: () => void) => {
  if (!tag.value || !tagForm.value.name.trim()) return

  try {
    isSubmitting.value = true
    await $api(`/tags/${tagId}`, {
      method: 'put',
      body: {
        name: tagForm.value.name.trim(),
        color: tagForm.value.color || undefined
      }
    })
    await fetchTag()
    close?.()
    showEditModal.value = false
  } catch (error) {
    console.error('Failed to update tag:', error)
  } finally {
    isSubmitting.value = false
  }
}

const handleDeleteTag = async (close?: () => void) => {
  try {
    isDeleting.value = true
    await $api(`/tags/${tagId}`, { method: 'delete' })
    close?.()
    showDeleteConfirm.value = false
    navigateTo('/workspace/tags')
  } catch (error) {
    console.error('Failed to delete tag:', error)
  } finally {
    isDeleting.value = false
  }
}

const handleClickBookmark = (bookmark: Bookmark) => {
  window.open(bookmark.url, '_blank')
}

const handleEditBookmark = (_bookmark: Bookmark) => {
  console.log('Edit bookmark')
}

const handleDeleteBookmark = (_bookmark: Bookmark) => {
  console.log('Delete bookmark')
}

const handleEditMemo = (_memo: Memo) => {
  console.log('Edit memo')
}

const handleDeleteMemo = (_memo: Memo) => {
  console.log('Delete memo')
}

onMounted(async () => {
  await Promise.all([fetchTag(), pagination.execute()])
})
</script>
