<template>
  <div class="flex flex-col gap-6 h-full min-h-0 p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-shrink-0">
      <div>
        <h1 class="text-2xl font-bold text-[var(--text-primary)]">
          我的备忘录
        </h1>
        <p class="text-sm text-[var(--text-secondary)] mt-1">
          共 {{ total }} 个备忘录
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <u-input
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="搜索备忘录..."
          size="md"
          class="w-full sm:w-64"
        />
        <div class="hidden sm:block w-px h-6 bg-[var(--border-subtle)]" />
        <div class="inline-flex items-center p-0.5 rounded-lg border border-[var(--border-subtle)]">
          <u-button
            :color="viewMode === 'masonry' ? 'primary' : 'neutral'"
            :variant="viewMode === 'masonry' ? 'solid' : 'ghost'"
            size="sm"
            icon="i-heroicons-view-columns"
            title="瀑布流"
            @click="setViewMode('masonry')"
          />
          <u-button
            :color="viewMode === 'grid' ? 'primary' : 'neutral'"
            :variant="viewMode === 'grid' ? 'solid' : 'ghost'"
            size="sm"
            icon="i-heroicons-squares-2x2"
            title="网格"
            @click="setViewMode('grid')"
          />
          <u-button
            :color="viewMode === 'list' ? 'primary' : 'neutral'"
            :variant="viewMode === 'list' ? 'solid' : 'ghost'"
            size="sm"
            icon="i-heroicons-list-bullet"
            title="列表"
            @click="setViewMode('list')"
          />
        </div>

        <div class="w-px h-6 bg-[var(--border-subtle)]" />

        <u-button
          icon="i-heroicons-plus"
          color="primary"
          size="md"
          title="新建备忘录"
          @click="handleCreate"
        />
      </div>
    </div>

    <div
      v-if="tagsStore.selectedTags.length > 0"
      class="px-2 py-3 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-subtle)]"
    >
      <div class="flex items-center gap-3">
        <span class="text-sm text-[var(--text-secondary)]">已选标签：</span>
        <div class="flex items-center gap-2">
          <u-badge
            v-for="tagId in tagsStore.selectedTags"
            :key="tagId"
            color="primary"
            variant="soft"
            size="md"
          >
            {{ tagsStore.getTagName(tagId) }}
            <u-button
              icon="i-heroicons-x-mark"
              size="xs"
              variant="ghost"
              color="neutral"
              @click="tagsStore.removeTag(tagId)"
            />
          </u-badge>
        </div>
        <u-button
          size="sm"
          variant="ghost"
          color="neutral"
          @click="tagsStore.clearTags"
        >
          清除筛选
        </u-button>
      </div>
    </div>

    <u-scroll-area class="flex-1 min-h-0">
      <div
        v-if="pending"
        class="flex justify-center py-16"
      >
        <u-icon
          name="i-heroicons-arrow-path"
          class="w-8 h-8 animate-spin"
        />
      </div>

      <div v-else>
        <div
          v-if="viewMode === 'masonry'"
          class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          <template
            v-for="memo in allMemos"
            :key="memo.id"
          >
            <memo-card
              :memo="memo"
              :is-editing="isNewCard(memo) || editingMemoId === memo.id"
              view-mode="masonry"
              @save-new-content="handleSaveNew"
              @cancel-content-edit="handleCancelNew"
              @save-content="handleSaveContent"
              @open-editor="openEditor"
              @edit="openMetaModal"
              @delete="openDeleteConfirm"
              @start-content-edit="handleStartEditContent"
            />
          </template>
        </div>

        <div
          v-else-if="viewMode === 'grid'"
          class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6"
        >
          <template
            v-for="memo in allMemos"
            :key="memo.id"
          >
            <memo-card
              :memo="memo"
              :is-editing="isNewCard(memo) || editingMemoId === memo.id"
              view-mode="grid"
              @save-new-content="handleSaveNew"
              @cancel-content-edit="handleCancelNew"
              @save-content="handleSaveContent"
              @open-editor="openEditor"
              @edit="openMetaModal"
              @delete="openDeleteConfirm"
              @start-content-edit="handleStartEditContent"
            />
          </template>
        </div>

        <div
          v-else
          class="flex flex-col gap-2"
        >
          <template
            v-for="memo in allMemos"
            :key="memo.id"
          >
            <memo-card
              :memo="memo"
              :is-editing="isNewCard(memo) || editingMemoId === memo.id"
              view-mode="list"
              class="w-full"
              @save-new-content="handleSaveNew"
              @cancel-content-edit="handleCancelNew"
              @save-content="handleSaveContent"
              @open-editor="openEditor"
              @edit="openMetaModal"
              @delete="openDeleteConfirm"
              @start-content-edit="handleStartEditContent"
            />
          </template>
        </div>

        <u-empty v-if="memos.length === 0 && !pendingMemo">
          <template #icon>
            <u-icon
              name="i-heroicons-document-text"
              class="size-16"
            />
          </template>
          <template #title>
            <span class="text-lg font-semibold text-[var(--text-primary)]">暂无备忘录</span>
          </template>
          <template #description>
            <span class="text-sm text-[var(--text-secondary)]">开始创建您的第一个备忘录吧</span>
          </template>
        </u-empty>
      </div>
    </u-scroll-area>

    <div
      v-if="!pending && total > 0"
      class="flex justify-center py-4 flex-shrink-0"
    >
      <u-pagination
        v-model:page="page"
        variant="soft"
        :total="total"
        :items-per-page="perPage"
        @update:page="setPage"
      />
    </div>

    <memo-meta-modal
      v-model="showMetaModal"
      :memo="currentMemo"
      @save="handleSaveMeta"
      @close="closeMetaModal"
    />

    <memo-editor-modal
      v-model="showEditorModal"
      :memo="editorMemo"
      @save="handleSaveEditor"
      @close="closeEditorModal"
    />

    <u-modal
      v-model:open="showDeleteModal"
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
              确定要删除这条备忘录吗？
            </h3>
            <p class="text-sm text-[var(--text-secondary)] mt-1">
              此操作无法撤销
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
            @click="closeDeleteModal"
          />
          <u-button
            label="删除"
            color="error"
            :loading="isDeleting"
            @click="confirmDelete(close)"
          />
        </div>
      </template>
    </u-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTagsStore } from '~/stores/tags'
import type { Memo, CreateMemoRequest, UpdateMemoRequest } from '~/api/types'
import { VIEW_MODE, type ViewMode } from '~/constants'

definePageMeta({ layout: 'workspace' })

function extractTitle(content: string, maxLength: number = 100): string {
  const withoutHtml = content.replace(/<[^>]*>/g, '')

  const plainText = withoutHtml
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/>\s+/g, '')
    .replace(/[-*+]\s+/g, '')
    .replace(/\n+/g, ' ')
    .trim()

  if (!plainText) return '无标题备忘录'

  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + '...'
    : plainText
}

const { $api } = useNuxtApp()

const tagsStore = useTagsStore()

const searchQuery = ref('')
const searchQueryParam = computed(() => searchQuery.value || undefined)

const viewMode = ref<ViewMode>(VIEW_MODE.MASONRY)

const pagination = usePagination<Memo>(
  '/memos/paginate',
  {
    query: computed(() => ({
      search: searchQueryParam.value,
      tagIds: tagsStore.selectedTags.length > 0 ? tagsStore.selectedTags : undefined
    }))
  }
)

const { items: memos, total, pending, page, perPage, setPage } = pagination

await pagination.execute()

const allMemos = computed(() => {
  if (!pendingMemo.value) return memos.value
  return [pendingMemo.value, ...memos.value]
})

const isNewCard = (memo: Memo) => memo.id === 0

const showMetaModal = ref(false)
const currentMemo = ref<Memo | null>(null)
const showDeleteModal = ref(false)
const memoToDelete = ref<Memo | null>(null)
const isDeleting = ref(false)

const showEditorModal = ref(false)
const editorMemo = ref<Memo | null>(null)

const pendingMemo = ref<Memo | null>(null)
const editingMemoId = ref<number | null>(null)

const setViewMode = (mode: ViewMode) => {
  viewMode.value = mode
}

const handleCreate = () => {
  pendingMemo.value = {
    id: 0,
    content: '',
    title: '',
    isPinned: false,
    userId: 0,
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: null
  }
}

const handleStartEditContent = (memo: Memo) => {
  editingMemoId.value = memo.id
  pendingMemo.value = null
}

const handleSaveNew = (_content: string) => {
  if (!pendingMemo.value) return

  const content = _content
  const title = extractTitle(content, 100)

  $api('/memos', {
    method: 'post',
    body: { title, content } as CreateMemoRequest
  }).then(() => {
    pendingMemo.value = null
    return pagination.execute()
  })
}

const handleCancelNew = () => {
  pendingMemo.value = null
}

const handleSaveContent = (id: number, content: string) => {
  $api(`/memos/${id}`, {
    method: 'put',
    body: { content } as UpdateMemoRequest
  }).then(() => {
    pendingMemo.value = null
    editingMemoId.value = null
    return pagination.execute()
  })
}

const _handleCancelEdit = () => {
  editingMemoId.value = null
}

const openMetaModal = (memo: Memo) => {
  currentMemo.value = memo
  showMetaModal.value = true
}

const closeMetaModal = () => {
  showMetaModal.value = false
  currentMemo.value = null
}

const openEditor = (memo: Memo) => {
  editorMemo.value = memo
  showEditorModal.value = true
}

const closeEditorModal = () => {
  showEditorModal.value = false
  editorMemo.value = null
}

const handleSaveEditor = async (data: UpdateMemoRequest) => {
  if (!editorMemo.value) return

  await $api(`/memos/${editorMemo.value.id}`, {
    method: 'put',
    body: data
  })

  await pagination.execute()
  closeEditorModal()
}

const handleSaveMeta = async (data: UpdateMemoRequest) => {
  if (!currentMemo.value) return

  await $api(`/memos/${currentMemo.value.id}`, {
    method: 'put',
    body: data
  })

  await pagination.execute()
  showMetaModal.value = false
  currentMemo.value = null
}

const openDeleteConfirm = (memo: Memo) => {
  memoToDelete.value = memo
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  memoToDelete.value = null
}

const confirmDelete = async (close?: () => void) => {
  if (!memoToDelete.value) return

  isDeleting.value = true
  await $api(`/memos/${memoToDelete.value.id}`, { method: 'delete' })

  await pagination.execute()
  close?.()
  showDeleteModal.value = false
  memoToDelete.value = null
  isDeleting.value = false
}
</script>
