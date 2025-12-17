<template>
  <!-- 主内容区 -->
  <div class="h-full flex flex-col">
    <!-- 工具栏 -->
    <div class="sticky top-0 bg-background border-b border-accented px-8 py-4 z-10 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-semibold text-foreground">我的备忘录</h1>
          <UBadge color="neutral" variant="soft">{{ filteredMemos.length }} 个备忘录</UBadge>
        </div>

        <div class="flex items-center gap-3">
          <!-- 搜索框 -->
          <UInput v-model="searchQuery" placeholder="搜索备忘录..." icon="i-heroicons-magnifying-glass" class="w-64" />

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

      <!-- 视图切换和筛选 -->
      <div class="flex items-center gap-4 mb-6">
        <div class="flex items-center gap-2">
          <UButton
            :color="viewFilter === 'all' ? 'primary' : 'neutral'"
            variant="ghost"
            size="sm"
            @click="viewFilter = 'all'">
            全部
          </UButton>
          <UButton
            :color="viewFilter === 'pinned' ? 'primary' : 'neutral'"
            variant="ghost"
            size="sm"
            @click="viewFilter = 'pinned'">
            <UIcon name="i-heroicons-star" class="text-yellow-500" />
            已置顶
          </UButton>
        </div>
      </div>
    </div>

    <!-- 备忘录内容 -->
    <div class="flex-1 p-8 overflow-y-auto">
      <!-- 卡片视图 -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <UCard
          v-for="memo in filteredMemos"
          :key="memo.id"
          class="memo-card hover:shadow-default transition-all duration-200 cursor-pointer relative group"
          :class="{ 'border-l-4 border-l-yellow-500 bg-yellow-50/10 dark:bg-yellow-900/10': memo.pinned }"
          @click="selectMemo(memo)">
          <div class="flex items-start gap-3">
            <div v-if="memo.pinned" class="flex-shrink-0">
              <UIcon name="i-heroicons-star" class="text-yellow-500 text-lg" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-foreground mb-2 truncate">
                {{ memo.title || '无标题备忘录' }}
              </h3>
              <p class="text-sm text-muted-foreground mb-3 line-clamp-3">
                {{ memo.content }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex flex-wrap gap-1">
                  <UBadge v-for="tag in memo.tags.slice(0, 3)" :key="tag" color="primary" variant="outline" size="xs">
                    {{ tag }}
                  </UBadge>
                  <UBadge v-if="memo.tags.length > 3" color="neutral" variant="soft" size="xs">
                    +{{ memo.tags.length - 3 }}
                  </UBadge>
                </div>
                <span class="text-xs text-muted-foreground">{{ formatDate(memo.updatedAt) }}</span>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <UButton
            icon="i-heroicons-ellipsis-vertical"
            variant="ghost"
            color="neutral"
            size="sm"
            class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            @click.stop="showMemoMenu(memo, $event)" />
        </UCard>
      </div>

      <!-- 列表视图 -->
      <div v-else class="space-y-4">
        <UCard
          v-for="memo in filteredMemos"
          :key="memo.id"
          class="memo-card hover:shadow-sm transition-all duration-200 cursor-pointer group"
          :class="{ 'border-l-4 border-l-yellow-500 bg-yellow-50/10 dark:bg-yellow-900/10': memo.pinned }"
          @click="selectMemo(memo)">
          <div class="flex items-center gap-4">
            <div v-if="memo.pinned" class="flex-shrink-0">
              <UIcon name="i-heroicons-star" class="text-yellow-500 text-lg" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="font-semibold text-foreground">
                  {{ memo.title || '无标题备忘录' }}
                </h3>
                <UBadge v-if="memo.category" color="neutral" variant="soft" size="xs">
                  {{ getCategoryName(memo.category) }}
                </UBadge>
              </div>
              <p class="text-sm text-muted-foreground mb-2 line-clamp-2">
                {{ memo.content }}
              </p>
              <div class="flex items-center gap-2">
                <div class="flex flex-wrap gap-1">
                  <UBadge v-for="tag in memo.tags" :key="tag" color="primary" variant="outline" size="xs">
                    {{ tag }}
                  </UBadge>
                </div>
                <span class="text-xs text-muted-foreground ml-auto">{{ formatDate(memo.updatedAt) }}</span>
              </div>
            </div>
            <UButton
              icon="i-heroicons-ellipsis-vertical"
              variant="ghost"
              color="neutral"
              size="sm"
              class="opacity-0 group-hover:opacity-100 transition-opacity"
              @click.stop="showMemoMenu(memo, $event)" />
          </div>
        </UCard>
      </div>

      <!-- 空状态 -->
      <div
        v-if="filteredMemos.length === 0"
        class="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <UIcon name="i-heroicons-document-text" class="text-6xl mb-4" />
        <p class="text-lg mb-2">暂无备忘录</p>
        <p class="text-sm">开始创建您的第一个备忘录吧</p>
      </div>
    </div>
  </div>

  <!-- 编辑器模态框 -->
  <UModal v-model:open="showEditorModal" fullscreen>
    <template #header v-if="selectedMemo">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <h3 class="text-lg font-semibold">
            {{ selectedMemo.title || '无标题备忘录' }}
          </h3>
          <UBadge :color="selectedMemo.pinned ? 'yellow' : 'neutral'" variant="soft">
            <UIcon :name="selectedMemo.pinned ? 'i-heroicons-star' : 'i-heroicons-star'" class="mr-1" />
            {{ selectedMemo.pinned ? '已置顶' : '未置顶' }}
          </UBadge>
        </div>
        <div class="flex items-center gap-2">
          <UButton
            :icon="selectedMemo.pinned ? 'i-heroicons-star' : 'i-heroicons-star'"
            :color="selectedMemo.pinned ? 'yellow' : 'neutral'"
            variant="ghost"
            size="sm"
            @click="togglePin" />
          <UButton icon="i-heroicons-trash" color="red" variant="ghost" size="sm" @click="showDeleteModal = true" />
        </div>
      </div>
    </template>

    <template #body v-if="selectedMemo">
      <div class="space-y-6">
        <!-- 标题输入 -->
        <UInput v-model="selectedMemo.title" placeholder="备忘录标题..." size="xl" class="text-2xl font-bold" />

        <!-- 标签 -->
        <div class="flex items-center gap-2">
          <UInputTags v-model="selectedMemo.tags" placeholder="添加标签..." @change="updateMemo" />
        </div>

        <!-- 内容编辑器 -->
        <div class="relative">
          <UTextarea
            v-model="selectedMemo.content"
            placeholder="开始写作..."
            :rows="15"
            class="text-base leading-relaxed"
            @update:model-value="updateMemo" />
          <div
            class="absolute bottom-4 right-4 text-sm text-muted-foreground bg-background/80 px-2 py-1 rounded backdrop-blur-sm">
            {{ selectedMemo.content.length }} 字
          </div>
        </div>
      </div>
    </template>

    <template #footer v-if="selectedMemo">
      <div class="flex justify-between">
        <span class="text-sm text-muted-foreground">最后更新：{{ formatDate(selectedMemo.updatedAt) }}</span>
        <div class="flex gap-2">
          <UButton variant="outline" @click="showEditorModal = false">关闭</UButton>
          <UButton color="primary" @click="saveMemo">保存</UButton>
        </div>
      </div>
    </template>
  </UModal>

  <!-- 添加/编辑备忘录模态框 -->
  <UModal v-model:open="showAddMemoModal">
    <template #header>
      <h3 class="text-lg font-semibold">{{ editingMemo ? '编辑备忘录' : '新建备忘录' }}</h3>
    </template>

    <template #body>
      <div class="space-y-4">
        <UFormField label="标题">
          <UInput v-model="memoForm.title" placeholder="输入备忘录标题（可选）" />
        </UFormField>

        <UFormField label="内容" required>
          <UTextarea v-model="memoForm.content" placeholder="输入备忘录内容" :rows="6" />
        </UFormField>

        <UFormField label="标签">
          <UInputTags v-model="memoForm.tags" placeholder="输入标签后按回车" />
        </UFormField>

        <UFormField label="分类">
          <USelectMenu v-model="memoForm.category" :options="categoryOptions" placeholder="选择分类" />
        </UFormField>

        <UFormField label="置顶">
          <div class="flex items-center gap-2">
            <UCheckbox v-model="memoForm.pinned" />
            <span class="text-sm text-muted-foreground">将备忘录添加到置顶列表</span>
          </div>
        </UFormField>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-2 justify-end">
        <UButton variant="outline" @click="showAddMemoModal = false">取消</UButton>
        <UButton color="primary" @click="handleSaveMemo">{{ editingMemo ? '更新' : '创建' }}</UButton>
      </div>
    </template>
  </UModal>

  <!-- 删除确认模态框 -->
  <UModal v-model:open="showDeleteModal">
    <template #header>
      <div class="flex items-center gap-3">
        <div class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-50 dark:bg-red-900/20">
          <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h3 class="text-lg font-semibold">删除备忘录</h3>
          <p class="text-sm text-muted-foreground mt-1">此操作无法撤销</p>
        </div>
      </div>
    </template>

    <template #body>
      <p class="text-foreground">
        您确定要删除备忘录 "<strong>{{ selectedMemo?.title || '无标题备忘录' }}</strong
        >" 吗？
      </p>
    </template>

    <template #footer>
      <div class="flex gap-2 justify-end">
        <UButton variant="outline" @click="showDeleteModal = false">取消</UButton>
        <UButton color="red" @click="confirmDelete">删除</UButton>
      </div>
    </template>
  </UModal>
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

  const sortOptions = [
    { label: '最近更新', value: 'recent' },
    { label: '最早创建', value: 'oldest' },
    { label: '标题排序', value: 'name' },
  ];

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

  const getCategoryName = (categoryId: string) => {
    const categoryMap: Record<string, string> = {
      work: '工作',
      study: '学习',
      personal: '个人',
      favorite: '收藏',
    };
    return categoryMap[categoryId] || '未分类';
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

  // 监听来自布局的添加事件
  onMounted(() => {
    window.addEventListener('add-memo', () => {
      createNewMemo();
    });
  });
</script>
