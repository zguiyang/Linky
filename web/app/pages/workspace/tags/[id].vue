<template>
  <div class="flex flex-col gap-6 h-full min-h-0 p-6">
    <u-card v-if="tag">
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-4">
          <div
            v-if="tag.color"
            class="w-12 h-12 rounded-full flex items-center justify-center"
            :style="{ backgroundColor: tag.color }"
          >
            <u-icon
              name="i-heroicons-tag"
              class="w-6 h-6 text-white"
            />
          </div>
          <div
            v-else
            class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
          >
            <u-icon
              name="i-heroicons-tag"
              class="w-6 h-6 text-gray-500"
            />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ tag.name }}
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ tag.bookmarksCount }} 个书签 · {{ tag.memosCount }} 个备忘录
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <u-button
            icon="i-heroicons-pencil"
            variant="ghost"
            @click="openEditModal"
          >
            编辑
          </u-button>
          <u-button
            icon="i-heroicons-trash"
            variant="ghost"
            color="error"
            @click="openDeleteConfirm"
          >
            删除
          </u-button>
        </div>
      </div>
    </u-card>

    <u-tabs v-model="activeTab">
      <u-tab
        value="bookmarks"
        label="书签"
      />
      <u-tab
        value="memos"
        label="备忘录"
      />
      <u-tab
        value="related"
        label="关联标签"
      />
    </u-tabs>

    <div
      v-if="activeTab === 'bookmarks'"
      class="flex-1 min-h-0"
    >
      <div
        v-if="loadingBookmarks"
        class="flex justify-center py-16"
      >
        <u-icon
          name="i-heroicons-arrow-path"
          class="w-8 h-8 animate-spin text-gray-400"
        />
      </div>
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <bookmark-card
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          :bookmark="bookmark"
          view-mode="grid"
        />
        <div
          v-if="bookmarks.length === 0"
          class="col-span-full flex flex-col items-center justify-center py-16 text-gray-500"
        >
          <u-icon
            name="i-heroicons-bookmark"
            class="w-16 h-16 text-gray-300 dark:text-gray-600"
          />
          <p>
            该标签下暂无书签
          </p>
        </div>
      </div>
    </div>

    <div
      v-else-if="activeTab === 'memos'"
      class="flex-1 min-h-0"
    >
      <div
        v-if="loadingMemos"
        class="flex justify-center py-16"
      >
        <u-icon
          name="i-heroicons-arrow-path"
          class="w-8 h-8 animate-spin text-gray-400"
        />
      </div>
      <div
        v-else
        class="flex flex-col gap-3"
      >
        <memo-card
          v-for="memo in memos"
          :key="memo.id"
          :memo="memo"
        />
        <div
          v-if="memos.length === 0"
          class="flex flex-col items-center justify-center py-16 text-gray-500"
        >
          <u-icon
            name="i-heroicons-document-text"
            class="w-16 h-16 text-gray-300 dark:text-gray-600"
          />
          <p>
            该标签下暂无备忘录
          </p>
        </div>
      </div>
    </div>

    <div
      v-else-if="activeTab === 'related'"
      class="flex-1 min-h-0"
    >
      <div
        v-if="loadingRelated"
        class="flex justify-center py-16"
      >
        <u-icon
          name="i-heroicons-arrow-path"
          class="w-8 h-8 animate-spin text-gray-400"
        />
      </div>
      <div
        v-else
        class="flex flex-wrap gap-3"
      >
        <u-badge
          v-for="relatedTag in relatedTags"
          :key="relatedTag.id"
          :color="(relatedTag.color || 'neutral') as any"
          size="lg"
          class="cursor-pointer hover:opacity-80 transition-opacity"
          @click="console.log('跳转到标签详情页:', relatedTag.id)"
        >
          {{ relatedTag.name }}
          <span class="text-xs opacity-60 ml-1">
            ({{ relatedTag.cooccurrenceCount }})
          </span>
        </u-badge>
        <div
          v-if="relatedTags.length === 0"
          class="w-full flex flex-col items-center justify-center py-16 text-gray-500"
        >
          <u-icon
            name="i-heroicons-tag"
            class="w-16 h-16 text-gray-300 dark:text-gray-600"
          />
          <p>
            暂无关联标签
          </p>
        </div>
      </div>
    </div>

    <u-modal
      v-model:open="showModal"
      title="编辑标签"
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
import { ref, computed, watch } from 'vue'
import { useRoute, navigateTo } from '#app'
import { createError } from 'h3'
import { mockTags, mockBookmarks, mockMemos, mockRelatedTags, type MockTag, type MockRelatedTag } from '~/mocks/tags.mock'

definePageMeta({ layout: 'workspace' })

const route = useRoute()
const tagId = Number(route.params.id)

const tag = computed(() => mockTags.find(t => t.id === tagId) || null)

if (!tag.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '标签不存在'
  })
}

const activeTab = ref('bookmarks')
const loadingBookmarks = ref(false)
const loadingMemos = ref(false)
const loadingRelated = ref(false)

const bookmarks = computed(() =>
  mockBookmarks.filter(b => b.tags.some(t => t.id === tagId))
)

const memos = computed(() =>
  mockMemos.filter(m => m.tags.some(t => t.id === tagId))
)

const relatedTags = ref<MockRelatedTag[]>(mockRelatedTags)

watch(activeTab, async (newTab) => {
  if (newTab === 'related') {
    loadingRelated.value = true
    await new Promise(resolve => setTimeout(resolve, 500))
    loadingRelated.value = false
  }
})

const showModal = ref(false)
const isEditing = ref(true)
const showDeleteConfirm = ref(false)
const contextTag = ref<MockTag | null>(null)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const tagForm = ref<{ name: string, color: string }>({ name: '', color: '' })

const openEditModal = () => {
  if (!tag.value) return
  isEditing.value = true
  tagForm.value = { name: tag.value.name, color: tag.value.color || '' }
  contextTag.value = tag.value
  showModal.value = true
}

const openDeleteConfirm = () => {
  if (!tag.value) return
  contextTag.value = tag.value
  showDeleteConfirm.value = true
}

const handleUpdateTag = async (close?: () => void) => {
  if (!contextTag.value || !tagForm.value.name.trim()) {
    return
  }

  try {
    isSubmitting.value = true
    console.log('更新标签:', contextTag.value.id, tagForm.value)
    const index = mockTags.findIndex(t => t.id === contextTag.value!.id)
    if (index > -1 && mockTags[index]) {
      const existingTag = mockTags[index]
      mockTags[index] = {
        id: existingTag.id,
        name: tagForm.value.name.trim(),
        color: tagForm.value.color || null,
        userId: existingTag.userId,
        bookmarksCount: existingTag.bookmarksCount,
        memosCount: existingTag.memosCount,
        createdAt: existingTag.createdAt,
        updatedAt: existingTag.updatedAt
      }
    }
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
    console.log('删除标签:', contextTag.value.id)
    const index = mockTags.findIndex(t => t.id === contextTag.value!.id)
    if (index > -1) {
      mockTags.splice(index, 1)
    }
    close?.()
    showDeleteConfirm.value = false
    contextTag.value = null
    navigateTo('/workspace/tags')
  } finally {
    isDeleting.value = false
  }
}
</script>
