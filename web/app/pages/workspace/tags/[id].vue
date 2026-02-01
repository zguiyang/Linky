<template>
  <div class="flex flex-col gap-6 h-full min-h-0 p-6">
    <div class="flex items-center justify-between">
      <div
        v-if="tag"
        class="flex items-center gap-3"
      >
        <div
          v-if="tag.color"
          class="w-10 h-10 rounded-full flex items-center justify-center"
          :style="{ backgroundColor: tag.color }"
        >
          <u-icon
            name="i-heroicons-tag"
            class="w-5 h-5 text-white"
          />
        </div>
        <div
          v-else
          class="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center"
        >
          <u-icon
            name="i-heroicons-tag"
            class="w-5 h-5 text-[var(--text-secondary)]"
          />
        </div>
        <div>
          <h1 class="text-xl font-bold text-[var(--text-primary)]">
            {{ tag.name }}
          </h1>
          <p class="text-sm text-[var(--text-secondary)]">
            {{ tag.bookmarksCount }} 个书签 · {{ tag.memosCount }} 个备忘录
          </p>
        </div>
      </div>
      <div
        v-else
        class="flex items-center gap-3"
      >
        <div class="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] animate-pulse" />
        <div class="space-y-2">
          <div class="w-24 h-5 bg-[var(--bg-tertiary)] rounded animate-pulse" />
          <div class="w-32 h-4 bg-[var(--bg-tertiary)] rounded animate-pulse" />
        </div>
      </div>
      <u-dropdown-menu
        v-if="tag"
        :items="menuItems"
      >
        <u-button
          icon="i-heroicons-ellipsis-horizontal"
          variant="ghost"
          color="neutral"
        />
      </u-dropdown-menu>
    </div>

    <div class="flex-1 min-h-0 overflow-y-auto">
      <div
        v-if="pending"
        class="flex justify-center py-16"
      >
        <u-icon
          name="i-heroicons-arrow-path"
          class="w-8 h-8 animate-spin text-[var(--text-secondary)]"
        />
      </div>
      <div
        v-else-if="items.length === 0"
        class="flex flex-col items-center justify-center py-16"
      >
        <u-icon
          name="i-heroicons-inbox"
          class="w-16 h-16 text-[var(--text-muted)]"
        />
        <p class="text-sm text-[var(--text-secondary)] mt-4">
          此标签下暂无内容
        </p>
      </div>
      <div
        v-else
        class="flex flex-col gap-3"
      >
        <memo-card
          v-for="item in memoItems"
          :key="`memo-${item.id}`"
          :memo="item"
          view-mode="list"
          @edit="handleEditMemo"
          @delete="handleDeleteMemo"
        />
        <bookmark-card
          v-for="item in bookmarkItems"
          :key="`bookmark-${item.id}`"
          :bookmark="item"
          view-mode="list"
          @click="handleClickBookmark"
          @edit="handleEditBookmark"
          @delete="handleDeleteBookmark"
        />
      </div>
    </div>

    <div
      v-if="lastPage > 1"
      class="flex justify-center py-4 flex-shrink-0"
    >
      <u-pagination
        v-model:page="page"
        variant="soft"
        :total="total"
        :items-per-page="perPage"
        @update:page="handlePageChange"
      />
    </div>

    <u-modal
      v-model:open="showEditModal"
      title="编辑标签"
    >
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              标签名称 <span class="text-error">*</span>
            </label>
            <u-input
              v-model="tagForm.name"
              placeholder="输入标签名称"
              autofocus
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              标签颜色
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model="tagForm.color"
                type="color"
                class="w-10 h-10 rounded cursor-pointer border border-[var(--border-subtle)]"
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
          label="保存"
          :loading="isSubmitting"
          :disabled="!tagForm.name.trim()"
          color="primary"
          @click="handleUpdateTag(close)"
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
            <div class="w-16 h-16 rounded-full bg-error-50 dark:bg-error-900/20 flex items-center justify-center">
              <u-icon
                name="i-heroicons-exclamation-triangle"
                class="w-8 h-8 text-error"
              />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-[var(--text-primary)]">
              确定要删除这个标签吗？
            </h3>
            <p class="text-sm text-[var(--text-secondary)] mt-1">
              标签名称: <strong>{{ tag?.name }}</strong>
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, navigateTo } from '#app'
import type { ContextMenuItem } from '@nuxt/ui'
import type { Tag, TagItem, Bookmark, Memo } from '~/api/types'

definePageMeta({ layout: 'workspace' })

const route = useRoute()
const tagId = Number(route.params.id)

const { $api } = useNuxtApp()

const tag = ref<Tag | null>(null)
const items = ref<TagItem[]>([])
const pending = ref(true)
const page = ref(1)
const perPage = ref(20)
const total = ref(0)
const lastPage = ref(1)

const showEditModal = ref(false)
const showDeleteConfirm = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const tagForm = ref({ name: '', color: '' })

const bookmarkItems = computed(() =>
  items.value.filter(item => item.type === 'bookmark').map(item => ({
    ...item,
    url: item.url || '',
    description: item.content,
    visit_count: 0,
    user_id: 0,
    status: 'active' as const,
    metadata: undefined,
    created_at: item.createdAt,
    updated_at: null
  })) as Bookmark[]
)

const memoItems = computed(() =>
  items.value.filter(item => item.type === 'memo').map(item => ({
    id: item.id,
    title: item.title,
    content: item.content || '',
    isPinned: false,
    userId: 0,
    tags: item.tags,
    createdAt: item.createdAt,
    updatedAt: null
  })) as Memo[]
)

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

const fetchItems = async () => {
  pending.value = true
  try {
    const response = await $api<{ data: TagItem[], meta: { total: number, page: number, perPage: number, lastPage: number } }>(
      `/tags/${tagId}/items`,
      {
        method: 'get',
        query: {
          page: page.value,
          perPage: perPage.value,
          sortOrder: 'asc'
        }
      }
    )
    items.value = response.data
    total.value = response.meta.total
    lastPage.value = response.meta.lastPage
  } catch (error) {
    console.error('Failed to fetch items:', error)
  } finally {
    pending.value = false
  }
}

const handlePageChange = (newPage: number) => {
  page.value = newPage
  fetchItems()
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

const handleEditBookmark = (bookmark: Bookmark) => {
  console.log('Edit bookmark:', bookmark.id)
}

const handleDeleteBookmark = (bookmark: Bookmark) => {
  console.log('Delete bookmark:', bookmark.id)
}

const handleEditMemo = (memo: Memo) => {
  console.log('Edit memo:', memo.id)
}

const handleDeleteMemo = (memo: Memo) => {
  console.log('Delete memo:', memo.id)
}

onMounted(async () => {
  await Promise.all([fetchTag(), fetchItems()])
})
</script>
