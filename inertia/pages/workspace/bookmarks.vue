<template>
  <workspace-layout>
    <div class="bookmarks-page">
      <!-- 顶部工具栏 -->
      <div class="toolbar">
        <div class="toolbar-left">
          <h1 class="page-title">
            {{ selectedCategory === 'all' ? '我的书签' : getCategoryName(selectedCategory) }}
          </h1>
          <span class="page-badge">{{ filteredBookmarks.length }} 个书签</span>
        </div>

        <div class="toolbar-right">
          <!-- 搜索框 -->
          <div class="search-box">
            <u-icon name="i-heroicons-magnifying-glass" class="search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索书签..."
              class="search-input"
            />
          </div>

          <!-- 视图切换 -->
          <div class="view-toggle">
            <button
              class="toggle-btn"
              :class="{ active: viewMode === 'grid' }"
              @click="setViewMode('grid')"
            >
              <u-icon name="i-heroicons-squares-2x2" class="toggle-icon" />
            </button>
            <button
              class="toggle-btn"
              :class="{ active: viewMode === 'list' }"
              @click="setViewMode('list')"
            >
              <u-icon name="i-heroicons-list-bullet" class="toggle-icon" />
            </button>
          </div>

          <!-- 排序选择 -->
          <select v-model="sortBy" class="sort-select">
            <option value="recent">最近添加</option>
            <option value="visits">最多访问</option>
            <option value="name">名称排序</option>
          </select>
        </div>
      </div>

      <!-- 书签内容区 -->
      <div class="bookmarks-content">
        <!-- 卡片视图 -->
        <div v-if="viewMode === 'grid'" class="bookmarks-grid">
          <div
            v-for="bookmark in filteredBookmarks"
            :key="bookmark.id"
            class="bookmark-card"
            @click="openBookmark(bookmark)"
          >
            <div class="bookmark-favicon">
              <img
                :src="`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`"
                :alt="bookmark.title"
              />
              <div class="favicon-glow"></div>
            </div>
            <div class="bookmark-info">
              <h3 class="bookmark-title">{{ bookmark.title }}</h3>
              <p class="bookmark-description">{{ bookmark.description }}</p>
              <div class="bookmark-meta">
                <span class="category-tag">{{ bookmark.category }}</span>
                <span class="visit-count">{{ bookmark.visitCount }} 次访问</span>
              </div>
              <div class="bookmark-tags">
                <span v-for="tag in bookmark.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
            <button class="bookmark-menu" @click.stop="showBookmarkMenu(bookmark, $event)">
              <u-icon name="i-heroicons-ellipsis-horizontal" class="menu-icon" />
            </button>
          </div>
        </div>

        <!-- 列表视图 -->
        <div v-else class="bookmarks-list">
          <div
            v-for="bookmark in filteredBookmarks"
            :key="bookmark.id"
            class="bookmark-list-item"
            @click="openBookmark(bookmark)"
          >
            <div class="list-favicon">
              <img
                :src="`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`"
                :alt="bookmark.title"
              />
            </div>
            <div class="list-info">
              <div class="list-header">
                <h3 class="list-title">{{ bookmark.title }}</h3>
                <span class="list-category">{{ bookmark.category }}</span>
              </div>
              <p class="list-url">{{ bookmark.url }}</p>
              <div class="list-footer">
                <div class="list-tags">
                  <span v-for="tag in bookmark.tags" :key="tag" class="mini-tag">{{ tag }}</span>
                </div>
                <span class="list-visits">{{ bookmark.visitCount }} 次访问</span>
              </div>
            </div>
            <button class="list-menu" @click.stop="showBookmarkMenu(bookmark, $event)">
              <u-icon name="i-heroicons-ellipsis-horizontal" class="menu-icon" />
            </button>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="filteredBookmarks.length === 0" class="empty-state">
          <div class="empty-icon">
            <u-icon name="i-heroicons-bookmark" class="empty-icon-inner" />
          </div>
          <p class="empty-title">暂无书签</p>
          <p class="empty-description">开始添加您的第一个书签吧</p>
        </div>
      </div>

      <!-- 添加书签模态框 -->
      <client-only>
        <teleport to="body">
          <transition name="modal">
            <div
              v-if="showAddBookmarkModal"
              class="modal-overlay"
              @click.self="showAddBookmarkModal = false"
            >
              <div class="modal-container">
                <div class="modal-header">
                  <h3 class="modal-title">添加新书签</h3>
                  <button class="close-btn" @click="showAddBookmarkModal = false">
                    <u-icon name="i-heroicons-x-mark" class="close-btn-icon" />
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label class="form-label">标题 <span class="required">*</span></label>
                    <input
                      v-model="newBookmark.title"
                      type="text"
                      placeholder="输入书签标题"
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">URL <span class="required">*</span></label>
                    <input
                      v-model="newBookmark.url"
                      type="url"
                      placeholder="https://example.com"
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">描述</label>
                    <textarea
                      v-model="newBookmark.description"
                      placeholder="添加简短描述（可选）"
                      class="form-textarea"
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">分类</label>
                      <select v-model="newBookmark.category" class="form-select">
                        <option value="">选择分类</option>
                        <option v-for="cat in categoryOptions" :key="cat.value" :value="cat.value">
                          {{ cat.label }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">标签</label>
                    <div class="tags-input">
                      <span v-for="(tag, index) in newBookmark.tags" :key="index" class="tag-item">
                        {{ tag }}
                        <button type="button" class="tag-remove" @click="removeTag(index)">
                          <u-icon name="i-heroicons-x-mark" class="tag-remove-icon" />
                        </button>
                      </span>
                      <input
                        v-model="tagInput"
                        type="text"
                        placeholder="输入标签后按回车"
                        class="tag-input-field"
                        @keyup.enter="addTag"
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-outline" @click="showAddBookmarkModal = false">
                    取消
                  </button>
                  <button class="btn btn-primary" @click="handleAddBookmark">添加</button>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>
      </client-only>
    </div>
  </workspace-layout>
</template>

<script setup lang="ts">
import WorkspaceLayout from '~/layouts/workspace.vue'
import ClientOnly from '~/components/ClientOnly.vue'

import { computed, ref, onMounted } from 'vue'

// 响应式数据
const viewMode = ref<'grid' | 'list'>('grid')
const searchQuery = ref('')
const sortBy = ref('recent')
const tagInput = ref('')

// 模态框状态
const showAddBookmarkModal = ref(false)

// Mock 数据（3 条）
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

// 计算属性
const filteredBookmarks = computed(() => {
  let result = bookmarks.value

  // 按搜索词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query) ||
        b.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  }

  // 排序
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

// 方法
const setViewMode = (mode: 'grid' | 'list') => {
  viewMode.value = mode
}

const openBookmark = (bookmark: any) => {
  window.open(bookmark.url, '_blank')
  bookmark.visitCount++
}

const showBookmarkMenu = (bookmark: any, _event: MouseEvent) => {
  console.log('Mock: Show menu for bookmark:', bookmark)
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

const handleAddBookmark = () => {
  console.log('Mock: 添加书签（仅演示，不实际保存）')
  if (!newBookmark.value.title || !newBookmark.value.url) {
    return
  }

  // Mock: 本地添加（不持久化）
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

  // 重置表单
  newBookmark.value = {
    title: '',
    url: '',
    description: '',
    category: '',
    tags: [],
  }
}

const addTag = () => {
  if (tagInput.value.trim() && !newBookmark.value.tags.includes(tagInput.value.trim())) {
    newBookmark.value.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const removeTag = (index: number) => {
  newBookmark.value.tags.splice(index, 1)
}

// 从布局获取选中的分类
const selectedCategory = ref('all')

// 监听来自布局的添加事件
onMounted(() => {
  window.addEventListener('add-bookmark', () => {
    showAddBookmarkModal.value = true
  })
})
</script>

<style scoped>
.bookmarks-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* ===== 工具栏 ===== */
.toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(229, 231, 235, 1);
}

.dark .toolbar {
  background: rgba(17, 24, 39, 0.7);
  border-bottom-color: rgba(55, 65, 81, 1);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;
}

.dark .page-title {
  color: #f9fafb;
}

.page-badge {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 9999px;
  color: #818cf8;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-box {
  position: relative;
  width: 280px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: #9ca3af;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.625rem 1rem 0.625rem 2.75rem;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 12px;
  font-size: 0.875rem;
  color: #111827;
  outline: none;
  transition: all 0.2s ease;
}

.dark .search-input {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
  color: #f9fafb;
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.8);
  border-color: #6366f1;
}

.dark .search-input:focus {
  background: rgba(55, 65, 81, 1);
  border-color: #6366f1;
}

.view-toggle {
  display: flex;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 12px;
  padding: 0.125rem;
}

.dark .view-toggle {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
}

.toggle-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  background: rgba(243, 244, 246, 1);
  color: #6b7280;
}

.dark .toggle-btn:hover {
  background: rgba(31, 41, 55, 1);
  color: #9ca3af;
}

.toggle-btn.active {
  background: rgba(99, 102, 241, 0.1);
  color: #818cf8;
}

.toggle-icon {
  width: 18px;
  height: 18px;
}

.sort-select {
  padding: 0.625rem 1rem 0.625rem 2.5rem;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 12px;
  font-size: 0.875rem;
  color: #111827;
  cursor: pointer;
  outline: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(100,100,100,0.5)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  transition: all 0.2s ease;
}

.dark .sort-select {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
  color: #f9fafb;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-9'/%3E%3C/svg%3E");
}

.dark .sort-select {
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-9'/%3E%3C/svg%3E");
}

.sort-select:hover {
  border-color: rgba(209, 213, 219, 1);
}

.dark .sort-select:hover {
  border-color: rgba(75, 85, 99, 1);
}

.sort-select:focus {
  border-color: #6366f1;
}

/* ===== 书签内容区 ===== */
.bookmarks-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* ===== 卡片网格 ===== */
.bookmarks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.bookmark-card {
  position: relative;
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.dark .bookmark-card {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
}

.bookmark-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.bookmark-card:hover {
  background: rgba(243, 244, 246, 1);
  border-color: rgba(209, 213, 219, 1);
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.dark .bookmark-card:hover {
  background: rgba(41, 47, 61, 1);
  border-color: rgba(75, 85, 99, 1);
}

.bookmark-card:hover::before {
  opacity: 1;
}

.bookmark-favicon {
  position: relative;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 14px;
  overflow: hidden;
}

.dark .bookmark-favicon {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
}

.bookmark-favicon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  position: relative;
  z-index: 1;
}

.favicon-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.bookmark-card:hover .favicon-glow {
  opacity: 1;
}

.bookmark-info {
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
}

.bookmark-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.375rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dark .bookmark-title {
  color: #f9fafb;
}

.bookmark-description {
  font-size: 0.8125rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dark .bookmark-description {
  color: #9ca3af;
}

.bookmark-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.category-tag {
  padding: 0.25rem 0.625rem;
  font-size: 0.6875rem;
  font-weight: 600;
  background: rgba(249, 250, 251, 1);
  border-radius: 6px;
  color: #6b7280;
}

.dark .category-tag {
  background: rgba(31, 41, 55, 1);
  color: #9ca3af;
}

.visit-count {
  font-size: 0.75rem;
  color: #9ca3af;
}

.bookmark-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.bookmark-tags .tag {
  padding: 0.25rem 0.5rem;
  font-size: 0.6875rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 6px;
  color: #818cf8;
}

.bookmark-menu {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #9ca3af;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
}

.bookmark-card:hover .bookmark-menu {
  opacity: 1;
}

.bookmark-menu:hover {
  background: rgba(243, 244, 246, 1);
  color: #6b7280;
}

.dark .bookmark-menu:hover {
  background: rgba(31, 41, 55, 1);
  color: #9ca3af;
}

.menu-icon {
  width: 16px;
  height: 16px;
}

/* ===== 列表视图 ===== */
.bookmarks-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bookmark-list-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark .bookmark-list-item {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
}

.bookmark-list-item:hover {
  background: rgba(243, 244, 246, 1);
  border-color: rgba(209, 213, 219, 1);
}

.dark .bookmark-list-item:hover {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
}

.list-favicon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 10px;
}

.dark .list-favicon {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
}

.list-info {
  flex: 1;
  min-width: 0;
}

.list-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.375rem;
}

.list-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #111827;
}

.dark .list-title {
  color: #f9fafb;
}

.list-category {
  padding: 0.25rem 0.625rem;
  font-size: 0.6875rem;
  font-weight: 600;
  background: rgba(249, 250, 251, 1);
  border-radius: 6px;
  color: #6b7280;
}

.dark .list-category {
  background: rgba(31, 41, 55, 1);
  color: #9ca3af;
}

.list-url {
  font-size: 0.8125rem;
  color: #9ca3af;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.mini-tag {
  padding: 0.125rem 0.5rem;
  font-size: 0.6875rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 4px;
  color: #818cf8;
}

.list-visits {
  font-size: 0.75rem;
  color: #9ca3af;
}

.list-menu {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #9ca3af;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
}

.bookmark-list-item:hover .list-menu {
  opacity: 1;
}

.list-menu:hover {
  background: rgba(243, 244, 246, 1);
  color: #6b7280;
}

.dark .list-menu:hover {
  background: rgba(31, 41, 55, 1);
  color: #9ca3af;
}

/* ===== 空状态 ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #9ca3af;
}

.empty-icon-inner {
  width: 64px;
  height: 64px;
}

.empty-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.dark .empty-title {
  color: #f9fafb;
}

.empty-description {
  font-size: 0.875rem;
  color: #9ca3af;
}
</style>
