<template>
  <root-layout>
    <div class="workspace-container">
      <!-- 第一栏：页面级导航 -->
      <nav class="nav-rail">
        <!-- Logo -->
        <div class="nav-logo">
          <div class="logo-icon">
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
        <div class="nav-items">
          <Link
            v-for="item in navigationItems"
            :key="item.to"
            :href="item.to"
            class="nav-item"
            :class="{ active: isActiveRoute(item.to) }"
          >
            <div class="nav-item-inner">
              <u-icon :name="item.icon" class="nav-icon" />
              <span class="nav-tooltip">{{ item.label }}</span>
            </div>
          </Link>
        </div>

        <!-- 底部工具 -->
        <div class="nav-actions">
          <button class="action-btn" @click="showGlobalSearchModal = true">
            <u-icon name="i-heroicons-magnifying-glass" class="action-icon" />
          </button>
          <button class="action-btn">
            <u-icon name="i-heroicons-cog-6-tooth" class="action-icon" />
          </button>
          <u-color-mode-button class="action-btn" />
        </div>
      </nav>

      <!-- 第二栏：侧边栏 -->
      <aside class="sidebar">
        <!-- 分类区域 -->
        <div class="sidebar-section">
          <div class="section-header">
            <h3 class="section-title">分类</h3>
            <div class="section-actions">
              <button class="icon-btn">
                <u-icon name="i-heroicons-plus" class="icon-btn-icon" />
              </button>
            </div>
          </div>
          <div class="category-list">
            <div
              v-for="category in categories"
              :key="category.id"
              class="category-item"
              :class="{ active: selectedCategory === category.id }"
              @click="selectCategory(category.id)"
            >
              <div class="category-icon" :class="category.id === 'all' ? 'icon-all' : ''">
                <u-icon :name="category.icon" class="category-icon-inner" />
              </div>
              <span class="category-name">{{ category.name }}</span>
              <span class="category-count">{{ category.count }}</span>
            </div>
          </div>
        </div>

        <!-- 标签区域 -->
        <div class="sidebar-section">
          <div class="section-header">
            <h3 class="section-title">标签</h3>
            <button class="icon-btn">
              <u-icon name="i-heroicons-plus" class="icon-btn-icon" />
            </button>
          </div>
          <div class="tag-cloud">
            <span
              v-for="tag in popularTags"
              :key="tag.id"
              class="tag-chip"
              :class="{ active: selectedTags.includes(tag.id) }"
              @click="toggleTag(tag.id)"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>

        <!-- 添加按钮 -->
        <div class="sidebar-footer">
          <button class="add-btn" @click="handleAddAction">
            <u-icon name="i-heroicons-plus" class="add-btn-icon" />
            <span>{{ getAddButtonText() }}</span>
          </button>
        </div>
      </aside>

      <!-- 第三栏：主内容区域 -->
      <main class="main-content">
        <slot />
      </main>
    </div>
  </root-layout>
</template>

<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3'
import { ref } from 'vue'
import RootLayout from '~/layouts/root.vue'

const page = usePage()
const currentRoute = ref(page.props.url)

// 模态框状态
const showGlobalSearchModal = ref(false)
const globalSearchQuery = ref('')
const searchResults = ref<any[]>([])

// 导航菜单项
const navigationItems = ref([
  { label: '书签', icon: 'i-heroicons-bookmark', to: '/workspace/bookmarks' },
  { label: '备忘录', icon: 'i-heroicons-document-text', to: '/workspace/memos' },
])

// Mock数据 - 分类
const categories = ref([
  { id: 'all', name: '全部', icon: 'i-heroicons-folder-open', count: 5 },
  { id: 'dev', name: '开发工具', icon: 'i-heroicons-code-bracket', count: 3 },
  { id: 'design', name: '设计资源', icon: 'i-heroicons-paint-brush', count: 1 },
  { id: 'learning', name: '学习资源', icon: 'i-heroicons-academic-cap', count: 1 },
])

// Mock数据 - 标签
const popularTags = ref([
  { id: 'javascript', name: 'JavaScript', count: 2 },
  { id: 'vue', name: 'Vue', count: 2 },
  { id: 'css', name: 'CSS', count: 1 },
  { id: 'tailwind', name: 'Tailwind', count: 1 },
])

// 状态管理
const selectedCategory = ref('all')
const selectedTags = ref<string[]>([])

// 方法
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

const getAddButtonText = () => {
  if (currentRoute.value === '/workspace/bookmarks') {
    return '添加书签'
  } else if (currentRoute.value === '/workspace/memos') {
    return '新建备忘录'
  }
  return '添加'
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

const isActiveRoute = (path: string) => {
  return currentRoute.value === path
}

// 暴露给子组件使用
defineExpose({
  categories,
  popularTags,
  selectedCategory,
  selectedTags,
  selectCategory,
  toggleTag,
})
</script>

<style scoped>
/* ===== Workspace Layout ===== */
.workspace-container {
  display: flex;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.nav-rail {
  position: relative;
  width: 72px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(229, 231, 235, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0;
  z-index: 10;
}

.dark .nav-rail {
  background: rgba(17, 24, 39, 0.7);
  border-right-color: rgba(55, 65, 81, 1);
}

.nav-logo {
  margin-bottom: 2rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
}

.nav-items {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 0 0.75rem;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  border-radius: 12px;
  color: #9ca3af;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  cursor: pointer;
}

.nav-item:hover {
  background: rgba(243, 244, 246, 1);
  color: #6b7280;
}

.dark .nav-item:hover {
  background: rgba(31, 41, 55, 1);
  color: #9ca3af;
}

.nav-item.active {
  background: rgba(99, 102, 241, 0.1);
  color: #818cf8;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 24px;
  background: linear-gradient(180deg, #6366f1 0%, #ec4899 100%);
  border-radius: 0 2px 2px 0;
}

.nav-item-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon {
  width: 24px;
  height: 24px;
}

.nav-tooltip {
  position: absolute;
  left: calc(100% + 12px);
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 8px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-8px);
  transition: all 0.2s ease;
}

.dark .nav-tooltip {
  background: rgba(17, 24, 39, 0.95);
  border-color: rgba(55, 65, 81, 1);
}

.nav-item:hover .nav-tooltip {
  opacity: 1;
  transform: translateX(0);
}

.nav-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
}

.action-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 12px;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(243, 244, 246, 1);
  color: #6b7280;
}

.dark .action-btn:hover {
  background: rgba(31, 41, 55, 1);
  color: #9ca3af;
}

.action-icon {
  width: 20px;
  height: 20px;
}

/* ===== 侧边栏 ===== */
.sidebar {
  position: relative;
  width: 280px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(229, 231, 235, 1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: 5;
}

.dark .sidebar {
  background: rgba(17, 24, 39, 0.7);
  border-right-color: rgba(55, 65, 81, 1);
}

.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(229, 231, 235, 1);
  border-radius: 3px;
}

.dark .sidebar::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 1);
}

.sidebar-section {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(229, 231, 235, 1);
}

.dark .sidebar-section {
  border-bottom-color: rgba(55, 65, 81, 1);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #9ca3af;
}

.section-actions {
  display: flex;
  gap: 0.25rem;
}

.icon-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: rgba(243, 244, 246, 1);
  color: #6b7280;
}

.dark .icon-btn:hover {
  background: rgba(31, 41, 55, 1);
  color: #9ca3af;
}

.icon-btn-icon {
  width: 16px;
  height: 16px;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-item:hover {
  background: rgba(249, 250, 251, 1);
}

.dark .category-item:hover {
  background: rgba(31, 41, 55, 1);
}

.category-item.active {
  background: rgba(99, 102, 241, 0.1);
}

.category-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(249, 250, 251, 1);
  border-radius: 8px;
  color: #9ca3af;
}

.dark .category-icon {
  background: rgba(31, 41, 55, 1);
}

.category-icon.icon-all {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.category-icon-inner {
  width: 18px;
  height: 18px;
}

.category-name {
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

.dark .category-name {
  color: #d1d5db;
}

.category-count {
  font-size: 0.75rem;
  font-weight: 500;
  color: #9ca3af;
  background: rgba(249, 250, 251, 1);
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
}

.dark .category-count {
  background: rgba(31, 41, 55, 1);
}

.category-item.active .category-count {
  background: rgba(99, 102, 241, 0.1);
  color: #818cf8;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-chip {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 20px;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark .tag-chip {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
  color: #d1d5db;
}

.tag-chip:hover {
  background: rgba(243, 244, 246, 1);
  border-color: rgba(209, 213, 219, 1);
}

.dark .tag-chip:hover {
  background: rgba(41, 47, 61, 1);
  border-color: rgba(75, 85, 99, 1);
}

.tag-chip.active {
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
  color: #818cf8;
}

.sidebar-footer {
  margin-top: auto;
  padding: 1.5rem;
}

.add-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  border: none;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}

.add-btn:active {
  transform: translateY(0);
}

.add-btn-icon {
  width: 20px;
  height: 20px;
}

/* ===== 主内容区 ===== */
.main-content {
  position: relative;
  flex: 1;
  overflow-y: auto;
  z-index: 1;
}

.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: transparent;
}

.main-content::-webkit-scrollbar-thumb {
  background: rgba(209, 213, 219, 1);
  border-radius: 4px;
}

.dark .main-content::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 1);
}
</style>
