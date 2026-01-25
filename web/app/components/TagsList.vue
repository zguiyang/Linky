<template>
  <u-card
    :class="$attrs.class"
    class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
  >
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
        我的标签
      </h3>
      <u-button
        icon="i-heroicons-plus"
        size="sm"
        variant="ghost"
        color="neutral"
        @click="openAddModal"
      />
    </div>

    <div class="p-4">
      <div
        v-if="pendingValue"
        class="flex items-center justify-center py-8"
      >
        <u-icon
          name="i-heroicons-arrow-path"
          class="w-5 h-5 animate-spin text-gray-400"
        />
      </div>

      <div
        v-else-if="!tagsList || tagsList.length === 0"
        class="text-center py-8"
      >
        <u-icon
          name="i-heroicons-tag"
          class="w-12 h-12 text-gray-300 dark:text-gray-600"
        />
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          暂无标签
        </p>
      </div>

      <div
        v-else
        class="flex flex-wrap gap-2"
      >
        <template v-if="isMobile">
          <div
            v-for="tag in tagsList"
            :key="tag.id"
            class="flex items-center gap-1"
          >
            <u-button
              :color="selectedTagsList.includes(tag.id) ? 'primary' : 'neutral'"
              variant="soft"
              size="sm"
              @click="toggleTag(tag.id)"
            >
              <template
                v-if="tag.color"
                #leading
              >
                <span
                  class="w-2 h-2 rounded-full inline-block"
                  :style="{ backgroundColor: tag.color }"
                />
              </template>
              {{ tag.name }}
            </u-button>

            <u-dropdown-menu :items="getTagMenuItems(tag)">
              <u-button
                icon="i-heroicons-ellipsis-horizontal"
                color="neutral"
                variant="ghost"
                size="sm"
              />
            </u-dropdown-menu>
          </div>
        </template>

        <template v-else>
          <u-context-menu
            v-for="tag in tagsList"
            :key="tag.id"
            :items="getTagMenuItems(tag)"
          >
            <u-button
              :color="selectedTagsList.includes(tag.id) ? 'primary' : 'neutral'"
              variant="soft"
              size="sm"
              @click="toggleTag(tag.id)"
            >
              <template
                v-if="tag.color"
                #leading
              >
                <span
                  class="w-2 h-2 rounded-full inline-block"
                  :style="{ backgroundColor: tag.color }"
                />
              </template>
              {{ tag.name }}
            </u-button>
          </u-context-menu>
        </template>
      </div>
    </div>
  </u-card>

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
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { ContextMenuItem } from '@nuxt/ui'
import { tagsApi } from '~/api/tags'
import type { Tag, CreateTagRequest, UpdateTagRequest } from '~/api/types'

const props = defineProps<{
  tags: Tag[]
  selectedTags: number[]
}>()

const emit = defineEmits<{
  'update:selectedTags': [selectedTags: number[]]
  'refresh-tags': []
}>()

const showTagModal = ref(false)
const isEditMode = ref(false)
const showDeleteConfirm = ref(false)

const tagForm = ref<{ name: string, color: string }>({ name: '', color: '' })
const contextTag = ref<Tag | null>(null)

const isSubmitting = ref(false)
const isDeleting = ref(false)
const isMobile = ref(false)

const tagsList = computed(() => props.tags)
const selectedTagsList = computed(() => props.selectedTags)

const pendingValue = computed(() => false)

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

const getTagMenuItems = (tag: Tag): ContextMenuItem[][] => {
  return [
    [
      {
        label: '编辑',
        icon: 'i-heroicons-pencil',
        onSelect: () => openEditModal(tag)
      },
      {
        label: '删除',
        icon: 'i-heroicons-trash',
        color: 'error',
        onSelect: () => openDeleteConfirm(tag)
      }
    ]
  ]
}

const toggleTag = (tagId: number) => {
  const index = selectedTagsList.value.indexOf(tagId)
  if (index > -1) {
    selectedTagsList.value.splice(index, 1)
  } else {
    selectedTagsList.value.push(tagId)
  }
  emit('update:selectedTags', selectedTagsList.value)
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
    await tagsApi.update(contextTag.value.id, data)
    emit('refresh-tags')

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

  const deletedTagId = contextTag.value.id

  try {
    isDeleting.value = true
    await tagsApi.delete(deletedTagId)
    const newSelectedTags = selectedTagsList.value.filter(id => id !== deletedTagId)
    emit('update:selectedTags', newSelectedTags)
    emit('refresh-tags')

    close?.()
    showDeleteConfirm.value = false
    contextTag.value = null
  } finally {
    isDeleting.value = false
  }
}
</script>
