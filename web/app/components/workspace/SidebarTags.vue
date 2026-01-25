<template>
  <div class="sidebar-tags">
    <div class="section-header">
      <span class="section-title">My Tags</span>
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
      class="loading"
    >
      <u-icon
        name="i-heroicons-arrow-path"
        class="animate-spin text-gray-400"
      />
    </div>

    <div
      v-else-if="!tags || tags.length === 0"
      class="empty"
    >
      <p class="text-sm text-gray-500 dark:text-gray-400">
        No tags yet
      </p>
    </div>

    <nav
      v-else
      class="tag-list"
    >
      <template
        v-for="tag in tags"
        :key="tag.id"
      >
        <u-context-menu
          v-if="!isMobile"
          :items="getContextMenuItems(tag)"
        >
          <u-link
            :to="getTagLink(tag.id)"
            class="tag-item"
            :class="{ active: isSelected(tag.id) }"
          >
            <span
              v-if="tag.color"
              class="color-dot"
              :style="{ backgroundColor: tag.color }"
            />
            <span class="tag-name">{{ tag.name }}</span>
            <span class="tag-count">0</span>
          </u-link>
        </u-context-menu>

        <u-dropdown-menu
          v-else
          :items="getContextMenuItems(tag)"
          :content="{ align: 'end' }"
        >
          <u-link
            :to="getTagLink(tag.id)"
            class="tag-item mobile"
          >
            <span
              v-if="tag.color"
              class="color-dot"
              :style="{ backgroundColor: tag.color }"
            />
            <span class="tag-name">{{ tag.name }}</span>
            <span class="tag-count">0</span>
            <u-icon
              name="i-heroicons-ellipsis-vertical"
              class="tag-menu-icon"
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
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Tag Name <span class="text-red-500">*</span>
            </label>
            <u-input
              v-model="tagForm.name"
              placeholder="Enter tag name"
              autofocus
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Tag Color
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
            <div class="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <u-icon
                name="i-heroicons-exclamation-triangle"
                class="w-8 h-8 text-red-500"
              />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Are you sure you want to delete this tag?
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
import { ref, onMounted, onUnmounted } from 'vue'
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

const isMobile = ref(false)
const showModal = ref(false)
const isEditing = ref(false)
const showDeleteConfirm = ref(false)
const contextTag = ref<Tag | null>(null)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const tagForm = ref<{ name: string, color: string }>({ name: '', color: '' })

onMounted(() => {
  isMobile.value = window.innerWidth < 1024
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 1024
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    isMobile.value = window.innerWidth < 1024
  })
})

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

<style scoped>
.sidebar-tags {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgb(107 114 128 / 0.39);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.tag-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.tag-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition-property: background-color, color, transform, box-shadow;
  transition-duration: 200ms;
  color: rgb(55 65 81 / 0.7);
}

.tag-item.mobile {
  justify-content: space-between;
}

.tag-item.active {
  background-color: rgb(239 246 255 / 0.95);
  color: rgb(79 70 229 / 1);
}

.color-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  flex-shrink: 0;
}

.tag-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tag-count {
  font-size: 0.75rem;
  color: rgb(156  163 175 / 0.5);
  flex-shrink: 0;
}

.tag-menu-icon {
  flex-shrink: 0;
  color: rgb(156  163 175 / 0.5);
}
</style>
