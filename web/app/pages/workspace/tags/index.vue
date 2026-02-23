<template>
  <div class="flex flex-col gap-4 h-full min-h-0">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
      <div>
        <h1 class="text-xl md:text-2xl font-bold text-(--text-primary)">
          标签管理
        </h1>
        <p class="text-sm text-(--text-secondary) mt-1">
          共 {{ tags?.length || 0 }} 个标签
        </p>
      </div>

      <div class="flex items-center gap-2 sm:gap-3">
        <u-button
          :color="batchMode ? 'primary' : 'neutral'"
          variant="ghost"
          icon="i-heroicons-check-circle"
          class="min-h-11"
          @click="toggleBatchMode"
        >
          <span class="hidden sm:inline">批量操作</span>
        </u-button>
        <u-button
          icon="i-heroicons-plus"
          color="primary"
          @click="openAddModal"
        >
          <span class="hidden sm:inline">新增标签</span>
          <span class="sm:hidden">新增</span>
        </u-button>
      </div>
    </div>

    <!-- 空状态 -->
    <div
      v-if="!pending && (!tags || tags.length === 0)"
      class="flex flex-col items-center justify-center py-20 bg-(--bg-surface) rounded-2xl border border-dashed border-(--border-subtle)"
    >
      <u-icon
        name="i-heroicons-tag"
        class="w-12 h-12 text-(--text-secondary)"
      />
      <p class="text-(--text-secondary) mt-4">
        暂无标签，创建您的第一个标签吧
      </p>
    </div>

    <!-- 标签列表 -->
    <div
      v-if="!pending && tags && tags.length > 0"
      class="flex flex-col gap-8"
    >
      <!-- 用户标签 -->
      <div v-if="userTags.length > 0">
        <div class="flex items-center gap-2 mb-4">
          <u-icon
            name="i-heroicons-user"
            class="w-5 h-5 text-neutral-500"
          />
          <h2 class="text-sm font-semibold text-neutral-900 dark:text-neutral-50 uppercase tracking-wider">
            用户创建
          </h2>
          <span class="text-xs text-neutral-400 font-normal">({{ userTags.length }})</span>
        </div>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="tag in userTags"
            :key="tag.id"
            class="group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-primary-500 transition-colors duration-200"
            :class="{
              'cursor-pointer': !batchMode,
              'border-primary-500 ring-1 ring-primary-500': batchMode && selectedTagsForBatch.includes(tag.id)
            }"
            @click="navigateToTagDetail(tag.id)"
          >
            <u-checkbox
              v-if="batchMode"
              :model-value="selectedTagsForBatch.includes(tag.id)"
              size="sm"
              @change="toggleBatchSelection(tag.id)"
              @click.stop
            />

            <span
              v-if="tag.color"
              class="w-2 h-2 rounded-full"
              :style="{ backgroundColor: tag.color }"
            />

            <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {{ tag.name }}
            </span>

            <span class="text-xs text-neutral-400 dark:text-neutral-500 ml-1">
              {{ tag.bookmarksCount + tag.memosCount }}
            </span>

            <div
              v-if="!batchMode"
              class="flex items-center gap-0.5 ml-1 transition-opacity"
            >
              <u-button
                icon="i-heroicons-pencil"
                size="xs"
                variant="ghost"
                color="neutral"
                class="p-1! h-6 w-6"
                @click.stop="openEditModal(tag)"
              />
              <u-button
                icon="i-heroicons-trash"
                size="xs"
                variant="ghost"
                color="error"
                class="p-1! h-6 w-6"
                @click.stop="openDeleteConfirm(tag)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- AI 生成标签 -->
      <div v-if="aiTags.length > 0">
        <div class="flex items-center gap-2 mb-4">
          <u-icon
            name="i-heroicons-sparkles"
            class="w-5 h-5 text-primary-500"
          />
          <h2 class="text-sm font-semibold text-neutral-900 dark:text-neutral-50 uppercase tracking-wider">
            AI 自动生成
          </h2>
          <span class="text-xs text-neutral-400 font-normal">({{ aiTags.length }})</span>
        </div>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="tag in aiTags"
            :key="tag.id"
            class="group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-primary-500 transition-colors duration-200"
            :class="{
              'cursor-pointer': !batchMode,
              'border-primary-500 ring-1 ring-primary-500': batchMode && selectedTagsForBatch.includes(tag.id)
            }"
            @click="navigateToTagDetail(tag.id)"
          >
            <u-checkbox
              v-if="batchMode"
              :model-value="selectedTagsForBatch.includes(tag.id)"
              size="sm"
              @change="toggleBatchSelection(tag.id)"
              @click.stop
            />

            <span
              v-if="tag.color"
              class="w-2 h-2 rounded-full"
              :style="{ backgroundColor: tag.color }"
            />

            <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {{ tag.name }}
            </span>

            <span class="text-xs text-neutral-400 dark:text-neutral-500 ml-1">
              {{ tag.bookmarksCount + tag.memosCount }}
            </span>

            <div
              v-if="!batchMode"
              class="flex items-center gap-0.5 ml-1 transition-opacity"
            >
              <u-button
                icon="i-heroicons-pencil"
                size="xs"
                variant="ghost"
                color="neutral"
                class="p-1! h-6 w-6"
                @click.stop="openEditModal(tag)"
              />
              <u-button
                icon="i-heroicons-trash"
                size="xs"
                variant="ghost"
                color="error"
                class="p-1! h-6 w-6"
                @click.stop="openDeleteConfirm(tag)"
              />
            </div>
          </div>
        </div>
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
        <u-form
          :state="tagForm"
          class="space-y-4"
          @submit="isEditing ? handleUpdateTag(() => showModal = false) : handleCreateTag(() => showModal = false)"
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
                class="w-10 h-10 rounded cursor-pointer border border-gray-200 dark:border-gray-600"
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
            :label="isEditing ? '保存' : '创建'"
            :loading="isSubmitting"
            :disabled="!tagForm.name.trim()"
            color="primary"
            @click="isEditing ? handleUpdateTag(close) : handleCreateTag(close)"
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
            @click="handleBatchDelete(close)"
          />
        </div>
      </template>
    </u-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Tag } from '~/api/types'
import { useTagsStore } from '~/stores/tags'

definePageMeta({ layout: 'workspace' })

const tagsStore = useTagsStore()

const { data: tags, pending } = await useAsyncData(
  'tags',
  () => tagsStore.fetchTags(),
  { default: () => [] as Tag[] }
)

const userTags = computed(() => (tags.value || []).filter(tag => !tag.isAiGenerated))
const aiTags = computed(() => (tags.value || []).filter(tag => tag.isAiGenerated))

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
  (tags.value || []).length > 0
  && selectedTagsForBatch.value.length === (tags.value || []).length
)

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedTagsForBatch.value = []
  } else {
    selectedTagsForBatch.value = (tags.value || []).map(t => t.id)
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
    navigateTo(`/workspace/tags/${tagId}`)
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
