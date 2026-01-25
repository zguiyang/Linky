<template>
  <div class="flex flex-col gap-6 h-full min-h-0 p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-shrink-0">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          我的备忘录
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          共 {{ total }} 个备忘录
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <u-input
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="搜索备忘录..."
          size="md"
          class="w-full sm:w-auto flex-grow-0"
        />
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
          title="新建备忘录"
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
        v-if="loading"
        class="flex justify-center py-16"
      >
        <u-icon
          name="i-heroicons-arrow-path"
          class="w-8 h-8 animate-spin"
        />
      </div>

      <div v-else>
        <div
          v-if="viewMode === 'masonry'"
          class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          <memo-card
            v-for="memo in filteredMemos"
            :key="memo.id"
            :memo="memo"
            view-mode="masonry"
            @edit="openEditor"
            @delete="openDeleteConfirm"
          />
        </div>

        <div
          v-else-if="viewMode === 'grid'"
          class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6"
        >
          <memo-card
            v-for="memo in filteredMemos"
            :key="memo.id"
            :memo="memo"
            view-mode="grid"
            @edit="openEditor"
            @delete="openDeleteConfirm"
          />
        </div>

        <div
          v-else
          class="flex flex-col gap-2"
        >
          <memo-card
            v-for="memo in filteredMemos"
            :key="memo.id"
            :memo="memo"
            view-mode="list"
            class="w-full"
            @edit="openEditor"
            @delete="openDeleteConfirm"
          />
        </div>

        <u-empty v-if="filteredMemos.length === 0">
          <template #icon>
            <u-icon
              name="i-heroicons-document-text"
              class="size-16"
            />
          </template>
          <template #title>
            <span class="text-lg font-semibold text-gray-900 dark:text-white">暂无备忘录</span>
          </template>
          <template #description>
            <span class="text-sm text-gray-500 dark:text-gray-400">开始创建您的第一个备忘录吧</span>
          </template>
        </u-empty>
      </div>
    </u-scroll-area>

    <div
      v-if="!loading && total > 0"
      class="flex justify-center py-4 flex-shrink-0"
    >
      <u-pagination
        v-model:page="page"
        :total="total"
        :items-per-page="perPage"
        @update:page="handlePageChange"
      />
    </div>

    <memo-modal
      v-model="showMemoModal"
      :memo="currentMemo"
      :mode="modalMode"
      @save="handleSave"
      @close="closeModal"
    />

    <u-modal
      v-model:open="showDeleteModal"
      title="确认删除"
    >
      <template #body>
        <p class="text-gray-700 dark:text-gray-300 mb-6">
          确定要删除这条备忘录吗？此操作无法撤销。
        </p>
        <div class="flex justify-end gap-3">
          <u-button
            color="neutral"
            variant="ghost"
            @click="closeDeleteModal"
          >
            取消
          </u-button>
          <u-button
            color="error"
            @click="confirmDelete"
          >
            删除
          </u-button>
        </div>
      </template>
    </u-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTags } from '~/composables/useTags'
import { useHttpError } from '~/composables/useHttpError'
import { tagsApi } from '~/api/tags'
import { memosApi } from '~/api/memos'
import MemoModal from '~/components/MemoModal.vue'
import type { Tag, Memo, CreateMemoRequest, UpdateMemoRequest } from '~/api/types'

definePageMeta({ layout: 'workspace' })

const { selectedTags, removeTag, clearTags } = useTags()
const { handleError } = useHttpError()

const searchQuery = ref('')
const viewMode = ref<'masonry' | 'grid' | 'list'>('masonry')

const { data: tags } = await useAsyncData<Tag[]>(
  'memos-tags',
  () => tagsApi.index(),
  {
    server: true,
    default: () => []
  }
)

const page = ref(1)
const perPage = ref(20)

const { data: paginationData, pending: loading, refresh: refreshMemos } = await useAsyncData(
  `memos-page-${page.value}`,
  () => memosApi.paginate(page.value, perPage.value),
  {
    default: () => ({
      meta: { currentPage: 1, perPage: 20, total: 0, lastPage: 1 },
      data: []
    })
  }
)

const memos = computed(() => paginationData.value?.data || [])
const total = computed(() => paginationData.value?.meta.total || 0)

const showMemoModal = ref(false)
const modalMode = ref<'add' | 'edit'>('add')
const currentMemo = ref<Memo | null>(null)
const showDeleteModal = ref(false)
const memoToDelete = ref<Memo | null>(null)

const filteredMemos = computed(() => {
  let result = memos.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      m =>
        m.title.toLowerCase().includes(query)
        || m.content.toLowerCase().includes(query)
        || m.tags.some(tag => tag.name.toLowerCase().includes(query))
    )
  }

  if (selectedTags.value.length > 0) {
    result = result.filter(m => m.tags.some(t => selectedTags.value.includes(t.id)))
  }

  return result
})

const getTagName = (tagId: number) => {
  const tag = tags.value?.find(t => t.id === tagId)
  return tag?.name || ''
}

const setViewMode = (mode: 'masonry' | 'grid' | 'list') => {
  viewMode.value = mode
}

const openAddModal = () => {
  modalMode.value = 'add'
  currentMemo.value = null
  showMemoModal.value = true
}

const openEditor = (memo: Memo) => {
  modalMode.value = 'edit'
  currentMemo.value = memo
  showMemoModal.value = true
}

const closeModal = () => {
  showMemoModal.value = false
  currentMemo.value = null
}

const handleSave = async (data: CreateMemoRequest | UpdateMemoRequest) => {
  try {
    if (modalMode.value === 'add') {
      await memosApi.create(data as CreateMemoRequest)
    } else if (currentMemo.value) {
      await memosApi.update(currentMemo.value.id, data as UpdateMemoRequest)
    }
    await refreshMemos()
    showMemoModal.value = false
    currentMemo.value = null
  } catch (error) {
    handleError(error)
  }
}

const openDeleteConfirm = (memo: Memo) => {
  memoToDelete.value = memo
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  memoToDelete.value = null
}

const confirmDelete = async () => {
  try {
    if (memoToDelete.value) {
      await memosApi.delete(memoToDelete.value.id)
      await refreshMemos()
    }
    showDeleteModal.value = false
    memoToDelete.value = null
  } catch (error) {
    handleError(error)
  }
}

const handlePageChange = (newPage: number) => {
  page.value = newPage
}
</script>
