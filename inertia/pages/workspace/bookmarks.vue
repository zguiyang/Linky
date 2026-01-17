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
          <div class="inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <u-button
              :color="viewMode === 'masonry' ? 'primary' : 'neutral'"
              :variant="viewMode === 'masonry' ? 'solid' : 'ghost'"
              size="sm"
              icon="i-heroicons-view-columns"
              @click="setViewMode('masonry')"
            />
            <u-button
              :color="viewMode === 'grid' ? 'primary' : 'neutral'"
              :variant="viewMode === 'grid' ? 'solid' : 'ghost'"
              size="sm"
              icon="i-heroicons-squares-2x2"
              @click="setViewMode('grid')"
            />
            <u-button
              :color="viewMode === 'list' ? 'primary' : 'neutral'"
              :variant="viewMode === 'list' ? 'solid' : 'ghost'"
              size="sm"
              icon="i-heroicons-list-bullet"
              @click="setViewMode('list')"
            />
          </div>
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
          v-if="viewMode === 'masonry'"
          class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          <div
            v-for="bookmark in filteredBookmarks"
            :key="bookmark.id"
            class="group relative p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 break-inside-avoid"
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
              class="relative w-14 h-14 flex items-center justify-center flex-shrink-0 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4"
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
            <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {{ bookmark.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
              {{ bookmark.description }}
            </p>
            <div class="flex flex-wrap gap-3 mb-4">
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

        <div
          v-else-if="viewMode === 'grid'"
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

const viewMode = ref<'masonry' | 'grid' | 'list'>('grid')
const searchQuery = ref('')
const sortBy = ref('recent')
const tagInput = ref('')
const showAddBookmarkModal = ref(false)

const bookmarks = ref([
  {
    id: 1,
    title: 'Vue.js 官方文档',
    url: 'https://vuejs.org',
    description: 'Vue.js 官方文档，包含完整的API参考和指南，是学习Vue.js的必备资源',
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
  {
    id: 4,
    title: 'Notion',
    url: 'https://notion.so',
    description:
      'Notion 是一个一体化的工作空间，可以记录笔记、管理任务、创建文档，非常适合个人和团队使用',
    category: '效率工具',
    tags: ['笔记', '协作', '效率', '知识管理', '生产力'],
    visitCount: 156,
    createdAt: '2024-11-25',
  },
  {
    id: 5,
    title: 'Figma',
    url: 'https://figma.com',
    description: 'Figma',
    category: '设计资源',
    tags: ['UI设计', '协作'],
    visitCount: 89,
    createdAt: '2024-12-05',
  },
  {
    id: 6,
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    description:
      'Stack Overflow 是全球最大的程序员问答社区，当你遇到编程问题时，这里通常能找到答案',
    category: '开发工具',
    tags: ['问答', '编程', '社区'],
    visitCount: 312,
    createdAt: '2024-11-15',
  },
  {
    id: 7,
    title: 'Dribbble',
    url: 'https://dribbble.com',
    description: '设计师作品分享平台，这里汇集了全球最优秀的设计师作品，是寻找设计灵感的绝佳去处',
    category: '设计资源',
    tags: ['UI设计', '灵感', '作品集', '设计社区', '素材'],
    visitCount: 67,
    createdAt: '2024-12-02',
  },
  {
    id: 8,
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: 'MDN',
    category: '学习资源',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web开发'],
    visitCount: 278,
    createdAt: '2024-11-18',
  },
  {
    id: 9,
    title: 'VS Code',
    url: 'https://code.visualstudio.com',
    description:
      'Visual Studio Code 是一款轻量级但功能强大的代码编辑器，支持多种编程语言，拥有丰富的插件生态',
    category: '开发工具',
    tags: ['编辑器', '开发工具', 'IDE'],
    visitCount: 423,
    createdAt: '2024-11-10',
  },
  {
    id: 10,
    title: 'ChatGPT',
    url: 'https://chat.openai.com',
    description:
      'OpenAI 的 ChatGPT 是一款基于大语言模型的对话式AI助手，可以回答问题、编写代码、提供建议等',
    category: '效率工具',
    tags: ['AI', '人工智能', '聊天', '生产力'],
    visitCount: 567,
    createdAt: '2024-12-08',
  },
  {
    id: 11,
    title: 'Medium',
    url: 'https://medium.com',
    description: 'Medium 是一个高质量的在线内容发布平台，汇集了各个领域的优质文章和深度思考',
    category: '学习资源',
    tags: ['博客', '阅读', '文章'],
    visitCount: 45,
    createdAt: '2024-12-03',
  },
  {
    id: 12,
    title: 'Canva',
    url: 'https://canva.com',
    description: 'Canva',
    category: '设计资源',
    tags: ['在线设计', '模板', '图形'],
    visitCount: 134,
    createdAt: '2024-11-22',
  },
  {
    id: 13,
    title: 'CodePen',
    url: 'https://codepen.io',
    description:
      'CodePen 是一个在线代码编辑器和社交开发环境，开发者可以在这里编写和分享HTML、CSS和JavaScript代码片段',
    category: '开发工具',
    tags: ['代码编辑器', '前端', '演示'],
    visitCount: 98,
    createdAt: '2024-11-28',
  },
  {
    id: 14,
    title: 'Linear',
    url: 'https://linear.app',
    description:
      'Linear 是一款现代化的项目管理和问题追踪工具，专为软件团队设计，界面简洁美观，操作流畅',
    category: '效率工具',
    tags: ['项目管理', '团队协作', '效率'],
    visitCount: 76,
    createdAt: '2024-12-06',
  },
  {
    id: 15,
    title: 'Dev.to',
    url: 'https://dev.to',
    description: 'Dev.to',
    category: '学习资源',
    tags: ['社区', '博客', '编程'],
    visitCount: 112,
    createdAt: '2024-11-30',
  },
  {
    id: 16,
    title: 'Vercel',
    url: 'https://vercel.com',
    description:
      'Vercel 是一个领先的云平台，专门用于部署前端应用，支持 Next.js、Nuxt.js 等框架，提供极致的性能和开发体验',
    category: '开发工具',
    tags: ['部署', '前端', '云服务', 'Next.js', 'Nuxt.js', '性能'],
    visitCount: 201,
    createdAt: '2024-11-12',
  },
  {
    id: 17,
    title: 'Stripe',
    url: 'https://stripe.com',
    description:
      'Stripe 是一个全球领先的在线支付处理平台，为开发者提供简单、强大的支付集成解决方案',
    category: '开发工具',
    tags: ['支付', 'API', '金融'],
    visitCount: 89,
    createdAt: '2024-11-20',
  },
  {
    id: 18,
    title: 'Behance',
    url: 'https://behance.net',
    description:
      'Adobe Behance 是一个展示和发现创意作品的平台，设计师可以在这里展示自己的作品集，获得更多曝光机会',
    category: '设计资源',
    tags: ['设计', '作品集', 'Adobe'],
    visitCount: 54,
    createdAt: '2024-12-04',
  },
  {
    id: 19,
    title: 'YouTube',
    url: 'https://youtube.com',
    description:
      'YouTube 是全球最大的视频分享平台，有海量的教程、演讲、娱乐内容，是学习和娱乐的重要来源',
    category: '学习资源',
    tags: ['视频', '教程', '娱乐', '学习'],
    visitCount: 345,
    createdAt: '2024-11-08',
  },
  {
    id: 20,
    title: 'Twilio',
    url: 'https://twilio.com',
    description: 'Twilio 提供强大的通信API，可以让开发者在应用中轻松集成语音、短信、视频等通信功能',
    category: '开发工具',
    tags: ['通信', 'API', '消息', '语音'],
    visitCount: 43,
    createdAt: '2024-12-07',
  },
  {
    id: 21,
    title: 'Product Hunt',
    url: 'https://producthunt.com',
    description: 'Product Hunt 是发现新产品的最佳平台，每天都有新的科技产品和初创公司在这里发布',
    category: '效率工具',
    tags: ['产品', '发现', '创业'],
    visitCount: 167,
    createdAt: '2024-11-14',
  },
  {
    id: 22,
    title: 'Unsplash',
    url: 'https://unsplash.com',
    description:
      'Unsplash 提供免费的高质量照片，所有图片都可以免费使用，是设计师和开发者的理想图片来源',
    category: '设计资源',
    tags: ['图片', '免费素材', '摄影'],
    visitCount: 289,
    createdAt: '2024-11-16',
  },
  {
    id: 23,
    title: 'Lobsters',
    url: 'https://lobste.rs',
    description: 'Lobsters',
    category: '学习资源',
    tags: ['技术', '新闻'],
    visitCount: 31,
    createdAt: '2024-12-09',
  },
  {
    id: 24,
    title: 'Raycast',
    url: 'https://raycast.com',
    description:
      'Raycast 是一款强大的 Mac 启动器和生产力工具，可以快速启动应用、搜索文件、执行命令，大大提升工作效率',
    category: '效率工具',
    tags: ['Mac', '启动器', '生产力', '工具', '快捷键', '效率', '工作流'],
    visitCount: 156,
    createdAt: '2024-11-26',
  },
  {
    id: 25,
    title: 'Excalidraw',
    url: 'https://excalidraw.com',
    description:
      'Excalidraw 是一个虚拟白板工具，可以绘制手绘风格的图表，非常适合用于头脑风暴、架构设计和文档说明',
    category: '效率工具',
    tags: ['白板', '绘图', '协作', '架构'],
    visitCount: 92,
    createdAt: '2024-11-24',
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

const setViewMode = (mode: 'masonry' | 'grid' | 'list') => {
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
