<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between px-4 py-3">
      <span class="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        My Tags
      </span>
      <u-dropdown-menu :items="headerMenuItems">
        <u-button
          icon="i-heroicons-plus"
          size="xs"
          variant="ghost"
        />
      </u-dropdown-menu>
    </div>

    <div
      v-if="pending"
      class="flex items-center justify-center py-8"
    >
      <u-icon
        name="i-heroicons-arrow-path"
        class="animate-spin text-neutral-400"
      />
    </div>

    <div
      v-else-if="!tags || tags.length === 0"
      class="flex flex-col items-center justify-center py-16"
    >
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        No tags yet
      </p>
    </div>

    <nav
      v-else
      class="flex flex-col gap-1 px-2 py-1"
    >
      <template
        v-for="tag in tags"
        :key="tag.id"
      >
        <u-context-menu
          :items="getContextMenuItems(tag)"
          class="hidden lg:block"
        >
          <u-link
            :to="getTagLink(tag.id)"
            class="flex items-center gap-2 px-2 py-2 rounded-md transition-all duration-200 ease-in-out text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            :class="{ 'bg-primary-50 text-primary-600 shadow-sm dark:bg-primary-500/20 dark:text-primary-300': isSelected(tag.id) }"
          >
            <span
              v-if="tag.color"
              class="size-2 rounded-full flex-shrink-0"
              :style="{ backgroundColor: tag.color }"
            />
            <span class="flex-1 truncate">{{ tag.name }}</span>
            <span class="text-xs text-neutral-400/50 flex-shrink-0">0</span>
          </u-link>
        </u-context-menu>

        <u-dropdown-menu
          :items="getContextMenuItems(tag)"
          :content="{ align: 'end' }"
          class="lg:hidden"
        >
          <u-link
            :to="getTagLink(tag.id)"
            class="flex items-center justify-between gap-2 px-2 py-2 rounded-md transition-all duration-200 ease-in-out text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <div class="flex items-center gap-2">
              <span
                v-if="tag.color"
                class="size-2 rounded-full flex-shrink-0"
                :style="{ backgroundColor: tag.color }"
              />
              <span class="flex-1 truncate">{{ tag.name }}</span>
              <span class="text-xs text-neutral-400/50 flex-shrink-0">0</span>
            </div>
            <u-icon
              name="i-heroicons-ellipsis-vertical"
              class="text-neutral-400/50 flex-shrink-0"
            />
          </u-link>
        </u-dropdown-menu>
      </template>
    </nav>

    <u-modal
      v-model:open="showModal"
      :title="isEditing ? 'Edit Tag' : 'Add Tag'"
    >
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Tag Name <span class="text-error-500">*</span>
            </label>
            <u-input
              v-model="tagForm.name"
              placeholder="Enter tag name"
              autofocus
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Tag Color
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model="tagForm.color"
                type="color"
                class="size-10 rounded cursor-pointer border border-neutral-200 dark:border-neutral-600"
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
          label="Cancel"
          color="neutral"
          variant="outline"
          @click="close"
        />
        <u-button
          :label="isEditing ? 'Save' : 'Create'"
          :loading="isSubmitting"
          :disabled="!tagForm.name.trim()"
          color="primary"
          @click="isEditing ? handleUpdateTag(close) : handleCreateTag(close)"
        />
      </template>
    </u-modal>

    <u-modal
      v-model:open="showDeleteConfirm"
      title="Confirm Delete"
    >
      <template #body>
        <div class="text-center space-y-4">
          <div class="flex justify-center">
            <div class="size-16 rounded-full bg-error-50 dark:bg-error-900/20 flex items-center justify-center">
              <u-icon
                name="i-heroicons-exclamation-triangle"
                class="size-8 text-error-500"
              />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Are you sure you want to delete this tag?
            </h3>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Tag name: <strong>{{ contextTag?.name }}</strong>
            </p>
          </div>
        </div>
      </template>
      <template #footer="{ close }">
        <u-button
          label="Cancel"
          color="neutral"
          variant="outline"
          @click="close"
        />
        <u-button
          label="Delete"
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
import { tagsApi } from '~/api/tags'
import type { Tag, CreateTagRequest, UpdateTagRequest } from '~/api/types'
import type { DropdownMenuItem, ContextMenuItem } from '@nuxt/ui'
import { useTags } from '~/composables/useTags'

defineProps<{
  tags: Tag[]
  pending?: boolean
}>()

const emit = defineEmits<{
  'refresh-tags': []
}>()

const { isSelected } = useTags()

const showModal = ref(false)
const isEditing = ref(false)
const showDeleteConfirm = ref(false)
const contextTag = ref<Tag | null>(null)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const tagForm = ref<{ name: string, color: string }>({ name: '', color: '' })

const headerMenuItems: DropdownMenuItem[][] = [[
  {
    label: 'Add Tag',
    icon: 'i-heroicons-plus',
    onSelect: () => openAddModal()
  }
]]

const getContextMenuItems = (tag: Tag): ContextMenuItem[][] => [[
  {
    label: 'Edit',
    icon: 'i-heroicons-pencil',
    onSelect: () => openEditModal(tag)
  },
  {
    label: 'Delete',
    icon: 'i-heroicons-trash',
    color: 'error',
    onSelect: () => openDeleteConfirm(tag)
  }
]]

const getTagLink = (tagId: number) => {
  const currentPath = useRoute().path
  if (currentPath === '/workspace/bookmarks' || currentPath === '/workspace/memos') {
    return `${currentPath}?tag=${tagId}`
  }
  return `/workspace/bookmarks?tag=${tagId}`
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
    await tagsApi.create(data)
    emit('refresh-tags')
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
    await tagsApi.update(contextTag.value.id, data)
    emit('refresh-tags')
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
    await tagsApi.delete(deletedTagId)
    emit('refresh-tags')
    close?.()
    showDeleteConfirm.value = false
    contextTag.value = null
  } finally {
    isDeleting.value = false
  }
}
</script>
