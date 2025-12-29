<template>
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
          <svg
            class="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input v-model="searchQuery" type="text" placeholder="搜索备忘录..." class="search-input" />
        </div>

        <!-- 视图切换 -->
        <div class="view-toggle">
          <button class="toggle-btn" :class="{ active: viewMode === 'grid' }" @click="setViewMode('grid')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
          <button class="toggle-btn" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
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
      <button class="filter-chip" :class="{ active: viewFilter === 'all' }" @click="viewFilter = 'all'">全部</button>
      <button class="filter-chip" :class="{ active: viewFilter === 'pinned' }" @click="viewFilter = 'pinned'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="star-icon">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
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
          @click="selectMemo(memo)">
          <div v-if="memo.pinned" class="pin-indicator">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h3 class="memo-title">{{ memo.title || '无标题备忘录' }}</h3>
          <p class="memo-preview">{{ memo.content }}</p>
          <div class="memo-footer">
            <div class="memo-tags">
              <span v-for="tag in memo.tags.slice(0, 3)" :key="tag" class="mini-tag">{{ tag }}</span>
              <span v-if="memo.tags.length > 3" class="more-tags">+{{ memo.tags.length - 3 }}</span>
            </div>
            <span class="memo-date">{{ formatDate(memo.updatedAt) }}</span>
          </div>
          <button class="memo-menu" @click.stop="showMemoMenu(memo, $event)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
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
          @click="selectMemo(memo)">
          <div v-if="memo.pinned" class="list-pin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredMemos.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
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
          @click.self="showEditorModal = false">
          <div class="modal-container editor-modal">
            <div class="editor-header">
              <div class="editor-title-group">
                <h3 class="editor-title">{{ selectedMemo.title || '无标题备忘录' }}</h3>
                <span class="editor-badge" :class="{ pinned: selectedMemo.pinned }">
                  <svg v-if="selectedMemo.pinned" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {{ selectedMemo.pinned ? '已置顶' : '未置顶' }}
                </span>
              </div>
              <div class="editor-actions">
                <button
                  class="icon-btn"
                  :class="{ active: selectedMemo.pinned }"
                  @click="togglePin"
                  :title="selectedMemo.pinned ? '取消置顶' : '置顶'">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
                <button class="icon-btn danger" @click="showDeleteModal = true" title="删除">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
                <button class="close-btn" @click="showEditorModal = false">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="editor-body">
              <div class="title-input-wrapper">
                <input v-model="selectedMemo.title" type="text" placeholder="备忘录标题..." class="title-input" />
              </div>
              <div class="tags-wrapper">
                <div class="tags-list">
                  <span v-for="(tag, index) in selectedMemo.tags" :key="index" class="editor-tag">
                    {{ tag }}
                    <button type="button" class="tag-remove" @click="removeEditorTag(index)">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                  <input
                    v-model="editorTagInput"
                    type="text"
                    placeholder="添加标签..."
                    class="tag-input"
                    @keyup.enter="addEditorTag" />
                </div>
              </div>
              <div class="content-wrapper">
                <textarea
                  v-model="selectedMemo.content"
                  placeholder="开始写作..."
                  class="content-textarea"
                  @input="updateMemo"></textarea>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">标题</label>
                <input v-model="memoForm.title" type="text" placeholder="输入备忘录标题（可选）" class="form-input" />
              </div>
              <div class="form-group">
                <label class="form-label">内容 <span class="required">*</span></label>
                <textarea
                  v-model="memoForm.content"
                  placeholder="输入备忘录内容"
                  class="form-textarea"
                  rows="6"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">标签</label>
                <div class="tags-input">
                  <span v-for="(tag, index) in memoForm.tags" :key="index" class="tag-item">
                    {{ tag }}
                    <button type="button" class="tag-remove" @click="removeFormTag(index)">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                  <input
                    v-model="formTagInput"
                    type="text"
                    placeholder="输入标签后按回车"
                    class="tag-input-field"
                    @keyup.enter="addFormTag" />
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
              <button class="btn btn-primary" @click="handleSaveMemo">{{ editingMemo ? '更新' : '创建' }}</button>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
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
</template>

<script setup lang="ts">
  // 页面元信息
  definePageMeta({
    layout: 'work-space',
  });

  // 响应式数据
  const searchQuery = ref('');
  const viewMode = ref<'grid' | 'list'>('grid');
  const viewFilter = ref<'all' | 'pinned'>('all');
  const selectedMemo = ref<any>(null);
  const showAddMemoModal = ref(false);
  const showEditorModal = ref(false);
  const showDeleteModal = ref(false);
  const editingMemo = ref(false);
  const sortBy = ref('recent');
  const editorTagInput = ref('');
  const formTagInput = ref('');

  // 备忘录数据
  const memos = ref([
    {
      id: 1,
      title: '项目规划',
      content:
        '这是一个关于项目规划的备忘录。我需要在这里记录项目的关键里程碑、时间节点和重要决策。包括前端开发、后端实现、测试部署等各个阶段的具体安排。',
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
        'Vue 3 的组合式 API 是一种新的编写组件逻辑的方式。通过 setup() 函数，我们可以使用响应式 API 来创建状态、计算属性和方法。主要特点：1. 更好的逻辑复用 2. 类型推导更友好 3. 更灵活的代码组织。',
      tags: ['Vue', 'JavaScript', '前端'],
      category: 'study',
      pinned: false,
      createdAt: '2024-11-28',
      updatedAt: '2024-12-10',
    },
    {
      id: 3,
      title: '会议记录',
      content:
        '2024年12月15日团队会议记录：讨论议题：1. 下一个版本的功能规划 2. 技术选型讨论 3. 人员分配。结论：决定使用 TypeScript，采用微前端架构，下周开始开发新功能。',
      tags: ['会议', '记录'],
      category: 'work',
      pinned: false,
      createdAt: '2024-12-15',
      updatedAt: '2024-12-15',
    },
    {
      id: 4,
      title: 'TODO 列表',
      content:
        '待办事项：完成书签页面开发、实现书签分类功能、完成备忘录页面开发、实现标签系统、优化页面性能、编写文档。重要提醒：记得定期备份数据、关注用户反馈、保持代码质量。',
      tags: ['TODO', '开发'],
      category: 'work',
      pinned: false,
      createdAt: '2024-12-01',
      updatedAt: '2024-12-16',
    },
    {
      id: 5,
      title: '技术选型建议',
      content:
        '基于当前项目需求，推荐以下技术栈：前端：Nuxt 3、TypeScript、Tailwind CSS、Nuxt UI；后端：Nuxt Server API、PostgreSQL、Drizzle ORM；工具：ESLint + Prettier、Husky。',
      tags: ['技术', '选型'],
      category: 'study',
      pinned: true,
      createdAt: '2024-11-20',
      updatedAt: '2024-12-05',
    },
    {
      id: 6,
      title: '灵感收集',
      content:
        '一些有趣的想法：添加智能标签推荐功能、实现书签预览、支持批量操作、添加分享功能、实现暗色主题、支持导出到其他格式。创新点：AI 辅助分类、自动提取文章摘要、智能推荐相关内容。',
      tags: ['灵感', '创新'],
      category: 'favorite',
      pinned: false,
      createdAt: '2024-11-25',
      updatedAt: '2024-12-01',
    },
  ]);

  const memoForm = ref({
    title: '',
    content: '',
    tags: [] as string[],
    category: '',
    pinned: false,
  });

  // 计算属性
  const filteredMemos = computed(() => {
    let result = memos.value;

    // 按视图筛选
    if (viewFilter.value === 'pinned') {
      result = result.filter(m => m.pinned);
    }

    // 按搜索词筛选
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        m =>
          (m.title && m.title.toLowerCase().includes(query)) ||
          m.content.toLowerCase().includes(query) ||
          m.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // 排序：置顶优先，然后按更新时间倒序
    return result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  });

  const categoryOptions = [
    { label: '工作', value: 'work' },
    { label: '学习', value: 'study' },
    { label: '个人', value: 'personal' },
    { label: '收藏', value: 'favorite' },
  ];

  // 方法
  const setViewMode = (mode: 'grid' | 'list') => {
    viewMode.value = mode;
  };

  const selectMemo = (memo: any) => {
    selectedMemo.value = memo;
    showEditorModal.value = true;
  };

  const createNewMemo = () => {
    editingMemo.value = false;
    memoForm.value = {
      title: '',
      content: '',
      tags: [],
      category: '',
      pinned: false,
    };
    showAddMemoModal.value = true;
  };

  const handleSaveMemo = () => {
    if (!memoForm.value.content.trim()) {
      return;
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
    };
    memos.value.unshift(memo);
    showAddMemoModal.value = false;
  };

  const updateMemo = () => {
    if (selectedMemo.value) {
      selectedMemo.value.updatedAt = new Date().toISOString().split('T')[0] || '';
    }
  };

  const togglePin = () => {
    if (selectedMemo.value) {
      selectedMemo.value.pinned = !selectedMemo.value.pinned;
      updateMemo();
    }
  };

  const confirmDelete = () => {
    if (selectedMemo.value) {
      const index = memos.value.findIndex(m => m.id === selectedMemo.value.id);
      if (index > -1) {
        memos.value.splice(index, 1);
      }
      selectedMemo.value = null;
    }
    showDeleteModal.value = false;
    showEditorModal.value = false;
  };

  const showMemoMenu = (memo: any, _event: MouseEvent) => {
    console.log('Show menu for memo:', memo);
  };

  const saveMemo = () => {
    updateMemo();
    showEditorModal.value = false;
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return '今天';
    } else if (days === 1) {
      return '昨天';
    } else if (days < 7) {
      return `${days} 天前`;
    } else {
      return d.toLocaleDateString('zh-CN');
    }
  };

  const addEditorTag = () => {
    if (editorTagInput.value.trim() && !selectedMemo.value.tags.includes(editorTagInput.value.trim())) {
      selectedMemo.value.tags.push(editorTagInput.value.trim());
      editorTagInput.value = '';
    }
  };

  const removeEditorTag = (index: number) => {
    selectedMemo.value.tags.splice(index, 1);
  };

  const addFormTag = () => {
    if (formTagInput.value.trim() && !memoForm.value.tags.includes(formTagInput.value.trim())) {
      memoForm.value.tags.push(formTagInput.value.trim());
      formTagInput.value = '';
    }
  };

  const removeFormTag = (index: number) => {
    memoForm.value.tags.splice(index, 1);
  };

  // 监听来自布局的添加事件
  onMounted(() => {
    window.addEventListener('add-memo', () => {
      createNewMemo();
    });
  });
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
    background: rgba(10, 10, 15, 0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .toolbar-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    letter-spacing: -0.02em;
  }

  .page-badge {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 20px;
    color: #a5b4fc;
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
    color: rgba(255, 255, 255, 0.4);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 0.625rem 1rem 0.625rem 2.75rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    font-size: 0.875rem;
    color: white;
    outline: none;
    transition: all 0.2s ease;
  }

  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .search-input:focus {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(99, 102, 241, 0.5);
  }

  .view-toggle {
    display: flex;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 0.25rem;
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
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .toggle-btn:hover {
    color: rgba(255, 255, 255, 0.7);
  }

  .toggle-btn.active {
    background: rgba(99, 102, 241, 0.2);
    color: #a5b4fc;
  }

  .sort-select {
    padding: 0.625rem 1rem;
    padding-right: 2.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    font-size: 0.875rem;
    color: white;
    cursor: pointer;
    outline: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    transition: all 0.2s ease;
  }

  .sort-select:hover {
    border-color: rgba(255, 255, 255, 0.15);
  }

  .sort-select:focus {
    border-color: rgba(99, 102, 241, 0.5);
  }

  .sort-select option {
    background: #0f0f19;
  }

  /* ===== 筛选栏 ===== */
  .filter-bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }

  .filter-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-chip:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.8);
  }

  .filter-chip.active {
    background: rgba(99, 102, 241, 0.15);
    border-color: rgba(99, 102, 241, 0.3);
    color: #a5b4fc;
  }

  .filter-chip .star-icon {
    color: rgba(255, 255, 255, 0.4);
    transition: color 0.2s ease;
  }

  .filter-chip.active .star-icon {
    color: #fbbf24;
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
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
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
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%);
    border-color: rgba(251, 191, 36, 0.1);
  }

  .memo-card:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .pin-indicator {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #fbbf24;
  }

  .memo-title {
    font-size: 1.0625rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.75rem;
    padding-right: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .memo-preview {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.6;
    margin-bottom: 1.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
    color: #a5b4fc;
  }

  .more-tags {
    padding: 0.25rem 0.5rem;
    font-size: 0.6875rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.4);
  }

  .memo-date {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.3);
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
    color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    opacity: 0;
    transition: all 0.2s ease;
  }

  .memo-card:hover .memo-menu {
    opacity: 1;
  }

  .memo-menu:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.7);
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
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
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
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%);
    border-color: rgba(251, 191, 36, 0.1);
  }

  .memo-list-item:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .list-pin {
    flex-shrink: 0;
    width: 24px;
    color: #fbbf24;
  }

  .list-content {
    flex: 1;
    min-width: 0;
  }

  .list-title {
    font-size: 1rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.5rem;
  }

  .list-preview {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.6;
    margin-bottom: 0.75rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
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

  .list-date {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.3);
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
    color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    opacity: 0;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .memo-list-item:hover .list-menu {
    opacity: 1;
  }

  .list-menu:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.7);
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
    color: rgba(255, 255, 255, 0.2);
  }

  .empty-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.5rem;
  }

  .empty-description {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.4);
  }

  /* ===== 模态框通用样式 ===== */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
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
    background: rgba(15, 15, 25, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    overflow: hidden;
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .modal-header .danger-icon + div {
    display: flex;
    flex-direction: column;
  }

  .modal-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
  }

  .modal-subtitle {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.4);
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
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
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
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.5rem;
  }

  .required {
    color: #f87171;
  }

  .form-input,
  .form-select,
  .form-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    font-size: 0.9375rem;
    color: white;
    outline: none;
    transition: all 0.2s ease;
  }

  .form-input::placeholder,
  .form-textarea::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .form-input:focus,
  .form-select:focus,
  .form-textarea:focus {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(99, 102, 241, 0.5);
  }

  .form-textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
  }

  .form-select option {
    background: #0f0f19;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
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
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    min-height: 46px;
  }

  .tags-input:focus-within {
    border-color: rgba(99, 102, 241, 0.5);
  }

  .tag-item {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.625rem;
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 8px;
    font-size: 0.8125rem;
    color: #a5b4fc;
  }

  .tag-remove {
    display: flex;
    background: transparent;
    border: none;
    padding: 0;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .tag-remove:hover {
    color: white;
  }

  .tag-input-field {
    flex: 1;
    min-width: 120px;
    padding: 0.375rem 0;
    background: transparent;
    border: none;
    font-size: 0.9375rem;
    color: white;
    outline: none;
  }

  .tag-input-field::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .modal-footer {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    padding: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
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
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.8);
  }

  .btn-outline:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.25);
  }

  .btn-primary {
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    border: none;
    color: white;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .editor-title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .editor-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
  }

  .editor-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    color: rgba(255, 255, 255, 0.5);
  }

  .editor-badge.pinned {
    background: rgba(251, 191, 36, 0.15);
    border-color: rgba(251, 191, 36, 0.3);
    color: #fbbf24;
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
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .icon-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
  }

  .icon-btn.active {
    background: rgba(251, 191, 36, 0.1);
    color: #fbbf24;
  }

  .icon-btn.danger:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    outline: none;
    transition: border-color 0.2s ease;
  }

  .title-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .title-input:focus {
    border-color: rgba(99, 102, 241, 0.5);
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
    color: #a5b4fc;
  }

  .tag-input {
    flex: 1;
    min-width: 150px;
    padding: 0.375rem 0.5rem;
    background: transparent;
    border: none;
    font-size: 0.875rem;
    color: white;
    outline: none;
  }

  .tag-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
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
    color: white;
    outline: none;
    resize: none;
    font-family: inherit;
  }

  .content-textarea::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .content-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 0.5rem;
  }

  .char-count {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.3);
  }

  .editor-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .last-edited {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.4);
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

  .danger-text {
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }

  .danger-text strong {
    color: white;
    font-weight: 600;
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
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  .memos-content::-webkit-scrollbar-thumb:hover,
  .modal-body::-webkit-scrollbar-thumb:hover,
  .editor-modal .editor-body::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.15);
  }
</style>
