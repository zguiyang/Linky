<template>
  <div class="flex flex-col gap-2">
    <div
      class="flex items-center justify-between px-3 py-2.5 cursor-pointer rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]"
      @click="toggleExpand"
    >
      <span class="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
        我的标签
      </span>
      <div class="flex items-center gap-1">
        <u-dropdown-menu
          :items="headerMenuItems"
          @click.stop
        >
          <u-button
            icon="i-heroicons-plus"
            size="xs"
            variant="ghost"
            color="neutral"
            class="hover:bg-[var(--bg-tertiary)]"
          />
        </u-dropdown-menu>
        <u-icon
          :name="isExpanded ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-up'"
          class="text-[var(--text-secondary)] transition-transform duration-200"
        />
      </div>
    </div>

    <div
      v-if="!tagsStore.tags || tagsStore.tags.length === 0"
      class="flex flex-col items-center justify-center py-8"
    >
      <p class="text-sm text-[var(--text-secondary)]">
        暂无标签
      </p>
    </div>

    <nav
      v-show="tagsStore.tags && tagsStore.tags.length > 0"
      class="flex flex-col gap-1.5 px-1 py-1 overflow-hidden transition-all duration-300 ease-in-out"
      :class="{
        'max-h-0 opacity-0': !isExpanded,
        'max-h-[1000px] opacity-100': isExpanded
      }"
    >
      <template
        v-for="tag in tagsStore.tags"
        :key="tag.id"
      >
        <u-context-menu
          :items="getContextMenuItems(tag)"
          class="hidden lg:block"
        >
          <u-link
            :to="getTagLink(tag.id)"
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 whitespace-nowrap"
            :class="{
              'bg-[var(--bg-tertiary)] border-primary/30 text-primary': tagsStore.isSelected(tag.id),
              'bg-transparent border-transparent hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]': !tagsStore.isSelected(tag.id)
            }"
          >
            <div class="inline-flex items-center gap-1 pr-2">
              <span
                v-if="tag.color"
                class="shrink-0 font-medium text-sm"
                :style="{ color: tag.color }"
              >#</span>
              <span class="text-sm">{{ tag.name }}</span>
            </div>
            <span class="text-xs text-[var(--text-secondary)]/60 ml-auto">
              {{ tag.bookmarksCount + tag.memosCount }}
            </span>
          </u-link>
        </u-context-menu>

        <u-dropdown-menu
          :items="getContextMenuItems(tag)"
          :content="{ align: 'end' }"
          class="lg:hidden"
        >
          <u-link
            :to="getTagLink(tag.id)"
            class="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg border transition-all duration-200 whitespace-nowrap"
            :class="{
              'bg-[var(--bg-tertiary)] border-primary/30 text-primary': tagsStore.isSelected(tag.id),
              'bg-transparent border-transparent hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]': !tagsStore.isSelected(tag.id)
            }"
          >
            <div class="flex items-center gap-1">
              <span
                v-if="tag.color"
                class="shrink-0 font-medium text-sm"
                :style="{ color: tag.color }"
              >#</span>
              <span class="text-sm">{{ tag.name }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-[var(--text-secondary)]/60">
                {{ tag.bookmarksCount + tag.memosCount }}
              </span>
              <u-icon
                name="i-heroicons-ellipsis-vertical"
                class="text-[var(--text-secondary)]/60 flex-shrink-0"
              />
            </div>
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
            <label class="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Tag Name <span class="text-error">*</span>
            </label>
            <u-input
              v-model="tagForm.name"
              placeholder="Enter tag name"
              autofocus
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Tag Color
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model="tagForm.color"
                type="color"
                class="size-10 rounded cursor-pointer border border-[var(--border-subtle)]"
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
                class="size-8 text-error"
              />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-[var(--text-primary)]">
              Are you sure you want to delete this tag?
            </h3>
            <p class="text-sm text-[var(--text-secondary)] mt-1">
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
import { ref, onMounted } from 'vue'
import type { Tag, CreateTagRequest, UpdateTagRequest } from '~/api/types'
import type { DropdownMenuItem, ContextMenuItem } from '@nuxt/ui'
import { useTagsStore } from '~/stores/tags'

const tagsStore = useTagsStore()

onMounted(() => {
  tagsStore.fetchTags()
})

const showModal = ref(false)
const isEditing = ref(false)
const showDeleteConfirm = ref(false)
const contextTag = ref<Tag | null>(null)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const tagForm = ref<{ name: string, color: string }>({ name: '', color: '' })
const isExpanded = ref(true)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

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
    await tagsStore.createTag(data)
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
    await tagsStore.updateTag(contextTag.value.id, data)
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

  try {
    isDeleting.value = true
    await tagsStore.deleteTag(contextTag.value.id)
    close?.()
    showDeleteConfirm.value = false
    contextTag.value = null
  } finally {
    isDeleting.value = false
  }
}
</script>
