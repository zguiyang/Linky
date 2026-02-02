<template>
  <div class="flex flex-col gap-6 h-full min-h-0 p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-shrink-0">
      <div>
        <h1 class="text-2xl font-bold text-[var(--text-primary)]">
          我的书签
        </h1>
        <p class="text-sm text-[var(--text-secondary)] mt-1">
          共 {{ total }} 个书签
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2 p-1.5 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)]">
        <u-input
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="搜索书签..."
          size="md"
          class="w-full sm:w-auto flex-grow-0 !bg-transparent"
        />
        <div class="w-px h-6 bg-[var(--border-subtle)]" />
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
        <div class="inline-flex items-center p-0.5 bg-[var(--bg-canvas)] rounded-lg">
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
          title="添加书签"
          @click="openAddModal"
        />
        <u-button
          icon="i-heroicons-arrow-down-tray"
          color="neutral"
          variant="outline"
          size="md"
          title="导入书签"
          @click="openImportModal"
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
        v-if="viewMode === 'masonry'"
        class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
      >
        <bookmark-card
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          :bookmark="bookmark"
          view-mode="masonry"
          @click="openBookmark"
          @edit="openEditModal"
          @delete="openDeleteConfirm"
          @refresh="handleRefresh"
        />
      </div>

      <div
        v-else-if="viewMode === 'grid'"
        class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4"
      >
        <bookmark-card
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          :bookmark="bookmark"
          view-mode="grid"
          @click="openBookmark"
          @edit="openEditModal"
          @delete="openDeleteConfirm"
          @refresh="handleRefresh"
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
          @refresh="handleRefresh"
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
          <span class="text-lg font-semibold text-[var(--text-primary)]">暂无书签</span>
        </template>
        <template #description>
          <span class="text-sm text-[var(--text-secondary)]">开始添加您的第一个书签吧</span>
        </template>
      </u-empty>
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

    <u-modal
      v-model:open="showBookmarkModal"
      :title="isEditing ? '编辑书签' : '添加新书签'"
    >
      <template #body>
        <u-form
          :state="bookmarkForm"
          class="space-y-4"
          @submit="handleSaveBookmark(() => showBookmarkModal = false)"
        >
          <template v-if="!isEditing">
            <u-form-field
              label="自动使用 AI 生成标签"
              direction="row"
            >
              <u-switch v-model="autoAiTag" />
            </u-form-field>
          </template>

          <u-form-field
            label="URL"
            name="url"
            required
          >
            <u-input
              v-model="bookmarkForm.url"
              type="url"
              placeholder="https://example.com"
              icon="i-heroicons-globe-alt"
              class="w-full"
            />
          </u-form-field>

          <u-form-field
            label="标题"
            name="title"
          >
            <u-input
              v-model="bookmarkForm.title"
              placeholder="留空将自动从网页获取"
              class="w-full"
            />
          </u-form-field>

          <u-form-field
            label="描述"
            name="description"
          >
            <u-textarea
              v-model="bookmarkForm.description"
              placeholder="留空将自动从网页获取"
              :rows="3"
              class="w-full"
            />
          </u-form-field>

          <u-form-field
            label="标签"
            name="tagIds"
          >
            <u-select-menu
              v-model="bookmarkForm.tagIds"
              :items="tagSelectItems"
              multiple
              value-key="value"
              label-key="label"
              placeholder="选择标签"
              class="w-full"
            />
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
            :label="isEditing ? '保存' : '添加'"
            color="primary"
            @click="handleSaveBookmark(close)"
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
            <div class="w-16 h-16 rounded-full bg-error-50 dark:bg-error-900/20 flex items-center justify-center">
              <u-icon
                name="i-heroicons-exclamation-triangle"
                class="w-8 h-8 text-error"
              />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-[var(--text-primary)]">
              确定要删除这个书签吗？
            </h3>
            <p class="text-sm text-[var(--text-secondary)] mt-1">
              书签名称: <strong>{{ contextBookmark?.title }}</strong>
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
            @click="handleDeleteBookmark(close)"
          />
        </div>
      </template>
    </u-modal>

    <import-bookmarks-modal
      v-model="showImportModal"
      @imported="handleImportComplete"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTagsStore } from '~/stores/tags'
import type { Bookmark, Tag } from '~/api/types'
import ImportBookmarksModal from '~/components/ImportBookmarksModal.vue'
import { SORT_BY_OPTIONS, SORT_ORDER_OPTIONS, VIEW_MODE, type ViewMode } from '~/constants'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'workspace' })

const tagsStore = useTagsStore()
const authStore = useAuthStore()
const { onBookmarkUpdated } = usePush()

const viewMode = useState<ViewMode>('view-mode', () => VIEW_MODE.MASONRY)

const sortByOptions = SORT_BY_OPTIONS
const sortOrderOptions = SORT_ORDER_OPTIONS

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
const searchQueryParam = computed(() => searchQuery.value || undefined)

const pagination = usePagination<Bookmark>(
  '/bookmarks/paginate',
  {
    query: computed(() => ({
      search: searchQueryParam.value,
      tagIds: tagsStore.selectedTags.length > 0 ? tagsStore.selectedTags : undefined,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value
    }))
  }
)

const { items: bookmarks, total, pending, page, perPage, setPage } = pagination

await pagination.execute()

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

const autoAiTag = ref(true)

const tagSelectItems = computed(() => tagsStore.tagSelectItems)

const setViewMode = (mode: ViewMode) => {
  viewMode.value = mode
}

const openBookmark = (bookmark: Bookmark) => {
  window.open(bookmark.url, '_blank')
}

const openAddModal = () => {
  isEditing.value = false
  editingBookmarkId.value = null
  autoAiTag.value = true
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
  autoAiTag.value = false
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
  if (!bookmarkForm.value.url) {
    return
  }

  const { $api } = useNuxtApp()

  if (isEditing.value && editingBookmarkId.value) {
    await $api(`/bookmarks/${editingBookmarkId.value}`, {
      method: 'put',
      body: bookmarkForm.value
    })
  } else {
    await $api('/bookmarks', {
      method: 'post',
      body: { url: bookmarkForm.value.url, autoAiTag: autoAiTag.value }
    })
  }

  await pagination.execute()
  close?.()
  showBookmarkModal.value = false
  autoAiTag.value = true
  bookmarkForm.value = {
    title: '',
    url: '',
    description: '',
    tagIds: []
  }
}

const handleDeleteBookmark = async (close?: () => void) => {
  if (!contextBookmark.value) return

  const { $api } = useNuxtApp()
  isDeleting.value = true
  await $api(`/bookmarks/${contextBookmark.value.id}`, { method: 'delete' })

  await pagination.execute()
  close?.()
  showDeleteConfirm.value = false
  contextBookmark.value = null
  isDeleting.value = false
}

const showImportModal = ref(false)

const openImportModal = () => {
  showImportModal.value = true
}

const handleImportComplete = async () => {
  await pagination.execute()
  await tagsStore.refreshTags()
}

const handleRefresh = async (bookmark: Bookmark) => {
  const index = bookmarks.value.findIndex(b => b.id === bookmark.id)
  if (index !== -1 && bookmarks.value[index]) {
    bookmarks.value[index].status = 'fetching'
  }

  const { $api } = useNuxtApp()
  await $api(`/bookmarks/${bookmark.id}/refresh-metadata`, { method: 'post' })
}

const handleUpdatedBookmark = (bookmark: Bookmark) => {
  const index = bookmarks.value.findIndex(b => b.id === bookmark.id)
  if (index !== -1) {
    bookmarks.value[index] = bookmark
  }
}

onMounted(() => {
  window.addEventListener('add-bookmark', () => {
    openAddModal()
  })

  if (authStore.user?.id) {
    onBookmarkUpdated(data => handleUpdatedBookmark(data as unknown as Bookmark))
  }
})
</script>
