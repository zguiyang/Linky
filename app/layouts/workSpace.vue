<template>
  <div class="flex h-screen bg-background">
    <!-- 第一栏：页面级导航 -->
    <nav class="w-16 bg-elevated border-r border-accented flex flex-col items-center py-6">
      <!-- Logo -->
      <div class="mb-10">
        <UIcon name="i-heroicons-bookmark" class="text-primary-600 text-2xl" />
      </div>

      <!-- 页面导航 -->
      <div class="flex-1 flex flex-col items-center">
        <UNavigationMenu
          tooltip
          collapsed
          orientation="vertical"
          :items="navigationItems"
          :ui="{
            link: 'p-2.5 rounded-lg font-medium mx-auto my-4',
            linkLeadingIcon: 'text-xl flex-shrink-0',
          }"
          class="w-full" />
      </div>

      <!-- 底部工具 -->
      <div class="flex flex-col items-center gap-2">
        <div
          class="p-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors">
          <UIcon name="i-heroicons-cog-6-tooth" class="text-xl" />
        </div>
        <div
          class="p-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors">
          <UIcon name="i-heroicons-user" class="text-xl" />
        </div>
        <!-- 主题切换按钮 -->
        <ColorModeButton />
      </div>
    </nav>

    <!-- 第二栏：侧边栏（分类管理） -->
    <aside class="w-80 bg-elevated border-r border-accented overflow-y-auto">
      <!-- 分类树 -->
      <div class="py-8 border-b border-accented">
        <div class="px-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-sm text-foreground">分类</h3>
            <div class="flex gap-0.5">
              <UButton
                icon="i-heroicons-plus"
                variant="ghost"
                color="neutral"
                size="xs"
                @click="showAddCategoryModal = true" />
              <UButton
                icon="i-heroicons-cog-6-tooth"
                variant="ghost"
                color="neutral"
                size="xs"
                @click="showManageCategoriesModal = true" />
            </div>
          </div>
        </div>

        <div class="px-6">
          <ul class="space-y-0.5">
            <li v-for="category in categories" :key="category.id">
              <div
                class="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                :class="{ 'bg-primary/10 text-primary': selectedCategory === category.id }"
                @click="selectCategory(category.id)">
                <div class="flex items-center flex-1">
                  <UIcon
                    :name="category.icon"
                    :class="category.id === 'all' ? 'text-yellow-500' : 'text-muted-foreground'"
                    class="mr-2 text-sm" />
                  <span class="text-sm">{{ category.name }}</span>
                </div>
                <span class="text-xs text-muted-foreground">{{ category.count }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 标签云 -->
      <div class="py-8">
        <div class="px-6 mb-4">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-sm text-foreground">标签</h3>
            <UButton
              icon="i-heroicons-plus"
              variant="ghost"
              color="neutral"
              size="xs"
              @click="showAddTagModal = true" />
          </div>
        </div>

        <div class="px-6">
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="tag in popularTags"
              :key="tag.id"
              :color="selectedTags.includes(tag.id) ? 'primary' : 'neutral'"
              variant="soft"
              class="cursor-pointer hover:opacity-80 transition-opacity"
              @click="toggleTag(tag.id)">
              {{ tag.name }}
              <span class="ml-1 text-xs">({{ tag.count }})</span>
            </UBadge>
          </div>
        </div>
      </div>

      <!-- 添加按钮 -->
      <div class="px-6 py-6">
        <UButton color="primary" size="lg" block @click="handleAddAction">
          <UIcon name="i-heroicons-plus" />
          {{ getAddButtonText() }}
        </UButton>
      </div>
    </aside>

    <!-- 第三栏：主内容区域 -->
    <main class="flex-1 bg-background overflow-y-auto">
      <slot />
    </main>
  </div>

  <!-- 全局搜索模态框 -->
  <UModal v-model:open="showGlobalSearchModal">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-magnifying-glass" class="text-xl" />
        <h3 class="text-lg font-semibold">全局搜索</h3>
      </div>
    </template>

    <template #body>
      <UInput
        v-model="globalSearchQuery"
        placeholder="搜索书签、标签、分类..."
        icon="i-heroicons-magnifying-glass"
        size="lg"
        class="mb-4"
        @keyup.enter="handleGlobalSearch" />

      <div v-if="searchResults.length > 0" class="space-y-2">
        <div
          v-for="result in searchResults"
          :key="result.type + result.id"
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
          @click="showGlobalSearchModal = false">
          <UIcon :name="result.icon" class="text-xl" />
          <div class="flex-1">
            <p class="font-medium">{{ result.title }}</p>
            <p class="text-sm text-muted-foreground">{{ result.description }}</p>
          </div>
          <UBadge color="neutral" variant="soft" size="xs">{{ result.type }}</UBadge>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui';

  const currentRoute = useRoute();
  const showGlobalSearchModal = ref(false);
  const globalSearchQuery = ref('');
  const searchResults = ref<any[]>([]);

  // 导航菜单项
  const navigationItems = ref<NavigationMenuItem[][]>([
    [
      {
        label: '书签',
        icon: 'i-heroicons-bookmark',
        to: '/workspace/bookmarks',
        tooltip: {
          text: '书签',
        },
      },
      {
        label: '备忘录',
        icon: 'i-heroicons-document-text',
        to: '/workspace/memos',
        tooltip: {
          text: '备忘录',
        },
      },
      {
        label: '搜索',
        icon: 'i-heroicons-magnifying-glass',
        click: () => {
          showGlobalSearchModal.value = true;
          globalSearchQuery.value = '';
          searchResults.value = [];
        },
        tooltip: {
          text: '搜索',
        },
      },
    ],
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
  const showManageCategoriesModal = ref(false);
  const showAddTagModal = ref(false);

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
    return currentRoute.path === '/bookmarks' ? '添加书签' : '新建备忘录';
  };

  const handleAddAction = () => {
    if (currentRoute.path === '/bookmarks') {
      // 触发书签页面的添加事件
      const event = new CustomEvent('add-bookmark');
      window.dispatchEvent(event);
    } else if (currentRoute.path === '/memos') {
      // 触发备忘录页面的添加事件
      const event = new CustomEvent('add-memo');
      window.dispatchEvent(event);
    }
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
