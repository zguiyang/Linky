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
          <div class="inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <u-button
              :color="viewMode === 'masonry' ? 'primary' : 'neutral'"
              :variant="viewMode === 'masonry' ? 'solid' : 'ghost'"
              size="sm"
              icon="i-heroicons-view-columns"
              @click="setViewMode('masonry')"
            />
            <u-button
              :color="viewMode === 'grid' ? 'primary' : 'neutral'"
              :variant="viewMode === 'grid' ? 'solid' : 'ghost'"
              size="sm"
              icon="i-heroicons-squares-2x2"
              @click="setViewMode('grid')"
            />
            <u-button
              :color="viewMode === 'list' ? 'primary' : 'neutral'"
              :variant="viewMode === 'list' ? 'solid' : 'ghost'"
              size="sm"
              icon="i-heroicons-list-bullet"
              @click="setViewMode('list')"
            />
          </div>
          <u-select
            v-model="sortBy"
            :items="sortOptions"
            placeholder="排序方式"
            :popper="{ strategy: 'fixed' }"
            size="md"
          />
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
          v-if="viewMode === 'masonry'"
          class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          <memo-card
            v-for="memo in filteredMemos"
            :key="memo.id"
            :memo="memo"
            view-mode="masonry"
            @edit="openEditor"
          />
        </div>

        <div
          v-else-if="viewMode === 'grid'"
          class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6"
        >
          <memo-card
            v-for="memo in filteredMemos"
            :key="memo.id"
            :memo="memo"
            view-mode="grid"
            @edit="openEditor"
          />
        </div>

        <div v-else class="flex flex-col gap-2">
          <memo-card
            v-for="memo in filteredMemos"
            :key="memo.id"
            :memo="memo"
            view-mode="list"
            class="w-full"
            @edit="openEditor"
          />
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
        <template #title>
          <span class="sr-only">编辑备忘录</span>
        </template>
        <template #header="{ close }">
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {{ selectedMemo?.title || '无标题备忘录' }}
            </h3>
            <span
              class="shrink-0 px-3 py-1 text-xs font-medium bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 rounded-full"
              :class="{ 'opacity-50': !selectedMemo?.pinned }"
            >
              <u-icon
                v-if="selectedMemo?.pinned"
                name="i-heroicons-star-solid"
                class="w-3.5 h-3.5 mr-1 inline fill-current"
              />
              {{ selectedMemo?.pinned ? '已置顶' : '未置顶' }}
            </span>
          </div>
          <div class="flex items-center gap-1">
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
              @click="close"
            />
          </div>
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
              <UEditor
                v-model="selectedMemo.content"
                content-type="markdown"
                :editable="true"
                class="min-h-48"
              >
                <template #default="{ editor }">
                  <UEditorToolbar :editor="editor" :items="toolbarItems" layout="bubble" />
                </template>
              </UEditor>
            </div>
          </div>
        </template>

        <template #footer="{}">
          <u-button color="primary" variant="solid" @click="saveMemo">保存</u-button>
        </template>
      </u-modal>

      <u-modal v-model:open="showAddMemoModal" title="新建备忘录">
        <template #title>
          <span class="sr-only">新建备忘录</span>
        </template>
        <template #body="{ close }">
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
            <u-select
              v-model="memoForm.category"
              :items="categoryOptions"
              placeholder="选择分类"
              :popper="{ strategy: 'fixed' }"
            />
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
        <template #title>
          <span class="sr-only">删除备忘录</span>
        </template>
        <template #body="{ close }">
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
import MemoCard from '~/components/MemoCard.vue'
import { computed, ref } from 'vue'
import type { EditorToolbarItem } from '@nuxt/ui'

const searchQuery = ref('')
const viewMode = ref<'masonry' | 'grid' | 'list'>('masonry')
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
      'Vue 3 的组合式 API 是一种新的编写组件逻辑的方式。通过 setup() 函数，我们可以使用响应式 API 来组织组件的逻辑。这种方式使得逻辑可以更好地复用，也使得代码更加清晰和易于维护。组合式 API 包括 ref、computed、watch、watchEffect 等函数。',
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
  {
    id: 4,
    title: '读书笔记',
    content:
      '《关键在于理解用户的需求和使用场景。设计师应该站在用户的角度思考问题，而不是仅仅关注技术和功能。',
    tags: ['读书', '设计', '笔记'],
    category: 'life',
    pinned: true,
    createdAt: '2024-12-10',
    updatedAt: '2024-12-14',
  },
  {
    id: 5,
    title: '购物清单',
    content: '牛奶、面包、鸡蛋、水果、蔬菜',
    tags: ['生活', '购物'],
    category: 'life',
    pinned: false,
    createdAt: '2024-12-14',
    updatedAt: '2024-12-14',
  },
  {
    id: 6,
    title: '技术调研 - CSS Grid vs Flexbox',
    content:
      'CSS Grid 和 Flexbox 都是现代 CSS 布局的重要工具。Flexbox 适用于一维布局（行或列），而 Grid 适用于二维布局（行和列）。在实际项目中，我们需要根据具体需求选择合适的布局方式。Grid 在创建复杂网格布局时更加强大，而 Flexbox 在处理组件内部布局时更加灵活。',
    tags: ['CSS', '前端', '技术调研'],
    category: 'study',
    pinned: false,
    createdAt: '2024-12-08',
    updatedAt: '2024-12-12',
  },
  {
    id: 7,
    title: '会议记录',
    content:
      '本周团队会议要点：1. 确认了 Q1 目标；2. 分配了各成员的任务；3. 确定了每周例会时间；4. 讨论了技术债务问题需要在下个迭代中处理。会议效率很高，大家对下一步工作有了清晰的认识。',
    tags: ['会议', '工作'],
    category: 'work',
    pinned: false,
    createdAt: '2024-12-13',
    updatedAt: '2024-12-13',
  },
  {
    id: 8,
    title: '灵感闪现',
    content:
      '也许可以做一个基于 AI 的笔记助手，自动提取关键信息和生成摘要。这个想法很有潜力，需要进一步调研可行性。',
    tags: ['灵感', 'AI', '产品'],
    category: 'other',
    pinned: true,
    createdAt: '2024-12-11',
    updatedAt: '2024-12-15',
  },
  {
    id: 9,
    title: '周末计划',
    content:
      '周六：睡到自然醒，下午去图书馆还书，晚上看电影。周日：上午跑步，下午整理房间，晚上准备下周工作。',
    tags: ['计划', '周末'],
    category: 'life',
    pinned: false,
    createdAt: '2024-12-12',
    updatedAt: '2024-12-12',
  },
  {
    id: 10,
    title: '代码规范提醒',
    content:
      '团队代码规范更新：1. 所有组件必须使用 TypeScript；2. 提交代码前必须运行 lint 和 typecheck；3. 命名使用 kebab-case；4. 组件文件使用 PascalCase；5. 常量使用 SCREAMING_SNAKE_CASE。请各位同事注意遵守。',
    tags: ['规范', '代码', '团队'],
    category: 'work',
    pinned: false,
    createdAt: '2024-12-09',
    updatedAt: '2024-12-14',
  },
  {
    id: 11,
    title: '短笔记',
    content: '今天天气不错，适合外出散步。',
    tags: [],
    category: 'life',
    pinned: false,
    createdAt: '2024-12-15',
    updatedAt: '2024-12-15',
  },
  {
    id: 12,
    title: '深度思考 - 关于职业发展',
    content:
      '最近在思考职业发展方向的问题。从初级开发者到高级开发者，需要不仅仅是技术能力的提升，还需要培养系统思维、沟通能力和项目管理能力。技术深度和广度需要平衡发展，不能只关注某一方面。另外，软技能的培养同样重要，比如如何有效地与团队协作、如何表达自己的观点、如何处理冲突等。这些能力往往决定了一个人能否走得更远。职业发展是一个长期的过程，需要持续学习和反思。',
    tags: ['思考', '职业', '成长'],
    category: 'other',
    pinned: false,
    createdAt: '2024-12-07',
    updatedAt: '2024-12-13',
  },
])

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

const toolbarItems = [
  [
    { kind: 'bold', icon: 'i-lucide-bold', tooltip: { text: '加粗' } },
    { kind: 'italic', icon: 'i-lucide-italic', tooltip: { text: '斜体' } },
    { kind: 'strike', icon: 'i-lucide-strikethrough', tooltip: { text: '删除线' } },
    { kind: 'code', icon: 'i-lucide-code', tooltip: { text: '行内代码' } },
  ],
  [
    { kind: 'bulletList', icon: 'i-lucide-list', tooltip: { text: '无序列表' } },
    { kind: 'orderedList', icon: 'i-lucide-list-ordered', tooltip: { text: '有序列表' } },
  ],
] satisfies EditorToolbarItem[][]

const setViewMode = (mode: 'masonry' | 'grid' | 'list') => {
  viewMode.value = mode
}

const openEditor = (memo: any) => {
  selectedMemo.value = { ...memo }
  showEditorModal.value = true
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
