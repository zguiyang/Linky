<template>
  <div class="workspace-container">
    <!-- 动态背景层 -->
    <div class="ambient-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="noise-overlay"></div>
    </div>

    <!-- 第一栏：页面级导航 -->
    <nav class="nav-rail">
      <!-- Logo -->
      <div class="nav-logo">
        <div class="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <!-- 页面导航 -->
      <div class="nav-items">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ active: isActiveRoute(item.to) }">
          <div class="nav-item-inner">
            <component
              :is="
                () =>
                  h(
                    'svg',
                    { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 },
                    getIconPaths(item.icon)
                  )
              "
              class="nav-icon" />
            <span class="nav-tooltip">{{ item.label }}</span>
          </div>
        </NuxtLink>
      </div>

      <!-- 底部工具 -->
      <div class="nav-actions">
        <button class="action-btn" @click="showGlobalSearchModal = true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
        <button class="action-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
        <ColorModeButton class="action-btn" />
      </div>
    </nav>

    <!-- 第二栏：侧边栏 -->
    <aside class="sidebar">
      <!-- 分类区域 -->
      <div class="sidebar-section">
        <div class="section-header">
          <h3 class="section-title">分类</h3>
          <div class="section-actions">
            <button class="icon-btn" @click="showAddCategoryModal = true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>
        <div class="category-list">
          <div
            v-for="category in categories"
            :key="category.id"
            class="category-item"
            :class="{ active: selectedCategory === category.id }"
            @click="selectCategory(category.id)">
            <div class="category-icon" :class="category.id === 'all' ? 'icon-all' : ''">
              <component
                :is="
                  () =>
                    h(
                      'svg',
                      { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 },
                      getIconPaths(category.icon)
                    )
                " />
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
          <button class="icon-btn" @click="showAddTagModal = true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
        <div class="tag-cloud">
          <span
            v-for="tag in popularTags"
            :key="tag.id"
            class="tag-chip"
            :class="{ active: selectedTags.includes(tag.id) }"
            @click="toggleTag(tag.id)">
            {{ tag.name }}
          </span>
        </div>
      </div>

      <!-- 添加按钮 -->
      <div class="sidebar-footer">
        <button class="add-btn" @click="handleAddAction">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>{{ getAddButtonText() }}</span>
        </button>
      </div>
    </aside>

    <!-- 第三栏：主内容区域 -->
    <main class="main-content">
      <slot />
    </main>

    <!-- 全局搜索模态框 -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showGlobalSearchModal" class="modal-overlay" @click.self="showGlobalSearchModal = false">
          <div class="modal-container search-modal">
            <div class="modal-header">
              <div class="modal-title-group">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <h3>全局搜索</h3>
              </div>
              <button class="close-btn" @click="showGlobalSearchModal = false">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <div class="search-input-wrapper">
                <svg
                  class="search-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  v-model="globalSearchQuery"
                  type="text"
                  placeholder="搜索书签、标签、分类..."
                  class="search-input"
                  @keyup.enter="handleGlobalSearch" />
              </div>
              <div v-if="searchResults.length > 0" class="search-results">
                <div
                  v-for="result in searchResults"
                  :key="result.type + result.id"
                  class="search-result-item"
                  @click="showGlobalSearchModal = false">
                  <div class="result-icon">
                    <component
                      :is="
                        () =>
                          h(
                            'svg',
                            { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 },
                            getIconPaths(result.icon)
                          )
                      " />
                  </div>
                  <div class="result-content">
                    <p class="result-title">{{ result.title }}</p>
                    <p class="result-description">{{ result.description }}</p>
                  </div>
                  <span class="result-type">{{ result.type }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
  import { h } from 'vue';

  const currentRoute = useRoute();
  const showGlobalSearchModal = ref(false);
  const globalSearchQuery = ref('');
  const searchResults = ref<any[]>([]);

  // 导航菜单项
  const navigationItems = ref([
    { label: '书签', icon: 'i-heroicons-bookmark', to: '/workspace/bookmarks' },
    { label: '备忘录', icon: 'i-heroicons-document-text', to: '/workspace/memos' },
  ]);

  // 共享的侧边栏数据
  const categories = ref([
    { id: 'all', name: '全部', icon: 'i-heroicons-folder-open', count: 156 },
    { id: 'dev', name: '开发工具', icon: 'i-heroicons-code-bracket', count: 45 },
    { id: 'design', name: '设计资源', icon: 'i-heroicons-paint-brush', count: 32 },
    { id: 'learning', name: '学习资源', icon: 'i-heroicons-academic-cap', count: 28 },
    { id: 'productivity', name: '效率工具', icon: 'i-heroicons-bolt', count: 25 },
    { id: 'other', name: '其他', icon: 'i-heroicons-ellipsis-horizontal', count: 26 },
  ]);

  const popularTags = ref([
    { id: 'javascript', name: 'JavaScript', count: 45 },
    { id: 'vue', name: 'Vue', count: 32 },
    { id: 'css', name: 'CSS', count: 28 },
    { id: 'design', name: '设计', count: 25 },
    { id: 'api', name: 'API', count: 20 },
    { id: 'database', name: '数据库', count: 18 },
  ]);

  // 状态管理
  const selectedCategory = ref('all');
  const selectedTags = ref<string[]>([]);
  const showAddCategoryModal = ref(false);
  const showAddTagModal = ref(false);

  // 图标路径映射
  const getIconPaths = (iconName: string) => {
    const paths: Record<string, any> = {
      'i-heroicons-bookmark': ['<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>'],
      'i-heroicons-document-text': [
        '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>',
        '<polyline points="14 2 14 8 20 8"/>',
        '<line x1="16" y1="13" x2="8" y2="13"/>',
        '<line x1="16" y1="17" x2="8" y2="17"/>',
        '<line x1="10" y1="9" x2="8" y2="9"/>',
      ],
      'i-heroicons-folder-open': [
        '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
      ],
      'i-heroicons-code-bracket': ['<polyline points="16 18 22 12 16 6"/>', '<polyline points="8 6 2 12 8 18"/>'],
      'i-heroicons-paint-brush': [
        '<path d="M18.375 2.625a3.875 3.875 0 0 0-5.48 0l-9.82 9.82a.75.75 0 0 0-.218.53v4.257a.75.75 0 0 0 .75.75h4.257a.75.75 0 0 0 .53-.218l9.82-9.82a3.875 3.875 0 0 0 0-5.48Z"/>',
        '<path d="m16.022 6.022-3.8 3.8"/>',
      ],
      'i-heroicons-academic-cap': ['<path d="M22 10v6M2 10l10-5 10 5-10 5z"/>', '<path d="M6 12v5c3 3 9 3 12 0v-5"/>'],
      'i-heroicons-bolt': ['<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>'],
      'i-heroicons-ellipsis-horizontal': [
        '<circle cx="12" cy="12" r="1"/>',
        '<circle cx="19" cy="12" r="1"/>',
        '<circle cx="5" cy="12" r="1"/>',
      ],
    };
    return paths[iconName] || ['<circle cx="12" cy="12" r="10"/>'];
  };

  // 方法
  const handleGlobalSearch = () => {
    const query = globalSearchQuery.value.toLowerCase();
    if (!query) return;

    searchResults.value = [
      {
        type: 'bookmark',
        id: 1,
        title: '示例书签',
        description: 'https://example.com',
        icon: 'i-heroicons-bookmark',
      },
    ];
  };

  const selectCategory = (categoryId: string) => {
    selectedCategory.value = categoryId;
  };

  const toggleTag = (tagId: string) => {
    const index = selectedTags.value.indexOf(tagId);
    if (index > -1) {
      selectedTags.value.splice(index, 1);
    } else {
      selectedTags.value.push(tagId);
    }
  };

  const getAddButtonText = () => {
    return currentRoute.path === '/workspace/bookmarks' ? '添加书签' : '新建备忘录';
  };

  const handleAddAction = () => {
    if (currentRoute.path === '/workspace/bookmarks') {
      const event = new CustomEvent('add-bookmark');
      window.dispatchEvent(event);
    } else if (currentRoute.path === '/workspace/memos') {
      const event = new CustomEvent('add-memo');
      window.dispatchEvent(event);
    }
  };

  const isActiveRoute = (path: string) => {
    return currentRoute.path === path;
  };

  // 暴露给子组件使用
  defineExpose({
    categories,
    popularTags,
    selectedCategory,
    selectedTags,
    selectCategory,
    toggleTag,
  });
</script>

<style scoped>
  /* ===== 全局布局 ===== */
  .workspace-container {
    display: flex;
    height: 100vh;
    background: #0a0a0f;
    position: relative;
    overflow: hidden;
    font-family:
      'SF Pro Display',
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
  }

  /* ===== 动态背景 ===== */
  .ambient-background {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    animation: float 20s ease-in-out infinite;
  }

  .orb-1 {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
    top: -200px;
    left: -200px;
    animation-delay: 0s;
  }

  .orb-2 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
    bottom: -150px;
    right: -100px;
    animation-delay: -7s;
  }

  .orb-3 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -14s;
  }

  .noise-overlay {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: translate(30px, -30px) scale(1.05);
    }
    50% {
      transform: translate(-20px, 20px) scale(0.95);
    }
    75% {
      transform: translate(20px, 30px) scale(1.02);
    }
  }

  /* ===== 导航栏 ===== */
  .nav-rail {
    position: relative;
    width: 72px;
    background: rgba(15, 15, 25, 0.8);
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 0;
    z-index: 10;
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
    color: rgba(255, 255, 255, 0.5);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
  }

  .nav-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
  }

  .nav-item.active {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
    color: #a5b4fc;
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
    background: rgba(15, 15, 25, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transform: translateX(-8px);
    transition: all 0.2s ease;
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
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
  }

  /* ===== 侧边栏 ===== */
  .sidebar {
    position: relative;
    width: 280px;
    background: rgba(12, 12, 20, 0.6);
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    z-index: 5;
  }

  .sidebar::-webkit-scrollbar {
    width: 6px;
  }

  .sidebar::-webkit-scrollbar-track {
    background: transparent;
  }

  .sidebar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  .sidebar-section {
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
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
    color: rgba(255, 255, 255, 0.4);
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
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .icon-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.7);
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
    background: rgba(255, 255, 255, 0.03);
  }

  .category-item.active {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%);
  }

  .category-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.5);
  }

  .category-icon.icon-all {
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%);
    color: #fbbf24;
  }

  .category-icon svg {
    width: 18px;
    height: 18px;
  }

  .category-name {
    flex: 1;
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
  }

  .category-count {
    font-size: 0.75rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.05);
    padding: 0.125rem 0.5rem;
    border-radius: 10px;
  }

  .category-item.active .category-count {
    background: rgba(99, 102, 241, 0.2);
    color: #a5b4fc;
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
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tag-chip:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .tag-chip.active {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
    border-color: rgba(99, 102, 241, 0.3);
    color: #a5b4fc;
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
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
  }

  .add-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
  }

  .add-btn:active {
    transform: translateY(0);
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
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
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
    max-width: 600px;
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

  .modal-title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .modal-title-group svg {
    color: rgba(255, 255, 255, 0.6);
  }

  .modal-title-group h3 {
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
  }

  .search-input-wrapper {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.4);
  }

  .search-input {
    width: 100%;
    padding: 0.875rem 1rem 0.875rem 3rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    font-size: 0.9375rem;
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

  .search-results {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .search-result-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .search-result-item:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .result-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(99, 102, 241, 0.1);
    border-radius: 10px;
    color: #a5b4fc;
  }

  .result-icon svg {
    width: 20px;
    height: 20px;
  }

  .result-content {
    flex: 1;
    min-width: 0;
  }

  .result-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.25rem;
  }

  .result-description {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .result-type {
    padding: 0.25rem 0.625rem;
    font-size: 0.6875rem;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* ===== 模态框过渡动画 ===== */
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
</style>
