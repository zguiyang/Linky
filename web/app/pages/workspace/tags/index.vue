<template>
  <div class="flex flex-col gap-6 h-full min-h-0 p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          标签管理
        </h1>
        <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          管理您的所有标签
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <u-button
          icon="i-heroicons-plus"
          color="primary"
          @click="openAddModal"
        >
          新增标签
        </u-button>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <u-input
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="搜索标签..."
        class="flex-1"
      />
      <u-select
        v-model="sortOption"
        :items="sortOptions"
        placeholder="排序方式"
        class="w-48"
      />
      <u-button
        :color="batchMode ? 'primary' : 'neutral'"
        variant="outline"
        icon="i-heroicons-check-circle"
        @click="toggleBatchMode"
      >
        批量操作
      </u-button>
    </div>

    <div
      v-if="tagsStore.pending"
      class="flex items-center justify-center py-16"
    >
      <u-icon
        name="i-heroicons-arrow-path"
        class="animate-spin text-gray-400"
      />
    </div>

    <div
      v-else-if="!tagsStore.tags || tagsStore.tags.length === 0"
      class="flex flex-col items-center justify-center"
    >
      <div class="flex flex-col items-center justify-center py-16">
        <u-icon
          name="i-heroicons-tag"
          class="w-20 h-20 text-gray-300 dark:text-gray-600"
        />
        <p class="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mt-6">
          {{ searchQuery ? '未找到匹配的标签' : '暂无标签' }}
        </p>
        <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
          {{ searchQuery ? '尝试其他搜索关键词' : '创建您的第一个标签吧' }}
        </p>
      </div>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div
        v-for="tag in tagsStore.tags"
        :key="tag.id"
      >
        <u-card
          class="hover:shadow-md transition-shadow duration-200"
          :class="{
            'cursor-pointer': !batchMode
          }"
          @click="navigateToTagDetail(tag.id)"
        >
          <div class="flex flex-col gap-3">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span
                    v-if="tag.color"
                    class="w-3 h-3 rounded-full shrink-0"
                    :style="{ backgroundColor: tag.color }"
                  />
                  <span class="font-medium text-neutral-900 dark:text-neutral-50 text-base">{{ tag.name }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm text-neutral-500 dark:text-neutral-400">关联内容</span>
                  <span class="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium">
                    {{ tag.bookmarksCount + tag.memosCount }}
                  </span>
                </div>
              </div>
              <u-checkbox
                v-if="batchMode"
                :model-value="selectedTagsForBatch.includes(tag.id)"
                class="ml-2"
                @change="toggleBatchSelection(tag.id)"
                @click.stop
              />
            </div>
            <div class="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-700">
              <u-button
                icon="i-heroicons-pencil"
                size="xs"
                variant="ghost"
                color="neutral"
                :disabled="batchMode"
                @click.stop="openEditModal(tag)"
              />
              <u-button
                icon="i-heroicons-trash"
                size="xs"
                variant="ghost"
                color="error"
                :disabled="batchMode"
                @click.stop="openDeleteConfirm(tag)"
              />
            </div>
          </div>
        </u-card>
      </div>
    </div>

    <div
      v-if="batchMode && selectedTagsForBatch.length > 0"
      class="sticky bottom-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-10"
    >
      <div class="flex items-center gap-2">
        <u-checkbox
          :model-value="isAllSelected"
          :indeterminate="selectedTagsForBatch.length > 0 && !isAllSelected"
          @change="toggleSelectAll"
        />
        <span class="text-sm text-gray-500">
          已选择 {{ selectedTagsForBatch.length }} 个标签
        </span>
        <div class="flex-1" />
        <u-button
          label="批量删除"
          color="error"
          icon="i-heroicons-trash"
          @click="openBatchDelete"
        />
        <u-button
          label="取消"
          variant="ghost"
          @click="clearBatchSelection"
        />
      </div>
    </div>

    <u-modal
      v-model:open="showModal"
      :title="isEditing ? '编辑标签' : '新增标签'"
    >
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              标签名称 <span class="text-red-500">*</span>
            </label>
            <u-input
              v-model="tagForm.name"
              placeholder="输入标签名称"
              autofocus
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
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
          :label="isEditing ? '保存' : '创建'"
          :loading="isSubmitting"
          :disabled="!tagForm.name.trim()"
          color="primary"
          @click="isEditing ? handleUpdateTag(close) : handleCreateTag(close)"
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
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              确定要删除这个标签吗？
            </h3>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
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

    <u-modal
      v-model:open="showBatchDeleteConfirm"
      title="确认批量删除"
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
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              确定要删除这 {{ selectedTagsForBatch.length }} 个标签吗？
            </h3>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              此操作无法撤销
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
          @click="handleBatchDelete(close)"
        />
      </template>
    </u-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Tag } from '~/api/types'
import { useTagsStore } from '~/stores/tags'

definePageMeta({ layout: 'workspace' })

const tagsStore = useTagsStore()

onMounted(() => {
  tagsStore.fetchTags()
})

const searchQuery = ref('')
const sortOption = ref('usage-desc')

const sortOptions = [
  { label: '使用频率（高到低）', value: 'usage-desc' },
  { label: '使用频率（低到高）', value: 'usage-asc' },
  { label: '名称（A-Z）', value: 'name-asc' },
  { label: '名称（Z-A）', value: 'name-desc' }
]

const batchMode = ref(false)
const selectedTagsForBatch = ref<number[]>([])

const toggleBatchMode = () => {
  batchMode.value = !batchMode.value
  selectedTagsForBatch.value = []
}

const toggleBatchSelection = (tagId: number) => {
  const index = selectedTagsForBatch.value.indexOf(tagId)
  if (index > -1) {
    selectedTagsForBatch.value.splice(index, 1)
  } else {
    selectedTagsForBatch.value.push(tagId)
  }
}

const clearBatchSelection = () => {
  selectedTagsForBatch.value = []
}

const isAllSelected = computed(() =>
  tagsStore.tags.length > 0
  && selectedTagsForBatch.value.length === tagsStore.tags.length
)

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedTagsForBatch.value = []
  } else {
    selectedTagsForBatch.value = tagsStore.tags.map(t => t.id)
  }
}

const showModal = ref(false)
const isEditing = ref(false)
const showDeleteConfirm = ref(false)
const showBatchDeleteConfirm = ref(false)
const contextTag = ref<Tag | null>(null)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const tagForm = ref<{ name: string, color: string }>({ name: '', color: '' })

const navigateToTagDetail = (tagId: number) => {
  if (!batchMode.value) {
    navigateTo(`/workspace/bookmarks?tag=${tagId}`)
  }
}

const openAddModal = () => {
  isEditing.value = false
  tagForm.value = { name: '', color: '' }
  contextTag.value = null
  showModal.value = true
}

const openEditModal = (tag: Tag) => {
  isEditing.value = true
  tagForm.value = { name: tag.name, color: tag.color || '' }
  contextTag.value = tag
  showModal.value = true
}

const openDeleteConfirm = (tag: Tag) => {
  contextTag.value = tag
  showDeleteConfirm.value = true
}

const openBatchDelete = () => {
  showBatchDeleteConfirm.value = true
}

const handleCreateTag = async (close?: () => void) => {
  if (!tagForm.value.name.trim()) {
    return
  }

  isSubmitting.value = true

  await tagsStore.createTag({ name: tagForm.value.name.trim(), color: tagForm.value.color || undefined })

  close?.()
  showModal.value = false
  tagForm.value = { name: '', color: '' }
  isSubmitting.value = false
}

const handleUpdateTag = async (close?: () => void) => {
  if (!contextTag.value || !tagForm.value.name.trim()) {
    return
  }

  isSubmitting.value = true
  await tagsStore.updateTag(contextTag.value!.id, { name: tagForm.value.name.trim(), color: tagForm.value.color || undefined })

  close?.()
  showModal.value = false
  tagForm.value = { name: '', color: '' }
  contextTag.value = null
  isSubmitting.value = false
}

const handleDeleteTag = async (close?: () => void) => {
  if (!contextTag.value) return

  isDeleting.value = true
  await tagsStore.deleteTag(contextTag.value.id)

  close?.()
  showDeleteConfirm.value = false
  contextTag.value = null
  isDeleting.value = false
}

const handleBatchDelete = async (close?: () => void) => {
  isDeleting.value = true
  await tagsStore.batchDelete(selectedTagsForBatch.value)

  selectedTagsForBatch.value = []
  batchMode.value = false
  close?.()
  showBatchDeleteConfirm.value = false
  isDeleting.value = false
}
</script>
