<template>
  <div class="flex flex-col gap-6 h-full min-h-0 p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          标签管理
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          管理您的所有标签
        </p>
      </div>
      <u-button
        icon="i-heroicons-plus"
        color="primary"
        @click="openAddModal"
      >
        新增标签
      </u-button>
    </div>

    <div
      v-if="pending"
      class="flex items-center justify-center py-16"
    >
      <u-icon
        name="i-heroicons-arrow-path"
        class="animate-spin text-gray-400"
      />
    </div>

    <div
      v-else-if="!tags || tags.length === 0"
      class="flex flex-col items-center justify-center"
    >
      <div class="flex flex-col items-center justify-center py-16">
        <u-icon
          name="i-heroicons-tag"
          class="w-20 h-20 text-gray-300 dark:text-gray-600"
        />
        <p class="text-lg font-semibold text-gray-900 dark:text-white mt-6">
          暂无标签
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          创建您的第一个标签吧
        </p>
      </div>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <u-card
        v-for="tag in tags"
        :key="tag.id"
        class="hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex flex-col gap-3">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span
                v-if="tag.color"
                class="w-3 h-3 rounded-full shrink-0"
                :style="{ backgroundColor: tag.color }"
              />
              <span class="font-medium text-gray-900 dark:text-white text-base">{{ tag.name }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500 dark:text-gray-400">关联书签</span>
              <span class="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium">0</span>
            </div>
          </div>
          <div class="flex items-center gap-2 border-t border-gray-200 dark:border-gray-700 pt-3">
            <u-button
              icon="i-heroicons-pencil"
              size="sm"
              variant="ghost"
              @click="openEditModal(tag)"
            />
            <u-button
              icon="i-heroicons-trash"
              size="sm"
              variant="ghost"
              color="error"
              @click="openDeleteConfirm(tag)"
            />
          </div>
        </div>
      </u-card>
    </div>

    <u-modal
      v-model:open="showModal"
      :title="isEditing ? '编辑标签' : '新增标签'"
    >
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              标签名称 <span class="text-red-500">*</span>
            </label>
            <u-input
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Tag, CreateTagRequest, UpdateTagRequest } from '~/api/types'
import { useTags } from '~/composables/useTags'

definePageMeta({ layout: 'workspace' })

const { tags, pending, createTag, updateTag, deleteTag, fetchTags } = useTags()
await fetchTags()

const showModal = ref(false)
const isEditing = ref(false)
const showDeleteConfirm = ref(false)
const contextTag = ref<Tag | null>(null)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const tagForm = ref<{ name: string, color: string }>({ name: '', color: '' })

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
    await createTag(data)
    close?.()
    showModal.value = false
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
    await updateTag(contextTag.value.id, data)
    close?.()
    showModal.value = false
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

  const deletedTagId = contextTag.value.id

  try {
    isDeleting.value = true
    await deleteTag(deletedTagId)
    close?.()
    showDeleteConfirm.value = false
    contextTag.value = null
  } finally {
    isDeleting.value = false
  }
}
</script>
