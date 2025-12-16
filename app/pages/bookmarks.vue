<template>
  <!-- 主内容区 -->
  <div class="h-full flex flex-col">
    <!-- 工具栏 -->
    <div class="sticky top-0 bg-background border-b border-accented px-8 py-4 z-10 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-semibold text-foreground">
            {{ selectedCategory === 'all' ? '我的书签' : getCategoryName(selectedCategory) }}
          </h1>
          <UBadge color="neutral" variant="soft">{{ filteredBookmarks.length }} 个书签</UBadge>
        </div>

        <div class="flex items-center gap-3">
          <!-- 搜索框 -->
          <UInput v-model="searchQuery" placeholder="搜索书签..." icon="i-heroicons-magnifying-glass" class="w-64" />

          <!-- 视图切换 -->
          <div class="flex items-center bg-muted rounded-lg p-0.5">
            <UButton
              :color="viewMode === 'grid' ? 'primary' : 'neutral'"
              variant="ghost"
              size="sm"
              @click="setViewMode('grid')">
              <UIcon name="i-heroicons-squares-2x2" />
            </UButton>
            <UButton
              :color="viewMode === 'list' ? 'primary' : 'neutral'"
              variant="ghost"
              size="sm"
              @click="setViewMode('list')">
              <UIcon name="i-heroicons-list-bullet" />
            </UButton>
          </div>

          <!-- 排序 -->
          <USelectMenu v-model="sortBy" :options="sortOptions" placeholder="排序方式" />
        </div>
      </div>
    </div>

    <!-- 书签内容 -->
    <div class="flex-1 p-8 overflow-y-auto">
      <!-- 卡片视图 -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <UCard
          v-for="bookmark in filteredBookmarks"
          :key="bookmark.id"
          class="bookmark-card hover:shadow-default transition-all duration-200 cursor-pointer"
          @click="openBookmark(bookmark)">
          <div class="flex items-start gap-4">
            <img
              :src="`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`"
              :alt="bookmark.title"
              class="w-12 h-12 rounded-lg flex-shrink-0"
              @error="e => (e.target.src = '/favicon-default.png')" />
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-foreground mb-1 truncate">{{ bookmark.title }}</h3>
              <p class="text-sm text-muted-foreground mb-2 truncate">{{ bookmark.description }}</p>
              <div class="flex items-center gap-2 mb-2">
                <UBadge color="neutral" variant="soft" size="xs">{{ bookmark.category }}</UBadge>
                <span class="text-xs text-muted-foreground">{{ bookmark.visitCount }} 次访问</span>
              </div>
              <div class="flex flex-wrap gap-1">
                <UBadge v-for="tag in bookmark.tags" :key="tag" color="primary" variant="outline" size="xs">
                  {{ tag }}
                </UBadge>
              </div>
            </div>
            <UButton
              icon="i-heroicons-ellipsis-vertical"
              variant="ghost"
              color="neutral"
              size="sm"
              @click.stop="showBookmarkMenu(bookmark, $event)" />
          </div>
        </UCard>
      </div>

      <!-- 列表视图 -->
      <div v-else class="space-y-4">
        <UCard
          v-for="bookmark in filteredBookmarks"
          :key="bookmark.id"
          class="bookmark-card hover:shadow-sm transition-all duration-200 cursor-pointer"
          @click="openBookmark(bookmark)">
          <div class="flex items-center gap-4">
            <img
              :src="`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`"
              :alt="bookmark.title"
              class="w-10 h-10 rounded flex-shrink-0"
              @error="e => (e.target.src = '/favicon-default.png')" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="font-semibold text-foreground">{{ bookmark.title }}</h3>
                <UBadge color="neutral" variant="soft" size="xs">{{ bookmark.category }}</UBadge>
              </div>
              <p class="text-sm text-muted-foreground mb-2">{{ bookmark.url }}</p>
              <div class="flex items-center gap-2">
                <div class="flex flex-wrap gap-1">
                  <UBadge v-for="tag in bookmark.tags" :key="tag" color="primary" variant="outline" size="xs">
                    {{ tag }}
                  </UBadge>
                </div>
                <span class="text-xs text-muted-foreground ml-auto">{{ bookmark.visitCount }} 次访问</span>
              </div>
            </div>
            <UButton
              icon="i-heroicons-ellipsis-vertical"
              variant="ghost"
              color="neutral"
              size="sm"
              @click.stop="showBookmarkMenu(bookmark, $event)" />
          </div>
        </UCard>
      </div>

      <!-- 空状态 -->
      <div
        v-if="filteredBookmarks.length === 0"
        class="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <UIcon name="i-heroicons-bookmark" class="text-6xl mb-4" />
        <p class="text-lg mb-2">暂无书签</p>
        <p class="text-sm">开始添加您的第一个书签吧</p>
      </div>
    </div>
  </div>

  <!-- 添加书签模态框 -->
  <UModal v-model:open="showAddBookmarkModal">
    <template #header>
      <h3 class="text-lg font-semibold">添加新书签</h3>
    </template>

    <template #body>
      <div class="space-y-4">
        <UFormField label="标题" required>
          <UInput v-model="newBookmark.title" placeholder="输入书签标题" />
        </UFormField>

        <UFormField label="URL" required>
          <UInput v-model="newBookmark.url" placeholder="https://example.com" />
        </UFormField>

        <UFormField label="描述">
          <UTextarea v-model="newBookmark.description" placeholder="添加简短描述（可选）" :rows="3" />
        </UFormField>

        <UFormField label="分类">
          <USelectMenu v-model="newBookmark.category" :options="categoryOptions" placeholder="选择分类" />
        </UFormField>

        <UFormField label="标签">
          <UInputTags v-model="newBookmark.tags" placeholder="输入标签后按回车" />
        </UFormField>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-2 justify-end">
        <UButton variant="outline" @click="showAddBookmarkModal = false">取消</UButton>
        <UButton color="primary" @click="handleAddBookmark">添加</UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
  // 页面元信息
  definePageMeta({
    layout: 'default',
  });

  // 响应式数据
  const viewMode = ref<'grid' | 'list'>('grid');
  const searchQuery = ref('');
  const sortBy = ref('recent');

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

  const sortOptions = [
    { label: '最近添加', value: 'recent' },
    { label: '最多访问', value: 'visits' },
    { label: '名称排序', value: 'name' },
  ];

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

  // 从布局获取选中的分类
  const selectedCategory = ref('all');

  // 监听来自布局的添加事件
  onMounted(() => {
    window.addEventListener('add-bookmark', () => {
      showAddBookmarkModal.value = true;
    });
  });
</script>
