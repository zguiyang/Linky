<template>
  <div class="bookmarks-page">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <h1 class="page-title">{{ selectedCategory === 'all' ? '我的书签' : getCategoryName(selectedCategory) }}</h1>
        <span class="page-badge">{{ filteredBookmarks.length }} 个书签</span>
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
          <input v-model="searchQuery" type="text" placeholder="搜索书签..." class="search-input" />
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
          @click="openBookmark(bookmark)">
          <div class="bookmark-favicon">
            <img :src="`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`" :alt="bookmark.title" />
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 列表视图 -->
      <div v-else class="bookmarks-list">
        <div
          v-for="bookmark in filteredBookmarks"
          :key="bookmark.id"
          class="bookmark-list-item"
          @click="openBookmark(bookmark)">
          <div class="list-favicon">
            <img :src="`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`" :alt="bookmark.title" />
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredBookmarks.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <p class="empty-title">暂无书签</p>
        <p class="empty-description">开始添加您的第一个书签吧</p>
      </div>
    </div>

    <!-- 添加书签模态框 -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showAddBookmarkModal" class="modal-overlay" @click.self="showAddBookmarkModal = false">
          <div class="modal-container">
            <div class="modal-header">
              <h3 class="modal-title">添加新书签</h3>
              <button class="close-btn" @click="showAddBookmarkModal = false">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">标题 <span class="required">*</span></label>
                <input v-model="newBookmark.title" type="text" placeholder="输入书签标题" class="form-input" />
              </div>
              <div class="form-group">
                <label class="form-label">URL <span class="required">*</span></label>
                <input v-model="newBookmark.url" type="url" placeholder="https://example.com" class="form-input" />
              </div>
              <div class="form-group">
                <label class="form-label">描述</label>
                <textarea
                  v-model="newBookmark.description"
                  placeholder="添加简短描述（可选）"
                  class="form-textarea"
                  rows="3"></textarea>
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
                    v-model="tagInput"
                    type="text"
                    placeholder="输入标签后按回车"
                    class="tag-input-field"
                    @keyup.enter="addTag" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-outline" @click="showAddBookmarkModal = false">取消</button>
              <button class="btn btn-primary" @click="handleAddBookmark">添加</button>
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
  const viewMode = ref<'grid' | 'list'>('grid');
  const searchQuery = ref('');
  const sortBy = ref('recent');
  const tagInput = ref('');

  // 模态框状态
  const showAddBookmarkModal = ref(false);

  // 书签数据
  const bookmarks = ref([
    {
      id: 1,
      title: 'Vue.js 官方文档',
      url: 'https://vuejs.org',
      description: 'Vue.js 官方文档，包含完整的API参考和指南',
      category: '开发工具',
      tags: ['Vue', 'JavaScript', '框架'],
      visitCount: 128,
      createdAt: '2024-12-01',
    },
    {
      id: 2,
      title: 'Tailwind CSS 文档',
      url: 'https://tailwindcss.com',
      description: '实用优先的CSS框架，现代化UI开发必备',
      category: '开发工具',
      tags: ['CSS', 'Tailwind', '样式'],
      visitCount: 95,
      createdAt: '2024-11-28',
    },
    {
      id: 3,
      title: 'Figma 设计系统',
      url: 'https://figma.com',
      description: '专业的UI/UX设计工具，协作设计平台',
      category: '设计资源',
      tags: ['设计', 'Figma', 'UI/UX'],
      visitCount: 76,
      createdAt: '2024-11-25',
    },
    {
      id: 4,
      title: 'GitHub',
      url: 'https://github.com',
      description: '全球最大的代码托管平台',
      category: '开发工具',
      tags: ['Git', '代码托管', '协作'],
      visitCount: 234,
      createdAt: '2024-11-20',
    },
    {
      id: 5,
      title: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      description: 'Web技术权威文档，包含HTML、CSS、JavaScript等',
      category: '学习资源',
      tags: ['Web', '前端', '文档'],
      visitCount: 156,
      createdAt: '2024-11-15',
    },
    {
      id: 6,
      title: 'Notion',
      url: 'https://notion.so',
      description: '集成笔记、任务、数据库的协作平台',
      category: '效率工具',
      tags: ['笔记', '协作', '效率'],
      visitCount: 89,
      createdAt: '2024-11-10',
    },
  ]);

  const newBookmark = ref({
    title: '',
    url: '',
    description: '',
    category: '',
    tags: [] as string[],
  });

  // 计算属性
  const filteredBookmarks = computed(() => {
    let result = bookmarks.value;

    // 按搜索词筛选
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        b =>
          b.title.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query) ||
          b.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // 排序
    if (sortBy.value === 'recent') {
      result = result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy.value === 'visits') {
      result = result.sort((a, b) => b.visitCount - a.visitCount);
    } else if (sortBy.value === 'name') {
      result = result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  });

  const categoryOptions = [
    { label: '开发工具', value: '开发工具' },
    { label: '设计资源', value: '设计资源' },
    { label: '学习资源', value: '学习资源' },
    { label: '效率工具', value: '效率工具' },
    { label: '其他', value: '其他' },
  ];

  // 方法
  const setViewMode = (mode: 'grid' | 'list') => {
    viewMode.value = mode;
  };

  const openBookmark = (bookmark: any) => {
    window.open(bookmark.url, '_blank');
    bookmark.visitCount++;
  };

  const showBookmarkMenu = (bookmark: any, _event: MouseEvent) => {
    console.log('Show menu for bookmark:', bookmark);
  };

  const getCategoryName = (categoryId: string) => {
    const categoryMap: Record<string, string> = {
      all: '全部',
      dev: '开发工具',
      design: '设计资源',
      learning: '学习资源',
      productivity: '效率工具',
      other: '其他',
    };
    return categoryMap[categoryId] || '未分类';
  };

  const handleAddBookmark = () => {
    if (!newBookmark.value.title || !newBookmark.value.url) {
      return;
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
    };

    bookmarks.value.unshift(bookmark);
    showAddBookmarkModal.value = false;
    newBookmark.value = {
      title: '',
      url: '',
      description: '',
      category: '',
      tags: [],
    };
  };

  const addTag = () => {
    if (tagInput.value.trim() && !newBookmark.value.tags.includes(tagInput.value.trim())) {
      newBookmark.value.tags.push(tagInput.value.trim());
      tagInput.value = '';
    }
  };

  const removeTag = (index: number) => {
    newBookmark.value.tags.splice(index, 1);
  };

  // 从布局获取选中的分类
  const selectedCategory = ref('all');

  // 监听来自布局的添加事件
  onMounted(() => {
    window.addEventListener('add-bookmark', () => {
      showAddBookmarkModal.value = true;
    });
  });
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
    color: white;
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
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }

  .bookmark-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .bookmark-card:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
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
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    overflow: hidden;
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
    background: radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
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
    color: white;
    margin-bottom: 0.375rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bookmark-description {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.6);
  }

  .visit-count {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.3);
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
    color: #a5b4fc;
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
    color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    opacity: 0;
    transition: all 0.2s ease;
  }

  .bookmark-card:hover .bookmark-menu {
    opacity: 1;
  }

  .bookmark-menu:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.7);
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
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .bookmark-list-item:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .list-favicon {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
  }

  .list-favicon img {
    width: 24px;
    height: 24px;
    object-fit: contain;
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
    color: white;
  }

  .list-category {
    padding: 0.25rem 0.625rem;
    font-size: 0.6875rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.6);
  }

  .list-url {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.4);
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
    color: #a5b4fc;
  }

  .list-visits {
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
  }

  .bookmark-list-item:hover .list-menu {
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

  /* ===== 模态框 ===== */
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

  .modal-container {
    width: 100%;
    max-width: 540px;
    background: rgba(15, 15, 25, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .modal-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
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
    min-height: 80px;
    font-family: inherit;
  }

  .form-select option {
    background: #0f0f19;
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
  .bookmarks-content::-webkit-scrollbar,
  .modal-body::-webkit-scrollbar {
    width: 6px;
  }

  .bookmarks-content::-webkit-scrollbar-track,
  .modal-body::-webkit-scrollbar-track {
    background: transparent;
  }

  .bookmarks-content::-webkit-scrollbar-thumb,
  .modal-body::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  .bookmarks-content::-webkit-scrollbar-thumb:hover,
  .modal-body::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.15);
  }
</style>
