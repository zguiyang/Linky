<template>
  <workspace-layout>
    <div class="h-full flex flex-col">
      <div
        class="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            我的备忘录
          </h1>
          <span
            class="px-3 py-1 text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300 rounded-full"
            >{{ filteredMemos.length }} 个备忘录</span
          >
        </div>
        <div class="flex items-center gap-4">
          <u-input
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="搜索备忘录..."
            size="md"
          />
          <u-field-group>
            <u-button
              :color="viewMode === 'grid' ? 'primary' : 'neutral'"
              variant="ghost"
              icon="i-heroicons-squares-2x2"
              @click="setViewMode('grid')"
            />
            <u-button
              :color="viewMode === 'list' ? 'primary' : 'neutral'"
              variant="ghost"
              icon="i-heroicons-list-bullet"
              @click="setViewMode('list')"
            />
          </u-field-group>
          <u-select v-model="sortBy" :items="sortOptions" placeholder="排序方式" size="md" />
        </div>
      </div>

      <div class="flex items-center gap-3 px-8 py-4 border-b border-gray-200 dark:border-gray-700">
        <u-button
          :color="viewFilter === 'all' ? 'primary' : 'neutral'"
          variant="soft"
          size="sm"
          @click="viewFilter = 'all'"
        >
          全部
        </u-button>
        <u-button
          :color="viewFilter === 'pinned' ? 'primary' : 'neutral'"
          variant="soft"
          size="sm"
          @click="viewFilter = 'pinned'"
        >
          <template #leading>
            <u-icon
              name="i-heroicons-star"
              :class="{ 'text-amber-500': viewFilter === 'pinned' }"
            />
          </template>
          已置顶
        </u-button>
      </div>

      <div class="flex-1 p-8 overflow-y-auto">
        <div
          v-if="viewMode === 'grid'"
          class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6"
        >
          <div
            v-for="memo in filteredMemos"
            :key="memo.id"
            class="group relative p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50"
            :class="{
              [pinnedMemoClass]: memo.pinned,
            }"
            @click="selectMemo(memo)"
          >
            <div v-if="memo.pinned" class="absolute top-4 right-4 text-[var(--color-warning-500)]">
              <u-icon name="i-heroicons-star" class="w-3.5 h-3.5 fill-current" />
            </div>
            <h3 class="text-[17px] font-semibold text-gray-900 dark:text-white mb-3 pr-6 truncate">
              {{ memo.title || '无标题备忘录' }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5 line-clamp-3">
              {{ memo.content }}
            </p>
            <div class="flex items-center justify-between mt-auto">
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in memo.tags.slice(0, 3)"
                  :key="tag"
                  class="px-2 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300 rounded-md"
                  >{{ tag }}</span
                >
                <span
                  v-if="memo.tags.length > 3"
                  class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-md"
                  >+{{ memo.tags.length - 3 }}</span
                >
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400">{{
                formatDate(memo.updatedAt)
              }}</span>
            </div>
            <u-button
              icon="i-heroicons-ellipsis-horizontal"
              color="neutral"
              variant="ghost"
              size="sm"
              @click.stop="showMemoMenu(memo, $event)"
            />
          </div>
        </div>

        <div v-else class="flex flex-col gap-3">
          <div
            v-for="memo in filteredMemos"
            :key="memo.id"
            class="group relative flex items-start gap-4 p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600"
            :class="{
              [pinnedMemoClass]: memo.pinned,
            }"
            @click="selectMemo(memo)"
          >
            <div v-if="memo.pinned" class="shrink-0 w-6 text-[var(--color-warning-500)] mt-0.5">
              <u-icon name="i-heroicons-star" class="w-3.5 h-3.5 fill-current" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-2">
                {{ memo.title || '无标题备忘录' }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3 line-clamp-2">
                {{ memo.content }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in memo.tags"
                    :key="tag"
                    class="px-2 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300 rounded-md"
                    >{{ tag }}</span
                  >
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{
                  formatDate(memo.updatedAt)
                }}</span>
              </div>
            </div>
            <u-button
              icon="i-heroicons-ellipsis-horizontal"
              color="neutral"
              variant="ghost"
              size="sm"
              @click.stop="showMemoMenu(memo, $event)"
            />
          </div>
        </div>

        <div
          v-if="filteredMemos.length === 0"
          class="flex flex-col items-center justify-center py-16 text-center"
        >
          <div
            class="w-20 h-20 flex items-center justify-center mb-6 text-gray-400 dark:text-gray-500"
          >
            <u-icon name="i-heroicons-document-text" class="w-16 h-16" />
          </div>
          <p class="text-lg font-semibold text-gray-900 dark:text-white mb-2">暂无备忘录</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">开始创建您的第一个备忘录吧</p>
        </div>
      </div>

      <u-modal v-model:open="showEditorModal" title="编辑备忘录">
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ selectedMemo?.title || '无标题备忘录' }}
          </h3>
          <span
            class="ml-4 px-3 py-1 text-xs font-medium bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 rounded-full"
            :class="{ 'opacity-50': !selectedMemo?.pinned }"
          >
            <u-icon
              v-if="selectedMemo?.pinned"
              name="i-heroicons-star"
              class="w-3.5 h-3.5 mr-1 inline fill-current"
            />
            {{ selectedMemo?.pinned ? '已置顶' : '未置顶' }}
          </span>
          <u-button
            :icon="selectedMemo?.pinned ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
            :color="selectedMemo?.pinned ? 'warning' : 'neutral'"
            variant="ghost"
            size="sm"
            :title="selectedMemo?.pinned ? '取消置顶' : '置顶'"
            @click="togglePin"
          />
          <u-button
            icon="i-heroicons-trash"
            color="error"
            variant="ghost"
            size="sm"
            title="删除"
            @click="showDeleteModal = true"
          />
          <u-button
            icon="i-heroicons-x-mark"
            color="neutral"
            variant="ghost"
            size="sm"
            @click="showEditorModal = false"
          />
        </template>

        <template #body>
          <div v-if="selectedMemo" class="space-y-4">
            <div class="shrink-0">
              <u-input v-model="selectedMemo.title" placeholder="备忘录标题..." />
            </div>
            <div class="flex gap-4">
              <tags-input v-model="selectedMemo.tags" />
            </div>
            <div class="flex-1 flex flex-col gap-2">
              <u-textarea v-model="selectedMemo.content" placeholder="开始写作..." />
              <span class="self-end text-xs text-gray-400"
                >{{ selectedMemo.content.length }} 字</span
              >
            </div>
          </div>
        </template>

        <template #footer="{}">
          <u-button color="primary" variant="solid" @click="saveMemo">保存</u-button>
        </template>
      </u-modal>

      <u-modal v-model:open="showAddMemoModal" title="新建备忘录">
        <template #body>
          <u-form-field label="标题" name="title">
            <u-input v-model="memoForm.title" placeholder="输入备忘录标题（可选）" />
          </u-form-field>

          <u-form-field label="内容" name="content">
            <u-textarea v-model="memoForm.content" placeholder="输入备忘录内容" />
          </u-form-field>

          <u-form-field label="标签" name="tags">
            <tags-input v-model="memoForm.tags" />
          </u-form-field>

          <u-form-field label="分类" name="category">
            <u-select v-model="memoForm.category" :items="categoryOptions" placeholder="选择分类" />
          </u-form-field>

          <u-form-field label="置顶" name="pinned">
            <u-checkbox v-model="memoForm.pinned" label="将备忘录添加到置顶列表" />
          </u-form-field>
        </template>

        <template #footer="{ close }">
          <u-button color="neutral" variant="outline" @click="close">取消</u-button>
          <u-button color="primary" variant="solid" @click="handleSaveMemo">创建</u-button>
        </template>
      </u-modal>

      <u-modal v-model:open="showDeleteModal" title="删除备忘录">
        <template #body>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-center">
            您确定要删除备忘录 "<strong class="text-gray-900 dark:text-white">{{
              selectedMemo?.title || '无标题备忘录'
            }}</strong
            >" 吗？
          </p>
        </template>

        <template #footer="{ close }">
          <u-button color="neutral" variant="outline" @click="close">取消</u-button>
          <u-button color="danger" variant="solid" @click="confirmDelete">删除</u-button>
        </template>
      </u-modal>
    </div>
  </workspace-layout>
</template>

<script setup lang="ts">
import WorkspaceLayout from '~/layouts/workspace.vue'
import TagsInput from '~/components/TagsInput.vue'
import { computed, ref } from 'vue'

const searchQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const viewFilter = ref<'all' | 'pinned'>('all')
const selectedMemo = ref<any>(null)
const showAddMemoModal = ref(false)
const showEditorModal = ref(false)
const showDeleteModal = ref(false)
const sortBy = ref('recent')

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
    createdAt: '2024-11-20',
    updatedAt: '2024-12-05',
  },
])

const pinnedMemoClass = computed(() => {
  return 'bg-gradient-to-br from-[var(--color-warning-50)] to-[var(--color-warning-50)] dark:from-[var(--color-warning-900)/60] dark:to-[var(--color-warning-900)/60] border-[var(--color-warning-200)] dark:border-[var(--color-warning-800)]'
})

const memoForm = ref({
  title: '',
  content: '',
  category: '',
  tags: [] as string[],
  pinned: false,
})

const filteredMemos = computed(() => {
  let result = memos.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (m) =>
        m.title.toLowerCase().includes(query) ||
        m.content.toLowerCase().includes(query) ||
        m.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  }

  if (viewFilter.value === 'pinned') {
    result = result.filter((m) => m.pinned)
  }

  if (sortBy.value === 'recent') {
    result = result.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  } else if (sortBy.value === 'oldest') {
    result = result.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  } else if (sortBy.value === 'name') {
    result = result.sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
})

const categoryOptions = [
  { label: '工作', value: 'work' },
  { label: '学习', value: 'study' },
  { label: '生活', value: 'life' },
  { label: '其他', value: 'other' },
]

const sortOptions = [
  { label: '最近更新', value: 'recent' },
  { label: '最早创建', value: 'oldest' },
  { label: '标题排序', value: 'name' },
]

const setViewMode = (mode: 'grid' | 'list') => {
  viewMode.value = mode
}

const selectMemo = (memo: any) => {
  selectedMemo.value = memo
  showEditorModal.value = true
}

const showMemoMenu = (memo: any, _event: MouseEvent) => {
  console.log('Mock: Show menu for memo:', memo)
}

const formatDate = (date: string) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const now = new Date()

  if (year === now.getFullYear() && month === now.getMonth() + 1 && day === now.getDate()) {
    return '今天'
  } else if (
    year === now.getFullYear() &&
    month === now.getMonth() + 1 &&
    day === now.getDate() - 1
  ) {
    return '昨天'
  }

  return `${year}年${month}月${day}日`
}

const togglePin = () => {
  if (selectedMemo.value) {
    selectedMemo.value.pinned = !selectedMemo.value.pinned
  }
}

const saveMemo = () => {
  console.log('Mock: 保存备忘录（仅演示，不实际保存）')
  showEditorModal.value = false
}

const confirmDelete = () => {
  console.log('Mock: 删除备忘录（仅演示，不实际删除）')
  showDeleteModal.value = false
  selectedMemo.value = null
}

const handleSaveMemo = () => {
  if (!memoForm.value.content) {
    return
  }

  const memo = {
    id: memos.value.length + 1,
    title: memoForm.value.title || '无标题备忘录',
    content: memoForm.value.content,
    category: memoForm.value.category,
    tags: memoForm.value.tags,
    pinned: memoForm.value.pinned || false,
    createdAt: new Date().toISOString().split('T')[0] || '',
    updatedAt: new Date().toISOString().split('T')[0] || '',
  }

  memos.value.unshift(memo)
  showAddMemoModal.value = false
  console.log('Mock: 新备忘录已添加（内存中）', memo)

  memoForm.value = {
    title: '',
    content: '',
    category: '',
    tags: [],
    pinned: false,
  }
}
</script>
