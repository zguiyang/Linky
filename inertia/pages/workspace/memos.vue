<template>
  <WorkspaceLayout>
    <div class="memos-page">
      <!-- 顶部工具栏 -->
      <div class="toolbar">
        <div class="toolbar-left">
          <h1 class="page-title">我的备忘录</h1>
          <span class="page-badge">{{ filteredMemos.length }} 个备忘录</span>
        </div>

        <div class="toolbar-right">
          <!-- 搜索框 -->
          <div class="search-box">
            <UIcon name="i-heroicons-magnifying-glass" class="search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索备忘录..."
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
              <UIcon name="i-heroicons-squares-2x2" class="toggle-icon" />
            </button>
            <button
              class="toggle-btn"
              :class="{ active: viewMode === 'list' }"
              @click="setViewMode('list')"
            >
              <UIcon name="i-heroicons-list-bullet" class="toggle-icon" />
            </button>
          </div>

          <!-- 排序选择 -->
          <select v-model="sortBy" class="sort-select">
            <option value="recent">最近更新</option>
            <option value="oldest">最早创建</option>
            <option value="name">标题排序</option>
          </select>
        </div>
      </div>

      <!-- 筛选栏 -->
      <div class="filter-bar">
        <button
          class="filter-chip"
          :class="{ active: viewFilter === 'all' }"
          @click="viewFilter = 'all'"
        >
          全部
        </button>
        <button
          class="filter-chip"
          :class="{ active: viewFilter === 'pinned' }"
          @click="viewFilter = 'pinned'"
        >
          <UIcon name="i-heroicons-star" class="star-icon solid" />
          已置顶
        </button>
      </div>

      <!-- 备忘录内容区 -->
      <div class="memos-content">
        <!-- 卡片视图 -->
        <div v-if="viewMode === 'grid'" class="memos-grid">
          <div
            v-for="memo in filteredMemos"
            :key="memo.id"
            class="memo-card"
            :class="{ pinned: memo.pinned }"
            @click="selectMemo(memo)"
          >
            <div v-if="memo.pinned" class="pin-indicator">
              <UIcon name="i-heroicons-star" class="pin-icon solid" />
            </div>
            <h3 class="memo-title">{{ memo.title || '无标题备忘录' }}</h3>
            <p class="memo-preview">{{ memo.content }}</p>
            <div class="memo-footer">
              <div class="memo-tags">
                <span v-for="tag in memo.tags.slice(0, 3)" :key="tag" class="mini-tag">{{
                  tag
                }}</span>
                <span v-if="memo.tags.length > 3" class="more-tags"
                  >+{{ memo.tags.length - 3 }}</span
                >
              </div>
              <span class="memo-date">{{ formatDate(memo.updatedAt) }}</span>
            </div>
            <button class="memo-menu" @click.stop="showMemoMenu(memo, $event)">
              <UIcon name="i-heroicons-ellipsis-horizontal" class="menu-icon" />
            </button>
          </div>
        </div>

        <!-- 列表视图 -->
        <div v-else class="memos-list">
          <div
            v-for="memo in filteredMemos"
            :key="memo.id"
            class="memo-list-item"
            :class="{ pinned: memo.pinned }"
            @click="selectMemo(memo)"
          >
            <div v-if="memo.pinned" class="list-pin">
              <UIcon name="i-heroicons-star" class="list-pin-icon solid" />
            </div>
            <div class="list-content">
              <h3 class="list-title">{{ memo.title || '无标题备忘录' }}</h3>
              <p class="list-preview">{{ memo.content }}</p>
              <div class="list-footer">
                <div class="list-tags">
                  <span v-for="tag in memo.tags" :key="tag" class="mini-tag">{{ tag }}</span>
                </div>
                <span class="list-date">{{ formatDate(memo.updatedAt) }}</span>
              </div>
            </div>
            <button class="list-menu" @click.stop="showMemoMenu(memo, $event)">
              <UIcon name="i-heroicons-ellipsis-horizontal" class="menu-icon" />
            </button>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="filteredMemos.length === 0" class="empty-state">
          <div class="empty-icon">
            <UIcon name="i-heroicons-document-text" class="empty-icon-inner" />
          </div>
          <p class="empty-title">暂无备忘录</p>
          <p class="empty-description">开始创建您的第一个备忘录吧</p>
        </div>
      </div>

      <!-- 编辑器模态框 -->
      <Teleport to="body">
        <Transition name="modal">
          <div
            v-if="showEditorModal && selectedMemo"
            class="modal-overlay fullscreen"
            @click.self="showEditorModal = false"
          >
            <div class="modal-container editor-modal">
              <div class="editor-header">
                <div class="editor-title-group">
                  <h3 class="editor-title">{{ selectedMemo.title || '无标题备忘录' }}</h3>
                  <span class="editor-badge" :class="{ pinned: selectedMemo.pinned }">
                    <UIcon
                      v-if="selectedMemo.pinned"
                      name="i-heroicons-star"
                      class="badge-icon solid"
                    />
                    {{ selectedMemo.pinned ? '已置顶' : '未置顶' }}
                  </span>
                </div>
                <div class="editor-actions">
                  <button
                    class="icon-btn"
                    :class="{ active: selectedMemo.pinned }"
                    @click="togglePin"
                    :title="selectedMemo.pinned ? '取消置顶' : '置顶'"
                  >
                    <UIcon name="i-heroicons-star" class="icon-btn-inner" />
                  </button>
                  <button class="icon-btn danger" @click="showDeleteModal = true" title="删除">
                    <UIcon name="i-heroicons-trash" class="icon-btn-inner" />
                  </button>
                  <button class="close-btn" @click="showEditorModal = false">
                    <UIcon name="i-heroicons-x-mark" class="close-btn-icon" />
                  </button>
                </div>
              </div>
              <div class="editor-body">
                <div class="title-input-wrapper">
                  <input
                    v-model="selectedMemo.title"
                    type="text"
                    placeholder="备忘录标题..."
                    class="title-input"
                  />
                </div>
                <div class="tags-wrapper">
                  <div class="tags-list">
                    <span v-for="(tag, index) in selectedMemo.tags" :key="index" class="editor-tag">
                      {{ tag }}
                      <button type="button" class="tag-remove" @click="removeEditorTag(index)">
                        <UIcon name="i-heroicons-x-mark" class="tag-remove-icon" />
                      </button>
                    </span>
                    <input
                      v-model="editorTagInput"
                      type="text"
                      placeholder="添加标签..."
                      class="tag-input"
                      @keyup.enter="addEditorTag"
                    />
                  </div>
                </div>
                <div class="content-wrapper">
                  <textarea
                    v-model="selectedMemo.content"
                    placeholder="开始写作..."
                    class="content-textarea"
                    @input="updateMemo"
                  ></textarea>
                  <div class="content-footer">
                    <span class="char-count">{{ selectedMemo.content.length }} 字</span>
                  </div>
                </div>
              </div>
              <div class="editor-footer">
                <span class="last-edited">最后更新：{{ formatDate(selectedMemo.updatedAt) }}</span>
                <button class="btn btn-primary" @click="saveMemo">保存</button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- 添加备忘录模态框 -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showAddMemoModal" class="modal-overlay" @click.self="showAddMemoModal = false">
            <div class="modal-container">
              <div class="modal-header">
                <h3 class="modal-title">{{ editingMemo ? '编辑备忘录' : '新建备忘录' }}</h3>
                <button class="close-btn" @click="showAddMemoModal = false">
                  <UIcon name="i-heroicons-x-mark" class="close-btn-icon" />
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label class="form-label">标题</label>
                  <input
                    v-model="memoForm.title"
                    type="text"
                    placeholder="输入备忘录标题（可选）"
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">内容 <span class="required">*</span></label>
                  <textarea
                    v-model="memoForm.content"
                    placeholder="输入备忘录内容"
                    class="form-textarea"
                    rows="6"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label class="form-label">标签</label>
                  <div class="tags-input">
                    <span v-for="(tag, index) in memoForm.tags" :key="index" class="tag-item">
                      {{ tag }}
                      <button type="button" class="tag-remove" @click="removeFormTag(index)">
                        <UIcon name="i-heroicons-x-mark" class="tag-remove-icon" />
                      </button>
                    </span>
                    <input
                      v-model="formTagInput"
                      type="text"
                      placeholder="输入标签后按回车"
                      class="tag-input-field"
                      @keyup.enter="addFormTag"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">分类</label>
                    <select v-model="memoForm.category" class="form-select">
                      <option value="">选择分类</option>
                      <option v-for="cat in categoryOptions" :key="cat.value" :value="cat.value">
                        {{ cat.label }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">置顶</label>
                    <label class="checkbox-label">
                      <input v-model="memoForm.pinned" type="checkbox" class="checkbox" />
                      <span>将备忘录添加到置顶列表</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-outline" @click="showAddMemoModal = false">取消</button>
                <button class="btn btn-primary" @click="handleSaveMemo">
                  {{ editingMemo ? '更新' : '创建' }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- 删除确认模态框 -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
            <div class="modal-container danger-modal">
              <div class="modal-header">
                <div class="danger-icon">
                  <UIcon name="i-heroicons-exclamation-triangle" class="danger-icon-inner" />
                </div>
                <div>
                  <h3 class="modal-title">删除备忘录</h3>
                  <p class="modal-subtitle">此操作无法撤销</p>
                </div>
              </div>
              <div class="modal-body">
                <p class="danger-text">
                  您确定要删除备忘录 "<strong>{{ selectedMemo?.title || '无标题备忘录' }}</strong
                  >" 吗？
                </p>
              </div>
              <div class="modal-footer">
                <button class="btn btn-outline" @click="showDeleteModal = false">取消</button>
                <button class="btn btn-danger" @click="confirmDelete">删除</button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </WorkspaceLayout>
</template>

<script setup lang="ts">
import WorkspaceLayout from '~/layouts/workspace.vue'
import { computed, ref, onMounted } from 'vue'

// 响应式数据
const searchQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const viewFilter = ref<'all' | 'pinned'>('all')
const selectedMemo = ref<any>(null)
const showAddMemoModal = ref(false)
const showEditorModal = ref(false)
const showDeleteModal = ref(false)
const editingMemo = ref(false)
const sortBy = ref('recent')
const editorTagInput = ref('')
const formTagInput = ref('')

// Mock数据 - 备忘录
const memos = ref([
  {
    id: 1,
    title: '项目规划',
    content: '这是一个关于项目规划的备忘录。我需要在这里记录项目的关键里程碑、时间节点和重要决策。',
    tags: ['规划', '项目', '重要'],
    category: 'work',
    pinned: true,
    createdAt: '2024-12-01',
    updatedAt: '2024-12-15',
  },
  {
    id: 2,
    title: '学习笔记 - Vue 3 组合式 API',
    content:
      'Vue 3 的组合式 API 是一种新的编写组件逻辑的方式。通过 setup() 函数，我们可以使用响应式 API。',
    tags: ['Vue', 'JavaScript', '前端'],
    category: 'study',
    pinned: false,
    createdAt: '2024-11-28',
    updatedAt: '2024-12-10',
  },
  {
    id: 3,
    title: 'TODO 列表',
    content: '待办事项：完成书签页面开发、实现书签分类功能、完成备忘录页面开发。',
    tags: ['TODO', '开发'],
    category: 'work',
    pinned: false,
    createdAt: '2024-12-01',
    updatedAt: '2024-12-16',
  },
])

const memoForm = ref({
  title: '',
  content: '',
  tags: [] as string[],
  category: '',
  pinned: false,
})

// 计算属性
const filteredMemos = computed(() => {
  let result = memos.value

  // 按视图筛选
  if (viewFilter.value === 'pinned') {
    result = result.filter((m) => m.pinned)
  }

  // 按搜索词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (m) =>
        (m.title && m.title.toLowerCase().includes(query)) ||
        m.content.toLowerCase().includes(query) ||
        m.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  }

  // 排序：置顶优先，然后按更新时间倒序
  return result.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })
})

const categoryOptions = [
  { label: '工作', value: 'work' },
  { label: '学习', value: 'study' },
  { label: '个人', value: 'personal' },
  { label: '收藏', value: 'favorite' },
]

// 方法
const setViewMode = (mode: 'grid' | 'list') => {
  viewMode.value = mode
}

const selectMemo = (memo: any) => {
  selectedMemo.value = memo
  showEditorModal.value = true
}

const createNewMemo = () => {
  editingMemo.value = false
  memoForm.value = {
    title: '',
    content: '',
    tags: [],
    category: '',
    pinned: false,
  }
  showAddMemoModal.value = true
}

const handleSaveMemo = () => {
  if (!memoForm.value.content.trim()) {
    return
  }

  const memo = {
    id: memos.value.length + 1,
    title: memoForm.value.title,
    content: memoForm.value.content,
    tags: memoForm.value.tags,
    category: memoForm.value.category,
    pinned: memoForm.value.pinned,
    createdAt: new Date().toISOString().split('T')[0] || '',
    updatedAt: new Date().toISOString().split('T')[0] || '',
  }

  memos.value.unshift(memo)
  showAddMemoModal.value = false
  console.log('Mock: 备忘录已创建', memo)
}

const updateMemo = () => {
  if (selectedMemo.value) {
    selectedMemo.value.updatedAt = new Date().toISOString().split('T')[0] || ''
  }
}

const togglePin = () => {
  if (selectedMemo.value) {
    selectedMemo.value.pinned = !selectedMemo.value.pinned
    updateMemo()
  }
}

const confirmDelete = () => {
  if (selectedMemo.value) {
    const index = memos.value.findIndex((m) => m.id === selectedMemo.value.id)
    if (index > -1) {
      memos.value.splice(index, 1)
    }
    selectedMemo.value = null
  }
  showDeleteModal.value = false
  showEditorModal.value = false
  console.log('Mock: 备忘录已删除')
}

const showMemoMenu = (memo: any, _event: MouseEvent) => {
  console.log('Mock: Show menu for memo:', memo)
}

const saveMemo = () => {
  updateMemo()
  showEditorModal.value = false
  console.log('Mock: 备忘录已保存', selectedMemo.value)
}

const formatDate = (date: string) => {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) {
    return '今天'
  } else if (days === 1) {
    return '昨天'
  } else if (days < 7) {
    return `${days} 天前`
  } else {
    return d.toLocaleDateString('zh-CN')
  }
}

const addEditorTag = () => {
  if (
    editorTagInput.value.trim() &&
    !selectedMemo.value.tags.includes(editorTagInput.value.trim())
  ) {
    selectedMemo.value.tags.push(editorTagInput.value.trim())
    editorTagInput.value = ''
  }
}

const removeEditorTag = (index: number) => {
  selectedMemo.value.tags.splice(index, 1)
}

const addFormTag = () => {
  if (formTagInput.value.trim() && !memoForm.value.tags.includes(formTagInput.value.trim())) {
    memoForm.value.tags.push(formTagInput.value.trim())
    formTagInput.value = ''
  }
}

const removeFormTag = (index: number) => {
  memoForm.value.tags.splice(index, 1)
}

// 监听来自布局的添加事件
onMounted(() => {
  window.addEventListener('add-memo', () => {
    createNewMemo()
  })
})
</script>

<style scoped>
.memos-page {
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
  border-radius: 20px;
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
  border-radius: 10px;
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
  border-radius: 10px;
  padding: 0.25rem;
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
  color: #6b7280;
}

.dark .toggle-btn:hover {
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
  padding: 0.625rem 1rem;
  padding-right: 2.5rem;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 10px;
  font-size: 0.875rem;
  color: #111827;
  cursor: pointer;
  outline: none;
  appearance: none;
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

.sort-select:hover {
  border-color: rgba(209, 213, 219, 1);
}

.dark .sort-select:hover {
  border-color: rgba(75, 85, 99, 1);
}

.sort-select:focus {
  border-color: #6366f1;
}

.sort-select option {
  background: #f3f4f6;
}

.dark .sort-select option {
  background: #1f2937;
}

/* ===== 筛选栏 ===== */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(229, 231, 235, 1);
}

.dark .filter-bar {
  border-bottom-color: rgba(55, 65, 81, 1);
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 20px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark .filter-chip {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
  color: #9ca3af;
}

.filter-chip:hover {
  background: rgba(243, 244, 246, 1);
  border-color: rgba(209, 213, 219, 1);
  color: #6b7280;
}

.dark .filter-chip:hover {
  background: rgba(41, 47, 61, 1);
  border-color: rgba(75, 85, 99, 1);
  color: #9ca3af;
}

.filter-chip.active {
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
  color: #818cf8;
}

.filter-chip .star-icon {
  color: #9ca3af;
  transition: color 0.2s ease;
}

.filter-chip.active .star-icon {
  color: #f59e0b;
}

.star-icon,
.pin-icon,
.list-pin-icon,
.badge-icon {
  width: 14px;
  height: 14px;
}

.pin-icon,
.list-pin-icon,
.badge-icon {
  width: 16px;
  height: 16px;
}

/* 实心星星图标 */
.solid {
  fill: currentColor;
}

/* ===== 内容区 ===== */
.memos-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* ===== 卡片网格 ===== */
.memos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.memo-card {
  position: relative;
  padding: 1.5rem;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.dark .memo-card {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
}

.memo-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #6366f1 0%, #ec4899 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.memo-card.pinned::before {
  opacity: 1;
}

.memo-card.pinned {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%);
  border-color: rgba(245, 158, 11, 0.2);
}

.dark .memo-card.pinned {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.3);
}

.memo-card:hover {
  background: rgba(243, 244, 246, 1);
  border-color: rgba(209, 213, 219, 1);
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.dark .memo-card:hover {
  background: rgba(41, 47, 61, 1);
  border-color: rgba(75, 85, 99, 1);
}

.pin-indicator {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #f59e0b;
}

.memo-title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
  padding-right: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dark .memo-title {
  color: #f9fafb;
}

.memo-preview {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dark .memo-preview {
  color: #9ca3af;
}

.memo-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.memo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.mini-tag {
  padding: 0.25rem 0.5rem;
  font-size: 0.6875rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 6px;
  color: #818cf8;
}

.more-tags {
  padding: 0.25rem 0.5rem;
  font-size: 0.6875rem;
  background: rgba(249, 250, 251, 1);
  border-radius: 6px;
  color: #9ca3af;
}

.dark .more-tags {
  background: rgba(31, 41, 55, 1);
}

.memo-date {
  font-size: 0.75rem;
  color: #9ca3af;
}

.memo-menu {
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

.memo-card:hover .memo-menu {
  opacity: 1;
}

.memo-menu:hover {
  background: rgba(243, 244, 246, 1);
  color: #6b7280;
}

.dark .memo-menu:hover {
  background: rgba(41, 47, 61, 1);
  color: #9ca3af;
}

.menu-icon {
  width: 16px;
  height: 16px;
}

/* ===== 列表视图 ===== */
.memos-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.memo-list-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark .memo-list-item {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
}

.memo-list-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 1rem;
  bottom: 1rem;
  width: 3px;
  background: linear-gradient(180deg, #6366f1 0%, #ec4899 100%);
  border-radius: 0 2px 2px 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.memo-list-item.pinned::before {
  opacity: 1;
}

.memo-list-item.pinned {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%);
  border-color: rgba(245, 158, 11, 0.2);
}

.dark .memo-list-item.pinned {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.3);
}

.memo-list-item:hover {
  background: rgba(243, 244, 246, 1);
  border-color: rgba(209, 213, 219, 1);
}

.dark .memo-list-item:hover {
  background: rgba(41, 47, 61, 1);
  border-color: rgba(75, 85, 99, 1);
}

.list-pin {
  flex-shrink: 0;
  width: 24px;
  color: #f59e0b;
}

.list-content {
  flex: 1;
  min-width: 0;
}

.list-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.dark .list-title {
  color: #f9fafb;
}

.list-preview {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dark .list-preview {
  color: #9ca3af;
}

.list-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-date {
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
  flex-shrink: 0;
}

.memo-list-item:hover .list-menu {
  opacity: 1;
}

.list-menu:hover {
  background: rgba(243, 244, 246, 1);
  color: #6b7280;
}

.dark .list-menu:hover {
  background: rgba(41, 47, 61, 1);
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

/* ===== 模态框通用 ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 2rem;
}

.modal-overlay.fullscreen {
  align-items: flex-start;
  overflow-y: auto;
  padding: 0;
}

.modal-container {
  width: 100%;
  max-width: 540px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.dark .modal-container {
  background: rgba(17, 24, 39, 0.95);
  border-color: rgba(55, 65, 81, 1);
}

.editor-modal {
  max-width: 900px;
  height: 100vh;
  border-radius: 0;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(229, 231, 235, 1);
}

.dark .modal-header {
  border-bottom-color: rgba(55, 65, 81, 1);
}

.modal-header .danger-icon + div {
  display: flex;
  flex-direction: column;
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.dark .modal-title {
  color: #f9fafb;
}

.modal-subtitle {
  font-size: 0.8125rem;
  color: #9ca3af;
  margin-top: 0.25rem;
}

.close-btn {
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

.close-btn:hover {
  background: rgba(243, 244, 246, 1);
  color: #6b7280;
}

.dark .close-btn:hover {
  background: rgba(31, 41, 55, 1);
  color: #9ca3af;
}

.close-btn-icon {
  width: 20px;
  height: 20px;
}

.modal-body {
  padding: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
}

.editor-modal .editor-body {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.dark .form-label {
  color: #9ca3af;
}

.required {
  color: #ef4444;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 10px;
  font-size: 0.9375rem;
  color: #111827;
  outline: none;
  transition: all 0.2s ease;
}

.dark .form-input,
.dark .form-select,
.dark .form-textarea {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
  color: #f9fafb;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #9ca3af;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  background: rgba(255, 255, 255, 0.8);
  border-color: #6366f1;
}

.dark .form-input:focus,
.dark .form-select:focus,
.dark .form-textarea:focus {
  background: rgba(55, 65, 81, 1);
  border-color: #6366f1;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}

.form-select option {
  background: #f3f4f6;
}

.dark .form-select option {
  background: #1f2937;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #6b7280;
}

.dark .checkbox-label {
  color: #9ca3af;
}

.checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 10px;
  min-height: 46px;
}

.dark .tags-input {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
}

.tags-input:focus-within {
  border-color: #6366f1;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 8px;
  font-size: 0.8125rem;
  color: #818cf8;
}

.tag-remove {
  display: flex;
  background: transparent;
  border: none;
  padding: 0;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.2s ease;
}

.tag-remove:hover {
  color: #111827;
}

.dark .tag-remove:hover {
  color: #f9fafb;
}

.tag-remove-icon {
  width: 10px;
  height: 10px;
}

.tag-input-field {
  flex: 1;
  min-width: 120px;
  padding: 0.375rem 0;
  background: transparent;
  border: none;
  font-size: 0.9375rem;
  color: #111827;
  outline: none;
}

.dark .tag-input-field {
  color: #f9fafb;
}

.tag-input-field::placeholder {
  color: #9ca3af;
}

.modal-footer {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding: 1.5rem;
  border-top: 1px solid rgba(229, 231, 235, 1);
}

.dark .modal-footer {
  border-top-color: rgba(55, 65, 81, 1);
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-outline {
  background: transparent;
  border: 1px solid rgba(229, 231, 235, 1);
  color: #6b7280;
}

.dark .btn-outline {
  border-color: rgba(55, 65, 81, 1);
  color: #9ca3af;
}

.btn-outline:hover {
  background: rgba(243, 244, 246, 1);
  border-color: rgba(209, 213, 219, 1);
}

.dark .btn-outline:hover {
  background: rgba(41, 47, 61, 1);
  border-color: rgba(75, 85, 99, 1);
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  border: none;
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}

.btn-danger {
  background: #ef4444;
  border: none;
  color: white;
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.3);
}

.btn-danger:hover {
  background: #dc2626;
  box-shadow: 0 8px 30px rgba(239, 68, 68, 0.4);
}

/* ===== 编辑器模态框特有样式 ===== */
.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(229, 231, 235, 1);
}

.dark .editor-header {
  border-bottom-color: rgba(55, 65, 81, 1);
}

.editor-title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.editor-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.dark .editor-title {
  color: #f9fafb;
}

.editor-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(249, 250, 251, 1);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 20px;
  color: #9ca3af;
}

.dark .editor-badge {
  background: rgba(31, 41, 55, 1);
  border-color: rgba(55, 65, 81, 1);
}

.editor-badge.pinned {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.3);
  color: #f59e0b;
}

.editor-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 10px;
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

.icon-btn.active {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.icon-btn.danger:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.icon-btn-inner {
  width: 20px;
  height: 20px;
}

.badge-icon {
  width: 12px;
  height: 12px;
}

.title-input-wrapper {
  margin-bottom: 1.5rem;
}

.title-input {
  width: 100%;
  padding: 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(229, 231, 235, 1);
  color: #111827;
  outline: none;
  transition: border-color 0.2s ease;
}

.dark .title-input {
  border-bottom-color: rgba(55, 65, 81, 1);
  color: #f9fafb;
}

.title-input::placeholder {
  color: #9ca3af;
}

.title-input:focus {
  border-color: #6366f1;
}

.tags-wrapper {
  margin-bottom: 1.5rem;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.editor-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 8px;
  font-size: 0.8125rem;
  color: #818cf8;
}

.tag-input {
  flex: 1;
  min-width: 150px;
  padding: 0.375rem 0.5rem;
  background: transparent;
  border: none;
  font-size: 0.875rem;
  color: #111827;
  outline: none;
}

.dark .tag-input {
  color: #f9fafb;
}

.tag-input::placeholder {
  color: #9ca3af;
}

.content-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-textarea {
  flex: 1;
  width: 100%;
  min-height: 300px;
  padding: 1rem 0;
  font-size: 1rem;
  line-height: 1.8;
  background: transparent;
  border: none;
  color: #111827;
  outline: none;
  resize: none;
  font-family: inherit;
}

.dark .content-textarea {
  color: #f9fafb;
}

.content-textarea::placeholder {
  color: #9ca3af;
}

.content-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 0.5rem;
}

.char-count {
  font-size: 0.75rem;
  color: #9ca3af;
}

.editor-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(229, 231, 235, 1);
}

.dark .editor-footer {
  border-top-color: rgba(55, 65, 81, 1);
}

.last-edited {
  font-size: 0.8125rem;
  color: #9ca3af;
}

/* ===== 危险模态框 ===== */
.danger-modal {
  max-width: 480px;
}

.danger-modal .modal-header {
  align-items: flex-start;
  gap: 1rem;
}

.danger-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 12px;
  color: #ef4444;
  flex-shrink: 0;
}

.danger-icon-inner {
  width: 24px;
  height: 24px;
}

.danger-text {
  font-size: 0.9375rem;
  color: #6b7280;
  line-height: 1.6;
}

.dark .danger-text {
  color: #9ca3af;
}

.danger-text strong {
  color: #111827;
  font-weight: 600;
}

.dark .danger-text strong {
  color: #f9fafb;
}

/* ===== 模态框过渡 ===== */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}

/* ===== 滚动条 ===== */
.memos-content::-webkit-scrollbar,
.modal-body::-webkit-scrollbar,
.editor-modal .editor-body::-webkit-scrollbar {
  width: 6px;
}

.memos-content::-webkit-scrollbar-track,
.modal-body::-webkit-scrollbar-track,
.editor-modal .editor-body::-webkit-scrollbar-track {
  background: transparent;
}

.memos-content::-webkit-scrollbar-thumb,
.modal-body::-webkit-scrollbar-thumb,
.editor-modal .editor-body::-webkit-scrollbar-thumb {
  background: rgba(209, 213, 219, 1);
  border-radius: 3px;
}

.dark .memos-content::-webkit-scrollbar-thumb,
.dark .modal-body::-webkit-scrollbar-thumb,
.dark .editor-modal .editor-body::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 1);
}

.memos-content::-webkit-scrollbar-thumb:hover,
.modal-body::-webkit-scrollbar-thumb:hover,
.editor-modal .editor-body::-webkit-scrollbar-thumb:hover {
  background: rgba(209, 213, 219, 1);
}

.dark .memos-content::-webkit-scrollbar-thumb:hover,
.dark .modal-body::-webkit-scrollbar-thumb:hover,
.dark .editor-modal .editor-body::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 85, 99, 1);
}
</style>
