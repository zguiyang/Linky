<template>
  <div class="flex flex-col gap-6 h-full min-h-0 p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-shrink-0">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          我的备忘录
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          共 {{ filteredMemos.length }} 个备忘录
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
        <u-select
          v-model="sortBy"
          :items="sortOptions"
          placeholder="排序"
          :popper="{ strategy: 'fixed' }"
          size="md"
          class="shrink-0"
        />
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
      class="active-filters"
    >
      <div class="filters-left">
        <span class="text-sm text-gray-600 dark:text-gray-400">已选标签：</span>
        <div class="filter-tags">
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
      <div class="flex items-center gap-3 mb-6">
        <u-button
          :color="viewFilter === 'all' ? 'primary' : 'neutral'"
          variant="soft"
          size="sm"
          @click="viewFilter = 'all'"
        >
          全部
        </u-button>
        <u-button
          :color="viewFilter === 'pinned' ? 'primary' : 'neutral'"
          variant="soft"
          size="sm"
          @click="viewFilter = 'pinned'"
        >
          <template #leading>
            <u-icon
              name="i-heroicons-star"
              :class="{ 'text-amber-500': viewFilter === 'pinned' }"
            />
          </template>
          已置顶
        </u-button>
      </div>

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
        />
      </div>

      <div
        v-if="filteredMemos.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <div
          class="w-20 h-20 flex items-center justify-center mb-6 text-gray-400 dark:text-gray-500"
        >
          <u-icon
            name="i-heroicons-document-text"
            class="w-16 h-16"
          />
        </div>
        <p class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          暂无备忘录
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          开始创建您的第一个备忘录吧
        </p>
      </div>
    </u-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTags } from '~/composables/useTags'
import { tagsApi } from '~/api/tags'
import type { Tag } from '~/api/types'

definePageMeta({ layout: 'workspace' })

const { selectedTags, removeTag, clearTags } = useTags()

const searchQuery = ref('')
const viewMode = ref<'masonry' | 'grid' | 'list'>('masonry')
const viewFilter = ref<'all' | 'pinned'>('all')
const sortBy = ref<'recent' | 'oldest' | 'name'>('recent')
const selectedMemo = ref<{ id: number, title: string } | null>(null)
const showDeleteModal = ref(false)

const { data: tags } = await useAsyncData<Tag[]>(
  'tags',
  () => tagsApi.index(),
  {
    server: true,
    default: () => []
  }
)

const showMemoModal = ref(false)
const modalMode = ref<'add' | 'edit'>('add')

const formData = ref<{
  id: number
  title: string
  content: string
  category: string
  tags: string[]
  pinned: boolean
  createdAt: string
  updatedAt: string
}>({
  id: 0,
  title: '',
  content: '',
  category: '',
  tags: [],
  pinned: false,
  createdAt: '',
  updatedAt: ''
})

const memos = ref([
  {
    id: 1,
    title: '示例备忘录 1',
    content: '这是一个示例备忘录内容。',
    tags: ['示例'],
    category: 'other',
    pinned: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 2,
    title: '示例备忘录 2',
    content: '另一个示例备忘录内容。',
    tags: ['示例'],
    category: 'work',
    pinned: false,
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02'
  }
])

const filteredMemos = computed(() => {
  let result = memos.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      m =>
        m.title.toLowerCase().includes(query)
        || m.content.toLowerCase().includes(query)
        || m.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  if (viewFilter.value === 'pinned') {
    result = result.filter(m => m.pinned)
  }

  if (selectedTags.value.length > 0) {
    result = result.filter(m => m.tags.some((t: string) => selectedTags.value.includes(parseInt(t))))
  }

  if (sortBy.value === 'recent') {
    result = result.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  } else if (sortBy.value === 'oldest') {
    result = result.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  } else if (sortBy.value === 'name') {
    result = result.sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
})

const sortOptions = [
  { label: '最近更新', value: 'recent' },
  { label: '最早创建', value: 'oldest' },
  { label: '标题排序', value: 'name' }
]

const getTagName = (tagId: number) => {
  const tag = tags.value?.find(t => t.id === tagId)
  return tag?.name || ''
}

const setViewMode = (mode: 'masonry' | 'grid' | 'list') => {
  viewMode.value = mode
}

const openAddModal = () => {
  modalMode.value = 'add'
  formData.value = {
    id: 0,
    title: '',
    content: '',
    category: '',
    tags: [],
    pinned: false,
    createdAt: '',
    updatedAt: ''
  }
  showMemoModal.value = true
}

const openEditor = (memo: any) => {
  modalMode.value = 'edit'
  formData.value = { ...memo }
  selectedMemo.value = { ...memo }
  showMemoModal.value = true
}

const _togglePin = () => {
  if (formData.value) {
    formData.value.pinned = !formData.value.pinned
  }
}

const _handleSaveMemo = () => {
  if (!formData.value.content && modalMode.value === 'add') {
    return
  }

  const now = new Date().toISOString().split('T')[0] || ''

  if (modalMode.value === 'add') {
    const newMemo = {
      id: memos.value.length + 1,
      title: formData.value.title || '无标题备忘录',
      content: formData.value.content,
      category: formData.value.category,
      tags: formData.value.tags,
      pinned: formData.value.pinned || false,
      createdAt: now,
      updatedAt: now
    }
    memos.value.unshift(newMemo)
    console.log('Mock: 新备忘录已添加（内存中）', newMemo)
  } else {
    const index = memos.value.findIndex(m => m.id === formData.value.id)
    if (index !== -1) {
      const existingMemo = memos.value[index]
      memos.value[index] = {
        id: existingMemo.id,
        title: formData.value.title,
        content: formData.value.content,
        category: existingMemo.category,
        tags: formData.value.tags,
        pinned: formData.value.pinned,
        createdAt: existingMemo.createdAt,
        updatedAt: now
      }
      console.log('Mock: 备忘录已更新（内存中）', memos.value[index])
    }
  }

  showMemoModal.value = false
}

const _confirmDelete = () => {
  console.log('Mock: 删除备忘录（仅演示，不实际删除）')
  showDeleteModal.value = false
  showMemoModal.value = false
  selectedMemo.value = null
}
</script>
