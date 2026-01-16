<template>
  <workspace-layout>
    <div class="h-full flex flex-col">
      <div
        class="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {{ selectedCategory === 'all' ? '我的书签' : getCategoryName(selectedCategory) }}
          </h1>
          <span
            class="px-3 py-1 text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300 rounded-full"
          >
            {{ filteredBookmarks.length }} 个书签
          </span>
        </div>
        <div class="flex items-center gap-4">
          <u-input
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="搜索书签..."
            size="md"
          />
          <u-field-group>
            <u-button
              :color="viewMode === 'grid' ? 'primary' : 'neutral'"
              variant="ghost"
              icon="i-heroicons-squares-2x2"
              @click="setViewMode('grid')"
            />
            <u-button
              :color="viewMode === 'list' ? 'primary' : 'neutral'"
              variant="ghost"
              icon="i-heroicons-list-bullet"
              @click="setViewMode('list')"
            />
          </u-field-group>
          <u-select
            v-model="sortBy"
            :items="sortOptions"
            placeholder="排序方式"
            :popper="{ strategy: 'fixed' }"
            size="md"
          />
        </div>
      </div>

      <div class="flex-1 p-8 overflow-y-auto">
        <div
          v-if="viewMode === 'grid'"
          class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6"
        >
          <div
            v-for="bookmark in filteredBookmarks"
            :key="bookmark.id"
            class="group relative flex gap-4 p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 before:absolute before:inset-0 before:bg-gradient-to-br before:from-[var(--color-primary-10)] before:to-[var(--color-primary-10)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
            @click="openBookmark(bookmark)"
          >
            <div class="absolute top-3 right-3 z-10">
              <u-dropdown-menu :items="getBookmarkMenuItems(bookmark)" :content="{ align: 'end' }">
                <u-button
                  icon="i-heroicons-ellipsis-horizontal"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  @click.stop
                />
              </u-dropdown-menu>
            </div>
            <div
              class="relative w-14 h-14 flex items-center justify-center flex-shrink-0 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
            >
              <img
                :src="`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`"
                :alt="bookmark.title"
                class="w-8 h-8 object-contain relative z-10"
              />
              <div
                class="absolute inset-0 bg-[radial(circle,var(--color-primary-10),rgba(0,0,0,0.7))] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              ></div>
            </div>
            <div class="flex-1 min-w-0 relative z-10">
              <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-1 truncate">
                {{ bookmark.title }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-3 truncate">
                {{ bookmark.description }}
              </p>
              <div class="flex items-center gap-3 mb-3">
                <span
                  class="px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200"
                  >{{ bookmark.category }}</span
                >
                <span class="text-xs text-gray-500 dark:text-gray-400"
                  >{{ bookmark.visitCount }} 次访问</span
                >
              </div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in bookmark.tags"
                  :key="tag"
                  class="px-2 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300 rounded-md"
                  >{{ tag }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <div v-else class="flex flex-col gap-3">
          <div
            v-for="bookmark in filteredBookmarks"
            :key="bookmark.id"
            class="group relative flex items-center gap-4 p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600"
            @click="openBookmark(bookmark)"
          >
            <div class="absolute top-3 right-3 z-10">
              <u-dropdown-menu :items="getBookmarkMenuItems(bookmark)" :content="{ align: 'end' }">
                <u-button
                  icon="i-heroicons-ellipsis-horizontal"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  @click.stop
                />
              </u-dropdown-menu>
            </div>
            <div
              class="w-11 h-11 flex items-center justify-center flex-shrink-0 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <img
                :src="`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`"
                :alt="bookmark.title"
                class="w-6 h-6 object-contain"
              />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-1.5">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
                  {{ bookmark.title }}
                </h3>
                <span
                  class="px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200"
                  >{{ bookmark.category }}</span
                >
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
                {{ bookmark.url }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in bookmark.tags"
                    :key="tag"
                    class="px-2 py-0.5 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300 rounded-sm"
                    >{{ tag }}</span
                  >
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400"
                  >{{ bookmark.visitCount }} 次访问</span
                >
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="filteredBookmarks.length === 0"
          class="flex flex-col items-center justify-center py-16 text-center"
        >
          <div
            class="w-20 h-20 flex items-center justify-center mb-6 text-gray-400 dark:text-gray-500"
          >
            <u-icon name="i-heroicons-bookmark" class="w-16 h-16" />
          </div>
          <p class="text-lg font-semibold text-gray-900 dark:text-white mb-2">暂无书签</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">开始添加您的第一个书签吧</p>
        </div>
      </div>

      <u-modal v-model:open="showAddBookmarkModal" title="添加新书签">
        <template #body>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >标题 <span class="text-red-500">*</span></label
              >
              <u-input v-model="newBookmark.title" placeholder="输入书签标题" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >URL <span class="text-red-500">*</span></label
              >
              <u-input v-model="newBookmark.url" type="url" placeholder="https://example.com" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >描述</label
              >
              <u-textarea
                v-model="newBookmark.description"
                placeholder="添加简短描述（可选）"
                :rows="3"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >分类</label
                >
                <u-select
                  v-model="newBookmark.category"
                  :items="categoryOptions"
                  placeholder="选择分类"
                  :popper="{ strategy: 'fixed' }"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >标签</label
              >
              <div
                class="flex flex-wrap gap-2 p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <u-button icon="i-heroicons-x-mark" color="neutral" variant="ghost" size="xs" />
                <UInput
                  v-model="tagInput"
                  type="text"
                  placeholder="输入标签后按回车"
                  class="flex-1 min-w-[120px] bg-transparent border-none outline-none"
                  @keyup.enter="addTag"
                />
              </div>
            </div>
          </div>
        </template>
        <template #footer="{ close }">
          <u-button label="取消" color="neutral" variant="outline" @click="close" />
          <u-button label="添加" color="primary" @click="handleAddBookmark(close)" />
        </template>
      </u-modal>
    </div>
  </workspace-layout>
</template>

<script setup lang="ts">
import WorkspaceLayout from '~/layouts/workspace.vue'
import type { DropdownMenuItem } from '@nuxt/ui'

import { computed, ref, onMounted } from 'vue'

const viewMode = ref<'grid' | 'list'>('grid')
const searchQuery = ref('')
const sortBy = ref('recent')
const tagInput = ref('')
const showAddBookmarkModal = ref(false)

const bookmarks = ref([
  {
    id: 1,
    title: 'Vue.js 官方文档',
    url: 'https://vuejs.org',
    description: 'Vue.js 官方文档，包含完整的API参考和指南',
    category: '开发工具',
    tags: ['Vue', 'JavaScript'],
    visitCount: 128,
    createdAt: '2024-12-01',
  },
  {
    id: 2,
    title: 'Tailwind CSS 文档',
    url: 'https://tailwindcss.com',
    description: '实用优先的CSS框架，现代化UI开发必备',
    category: '开发工具',
    tags: ['CSS', 'Tailwind'],
    visitCount: 95,
    createdAt: '2024-11-28',
  },
  {
    id: 3,
    title: 'GitHub',
    url: 'https://github.com',
    description: '全球最大的代码托管平台',
    category: '开发工具',
    tags: ['Git', '代码托管'],
    visitCount: 234,
    createdAt: '2024-11-20',
  },
])

const newBookmark = ref({
  title: '',
  url: '',
  description: '',
  category: '',
  tags: [] as string[],
})

const filteredBookmarks = computed(() => {
  let result = bookmarks.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query) ||
        b.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  }

  if (sortBy.value === 'recent') {
    result = result.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } else if (sortBy.value === 'visits') {
    result = result.sort((a, b) => b.visitCount - a.visitCount)
  } else if (sortBy.value === 'name') {
    result = result.sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
})

const categoryOptions = [
  { label: '开发工具', value: '开发工具' },
  { label: '设计资源', value: '设计资源' },
  { label: '学习资源', value: '学习资源' },
  { label: '效率工具', value: '效率工具' },
  { label: '其他', value: '其他' },
]

const sortOptions = [
  { label: '最近添加', value: 'recent' },
  { label: '最多访问', value: 'visits' },
  { label: '名称排序', value: 'name' },
]

const setViewMode = (mode: 'grid' | 'list') => {
  viewMode.value = mode
}

const openBookmark = (bookmark: any) => {
  window.open(bookmark.url, '_blank')
  bookmark.visitCount++
}

const getBookmarkMenuItems = (bookmark: any): DropdownMenuItem[][] => {
  return [
    [
      {
        label: '编辑',
        icon: 'i-heroicons-pencil',
        onSelect: () => {
          console.log('Mock: 编辑书签', bookmark)
        },
      },
      {
        label: '删除',
        icon: 'i-heroicons-trash',
        color: 'error',
        onSelect: () => {
          console.log('Mock: 删除书签', bookmark)
        },
      },
    ],
  ]
}

const getCategoryName = (categoryId: string) => {
  const categoryMap: Record<string, string> = {
    all: '全部',
    dev: '开发工具',
    design: '设计资源',
    learning: '学习资源',
    productivity: '效率工具',
    other: '其他',
  }
  return categoryMap[categoryId] || '未分类'
}

const handleAddBookmark = (close?: () => void) => {
  console.log('Mock: 添加书签（仅演示，不实际保存）')
  if (!newBookmark.value.title || !newBookmark.value.url) {
    return
  }

  const bookmark = {
    id: bookmarks.value.length + 1,
    title: newBookmark.value.title,
    url: newBookmark.value.url,
    description: newBookmark.value.description,
    category: newBookmark.value.category,
    tags: newBookmark.value.tags,
    visitCount: 0,
    createdAt: new Date().toISOString().split('T')[0] || '',
  }

  bookmarks.value.unshift(bookmark)
  showAddBookmarkModal.value = false
  console.log('Mock: 新书签已添加（内存中）', bookmark)

  newBookmark.value = {
    title: '',
    url: '',
    description: '',
    category: '',
    tags: [],
  }

  close?.()
}

const addTag = () => {
  if (tagInput.value.trim() && !newBookmark.value.tags.includes(tagInput.value.trim())) {
    newBookmark.value.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const removeTag = (index: number | string) => {
  newBookmark.value.tags.splice(Number(index), 1)
}

const selectedCategory = ref('all')

onMounted(() => {
  window.addEventListener('add-bookmark', () => {
    showAddBookmarkModal.value = true
  })
})
</script>
