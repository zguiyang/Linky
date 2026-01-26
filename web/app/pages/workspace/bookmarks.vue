<template>
  <div class="flex flex-col gap-6 h-full min-h-0 p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-shrink-0">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          我的书签
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          共 {{ total }} 个书签
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <u-input
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="搜索书签..."
          size="md"
          class="w-full sm:w-auto flex-grow-0"
        />
        <u-select-menu
          v-model="selectedSortBy"
          :items="sortByOptions"
          size="md"
          class="w-32"
        />
        <u-select-menu
          v-model="selectedSortOrder"
          :items="sortOrderOptions"
          size="md"
          class="w-24"
        >
          <template #leading>
            <u-icon
              :name="sortOrderIcon"
              class="w-4 h-4"
            />
          </template>
        </u-select-menu>
        <div class="inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg shrink-0">
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

        <u-button
          icon="i-heroicons-plus"
          color="primary"
          size="md"
          title="添加书签"
          @click="openAddModal"
        />
      </div>
    </div>

    <div
      v-if="selectedTags.length > 0"
      class="px-6 pb-6 border-b border-neutral-200/12 dark:border-neutral-700/12"
    >
      <div class="flex items-center gap-3">
        <span class="text-sm text-neutral-600 dark:text-neutral-400">已选标签：</span>
        <div class="flex items-center gap-2">
          <u-badge
            v-for="tagId in selectedTags"
            :key="tagId"
            color="primary"
            variant="soft"
            size="md"
          >
            {{ getTagName(tagId) }}
            <u-button
              icon="i-heroicons-x-mark"
              size="xs"
              variant="ghost"
              color="neutral"
              @click="removeTag(tagId)"
            />
          </u-badge>
        </div>
        <u-button
          size="sm"
          variant="ghost"
          color="neutral"
          @click="clearTags"
        >
          清除筛选
        </u-button>
      </div>
    </div>

    <u-scroll-area class="flex-1 min-h-0">
      <div
        v-if="viewMode === 'masonry'"
        class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
      >
        <bookmark-card
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          :bookmark="bookmark"
          view-mode="masonry"
          @click="openBookmark"
          @edit="openEditModal"
          @delete="openDeleteConfirm"
        />
      </div>

      <div
        v-else-if="viewMode === 'grid'"
        class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6"
      >
        <bookmark-card
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          :bookmark="bookmark"
          view-mode="grid"
          @click="openBookmark"
          @edit="openEditModal"
          @delete="openDeleteConfirm"
        />
      </div>

      <div
        v-else
        class="flex flex-col gap-3"
      >
        <bookmark-card
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          :bookmark="bookmark"
          view-mode="list"
          @click="openBookmark"
          @edit="openEditModal"
          @delete="openDeleteConfirm"
        />
      </div>

      <u-empty v-if="bookmarks.length === 0">
        <template #icon>
          <u-icon
            name="i-heroicons-bookmark-slash"
            class="size-16"
          />
        </template>
        <template #title>
          <span class="text-lg font-semibold text-gray-900 dark:text-white">暂无书签</span>
        </template>
        <template #description>
          <span class="text-sm text-gray-500 dark:text-gray-400">开始添加您的第一个书签吧</span>
        </template>
      </u-empty>
    </u-scroll-area>

    <div
      v-if="!bookmarksPending && total > 0"
      class="flex justify-center py-4 flex-shrink-0"
    >
      <u-pagination
        v-model:page="page"
        :total="total"
        :items-per-page="perPage"
        @update:page="handlePageChange"
      />
    </div>

    <u-modal
      v-model:open="showBookmarkModal"
      :title="isEditing ? '编辑书签' : '添加新书签'"
    >
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">标题 <span class="text-red-500">*</span></label>
            <u-input
              v-model="bookmarkForm.title"
              placeholder="输入书签标题"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">URL <span class="text-red-500">*</span></label>
            <u-input
              v-model="bookmarkForm.url"
              type="url"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">描述</label>
            <u-textarea
              v-model="bookmarkForm.description"
              placeholder="添加简短描述（可选）"
              :rows="3"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">标签</label>
            <u-select-menu
              v-model="bookmarkForm.tagIds"
              :items="tagSelectItems"
              multiple
              value-key="value"
              label-key="label"
              placeholder="选择标签"
            />
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
          :label="isEditing ? '保存' : '添加'"
          color="primary"
          @click="handleSaveBookmark(close)"
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
              确定要删除这个书签吗？
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              书签名称: <strong>{{ contextBookmark?.title }}</strong>
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
          @click="handleDeleteBookmark(close)"
        />
      </template>
    </u-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useTags } from '~/composables/useTags'
import { bookmarksApi } from '~/api/bookmarks'
import type { Bookmark, Tag } from '~/api/types'

definePageMeta({ layout: 'workspace' })

const { tags, selectedTags, removeTag, clearTags, fetchTags } = useTags()
await fetchTags()

const viewMode = useState('view-mode', () => 'masonry' as 'masonry' | 'grid' | 'list')

const sortByOptions = [
  { label: '更新时间', value: 'updatedAt' },
  { label: '创建时间', value: 'createdAt' }
]

const sortOrderOptions = [
  { label: '倒序', value: 'desc' },
  { label: '正序', value: 'asc' }
]

interface SortOption {
  label: string
  value: string
}

const selectedSortBy = ref(sortByOptions[0] as SortOption)
const selectedSortOrder = ref(sortOrderOptions[0] as SortOption)

const sortBy = computed(() => selectedSortBy.value?.value as 'createdAt' | 'updatedAt' | undefined)
const sortOrder = computed(() => selectedSortOrder.value?.value as 'desc' | 'asc' | undefined)
const sortOrderIcon = computed(() => selectedSortOrder.value?.value === 'asc' ? 'i-heroicons-arrow-up' : 'i-heroicons-arrow-down')

const searchQuery = ref('')

const page = ref(1)
const perPage = ref(20)

const { data: paginationData, pending: bookmarksPending, refresh: refreshBookmarks } = await useAsyncData(
  computed(() => `bookmarks-${page.value}-${perPage.value}-${searchQuery.value}-${selectedTags.value.join(',')}-${sortBy.value}-${sortOrder.value}`),
  () => bookmarksApi.paginate({
    page: page.value,
    perPage: perPage.value,
    search: searchQuery.value || undefined,
    tagIds: selectedTags.value.length > 0 ? selectedTags.value : undefined,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value
  }),
  {
    watch: [page, selectedTags, sortBy, sortOrder],
    default: () => ({
      meta: { currentPage: 1, perPage: 20, total: 0, lastPage: 1 },
      data: []
    })
  }
)

const bookmarks = computed(() => paginationData.value?.data || [])
const total = computed(() => paginationData.value?.meta.total || 0)

watch(searchQuery, () => {
  page.value = 1
})

const showBookmarkModal = ref(false)
const isEditing = ref(false)
const editingBookmarkId = ref<number | null>(null)
const showDeleteConfirm = ref(false)
const contextBookmark = ref<Bookmark | null>(null)
const isDeleting = ref(false)

const bookmarkForm = ref({
  title: '',
  url: '',
  description: '',
  tagIds: [] as number[]
})

const tagSelectItems = computed(() => {
  if (!tags.value) return []
  return tags.value.map(tag => ({
    label: tag.name,
    value: tag.id,
    ...(tag.color && { color: tag.color })
  }))
})

const getTagName = (tagId: number) => {
  const tag = tags.value?.find(t => t.id === tagId)
  return tag?.name || ''
}

const setViewMode = (mode: 'masonry' | 'grid' | 'list') => {
  viewMode.value = mode
}

const openBookmark = (bookmark: Bookmark) => {
  window.open(bookmark.url, '_blank')
}

const openAddModal = () => {
  isEditing.value = false
  editingBookmarkId.value = null
  bookmarkForm.value = {
    title: '',
    url: '',
    description: '',
    tagIds: []
  }
  showBookmarkModal.value = true
}

const openEditModal = (bookmark: Bookmark) => {
  isEditing.value = true
  editingBookmarkId.value = bookmark.id
  bookmarkForm.value = {
    title: bookmark.title,
    url: bookmark.url,
    description: bookmark.description || '',
    tagIds: bookmark.tags.map((t: Tag) => t.id)
  }
  showBookmarkModal.value = true
}

const openDeleteConfirm = (bookmark: Bookmark) => {
  contextBookmark.value = bookmark
  showDeleteConfirm.value = true
}

const handleSaveBookmark = async (close?: () => void) => {
  if (!bookmarkForm.value.title || !bookmarkForm.value.url) {
    return
  }

  if (isEditing.value && editingBookmarkId.value) {
    await bookmarksApi.update(editingBookmarkId.value, bookmarkForm.value)
  } else {
    await bookmarksApi.create(bookmarkForm.value)
  }

  await refreshBookmarks()
  close?.()
  showBookmarkModal.value = false
  bookmarkForm.value = {
    title: '',
    url: '',
    description: '',
    tagIds: []
  }
}

const handleDeleteBookmark = async (close?: () => void) => {
  if (!contextBookmark.value) return

  try {
    isDeleting.value = true
    await bookmarksApi.delete(contextBookmark.value.id)
    await refreshBookmarks()
    close?.()
    showDeleteConfirm.value = false
    contextBookmark.value = null
  } finally {
    isDeleting.value = false
  }
}

const handlePageChange = (newPage: number) => {
  page.value = newPage
}

onMounted(() => {
  window.addEventListener('add-bookmark', () => {
    openAddModal()
  })
})
</script>
