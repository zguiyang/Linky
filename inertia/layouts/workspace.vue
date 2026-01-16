<template>
  <root-layout>
    <div class="flex h-screen relative overflow-hidden">
      <!-- 第一栏：页面级导航 -->
      <nav
        class="relative w-[72px] bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-6 z-10"
      >
        <!-- Logo -->
        <div class="mb-8">
          <div
            class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <!-- 页面导航 -->
        <div class="flex-1 w-full">
          <u-navigation-menu
            :items="navigationItems"
            orientation="vertical"
            collapsed
            :tooltip="{ content: { side: 'right' } }"
            :popover="false"
            :ui="{
              link: 'w-full h-12 rounded-xl flex items-center justify-center data-[state=active]:bg-primary/10',
              linkLeadingIcon: 'w-6 h-6 data-[state=active]:text-primary',
            }"
          />
        </div>

        <!-- 底部工具 -->
        <div class="flex flex-col gap-2 p-3">
          <u-button
            icon="i-heroicons-magnifying-glass"
            color="neutral"
            variant="ghost"
            @click="showGlobalSearchModal = true"
          />
          <u-button icon="i-heroicons-cog-6-tooth" color="neutral" variant="ghost" />
          <u-color-mode-button />
        </div>
      </nav>

      <!-- 第二栏：侧边栏 -->
      <aside
        class="relative w-[280px] bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-y-auto z-5 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        <!-- 分类区域 -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-400">分类</h3>
            <div class="flex gap-1">
              <u-button icon="i-heroicons-plus" color="neutral" variant="ghost" size="xs" />
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div
              v-for="category in categories"
              :key="category.id"
              class="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              :class="{ 'bg-indigo-500/10': selectedCategory === category.id }"
              @click="selectCategory(category.id)"
            >
              <div
                class="w-8 h-8 flex items-center justify-center rounded-lg"
                :class="
                  category.id === 'all'
                    ? 'bg-amber-500/10 text-amber-500'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                "
              >
                <u-icon :name="category.icon" class="w-[18px] h-[18px]" />
              </div>
              <span class="flex-1 text-sm font-medium text-gray-600 dark:text-gray-300">{{
                category.name
              }}</span>
              <span
                class="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full"
                :class="{ 'bg-indigo-500/10 text-indigo-400': selectedCategory === category.id }"
                >{{ category.count }}</span
              >
            </div>
          </div>
        </div>

        <!-- 标签区域 -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-400">标签</h3>
            <u-button icon="i-heroicons-plus" color="neutral" variant="ghost" size="xs" />
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in popularTags"
              :key="tag.id"
              class="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-600 dark:text-gray-300 cursor-pointer transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              :class="{
                'bg-indigo-500/10 border-indigo-500/30 text-indigo-400': selectedTags.includes(
                  tag.id
                ),
              }"
              @click="toggleTag(tag.id)"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>

        <!-- 添加按钮 -->
        <div class="mt-auto p-6">
          <u-button
            icon="i-heroicons-plus"
            label="添加书签"
            color="primary"
            block
            @click="handleAddAction"
          />
        </div>
      </aside>

      <!-- 第三栏：主内容区域 -->
      <main
        class="relative flex-1 overflow-y-auto z-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
      >
        <slot />
      </main>
    </div>
  </root-layout>
</template>

<script setup lang="ts">
import { usePage } from '@inertiajs/vue3'
import { ref } from 'vue'
import RootLayout from '~/layouts/root.vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const page = usePage()
const currentRoute = ref(page.props.url)

const showGlobalSearchModal = ref(false)
const globalSearchQuery = ref('')
const searchResults = ref<any[]>([])

const navigationItems = ref<NavigationMenuItem[]>([
  { label: '书签', icon: 'i-heroicons-bookmark', to: '/workspace/bookmarks' },
  { label: '备忘录', icon: 'i-heroicons-document-text', to: '/workspace/memos' },
])

const categories = ref([
  { id: 'all', name: '全部', icon: 'i-heroicons-folder-open', count: 5 },
  { id: 'dev', name: '开发工具', icon: 'i-heroicons-code-bracket', count: 3 },
  { id: 'design', name: '设计资源', icon: 'i-heroicons-paint-brush', count: 1 },
  { id: 'learning', name: '学习资源', icon: 'i-heroicons-academic-cap', count: 1 },
])

const popularTags = ref([
  { id: 'javascript', name: 'JavaScript', count: 2 },
  { id: 'vue', name: 'Vue', count: 2 },
  { id: 'css', name: 'CSS', count: 1 },
  { id: 'tailwind', name: 'Tailwind', count: 1 },
])

const selectedCategory = ref('all')
const selectedTags = ref<string[]>([])

const handleGlobalSearch = () => {
  const query = globalSearchQuery.value.toLowerCase()
  if (!query) return

  console.log('Mock: 搜索', query)
  searchResults.value = [
    {
      type: 'bookmark',
      id: 1,
      title: 'Vue.js 官方文档',
      description: 'https://vuejs.org',
      icon: 'i-heroicons-bookmark',
    },
    {
      type: 'memo',
      id: 1,
      title: '项目规划',
      description: '这是一个关于项目规划的备忘录...',
      icon: 'i-heroicons-document-text',
    },
  ]
}

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
}

const toggleTag = (tagId: string) => {
  const index = selectedTags.value.indexOf(tagId)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tagId)
  }
}

const handleAddAction = () => {
  if (currentRoute.value === '/workspace/bookmarks') {
    const event = new CustomEvent('add-bookmark')
    window.dispatchEvent(event)
  } else if (currentRoute.value === '/workspace/memos') {
    const event = new CustomEvent('add-memo')
    window.dispatchEvent(event)
  }
}

defineExpose({
  categories,
  popularTags,
  selectedCategory,
  selectedTags,
  selectCategory,
  toggleTag,
})
</script>
