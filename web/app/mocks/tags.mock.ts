export interface MockTag {
  id: number
  name: string
  color: string | null
  userId: number
  isAiGenerated: boolean
  bookmarksCount: number
  memosCount: number
  createdAt: string
  updatedAt: string | null
}

export interface MockBookmark {
  id: number
  title: string
  url: string
  description: string | null
  visit_count: number
  user_id: number
  tags: MockTag[]
  status: 'fetching' | 'active' | 'archived'
  created_at: string
  updated_at: string | null
}

export interface MockMemo {
  id: number
  title: string
  content: string
  isPinned: boolean
  userId: number
  tags: MockTag[]
  createdAt: string
  updatedAt: string | null
}

export interface MockRelatedTag extends MockTag {
  cooccurrenceCount: number
}

const baseTagData = [
  {
    name: 'React',
    color: '#3B82F6',
    userId: 1,
    isAiGenerated: false,
    bookmarksCount: 12,
    memosCount: 8,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-20T15:30:00.000Z'
  },
  {
    name: 'Vue',
    color: '#10B981',
    userId: 1,
    isAiGenerated: false,
    bookmarksCount: 8,
    memosCount: 5,
    createdAt: '2024-01-18T14:20:00.000Z',
    updatedAt: null
  },
  {
    name: 'TypeScript',
    color: '#8B5CF6',
    userId: 1,
    isAiGenerated: false,
    bookmarksCount: 15,
    memosCount: 12,
    createdAt: '2024-01-20T09:00:00.000Z',
    updatedAt: null
  },
  {
    name: 'Design',
    color: '#F59E0B',
    userId: 1,
    isAiGenerated: false,
    bookmarksCount: 6,
    memosCount: 4,
    createdAt: '2024-01-22T16:45:00.000Z',
    updatedAt: '2024-01-25T11:20:00.000Z'
  },
  {
    name: 'Productivity',
    color: null,
    userId: 1,
    isAiGenerated: false,
    bookmarksCount: 10,
    memosCount: 6,
    createdAt: '2024-01-25T08:30:00.000Z',
    updatedAt: null
  },
  {
    name: 'AI',
    color: '#EC4899',
    userId: 1,
    isAiGenerated: false,
    bookmarksCount: 20,
    memosCount: 15,
    createdAt: '2024-01-28T13:15:00.000Z',
    updatedAt: null
  },
  {
    name: 'Backend',
    color: '#6366F1',
    userId: 1,
    isAiGenerated: false,
    bookmarksCount: 9,
    memosCount: 7,
    createdAt: '2024-02-01T10:00:00.000Z',
    updatedAt: null
  },
  {
    name: 'DevOps',
    color: '#14B8A6',
    userId: 1,
    isAiGenerated: false,
    bookmarksCount: 5,
    memosCount: 3,
    createdAt: '2024-02-03T15:45:00.000Z',
    updatedAt: null
  }
]

const mockTags: MockTag[] = baseTagData.map((tag, index) => ({
  ...tag,
  id: index + 1
}))

const mockBookmarks: MockBookmark[] = [
  {
    id: 1,
    title: 'React 官方文档',
    url: 'https://react.dev',
    description: 'React 官方文档，学习 React 的最佳资源',
    visit_count: 25,
    user_id: 1,
    tags: [mockTags[0] as MockTag, mockTags[2] as MockTag],
    status: 'active',
    created_at: '2024-01-15T10:00:00.000Z',
    updated_at: null
  },
  {
    id: 2,
    title: 'Vue 3 官方文档',
    url: 'https://vuejs.org',
    description: 'Vue 3 官方文档，渐进式 JavaScript 框架',
    visit_count: 18,
    user_id: 1,
    tags: [mockTags[1] as MockTag, mockTags[2] as MockTag],
    status: 'active',
    created_at: '2024-01-18T14:20:00.000Z',
    updated_at: null
  },
  {
    id: 3,
    title: 'TypeScript 官方文档',
    url: 'https://www.typescriptlang.org/',
    description: 'TypeScript 官方文档，JavaScript 的超集',
    visit_count: 30,
    user_id: 1,
    tags: [mockTags[2] as MockTag],
    status: 'active',
    created_at: '2024-01-20T09:00:00.000Z',
    updated_at: null
  },
  {
    id: 4,
    title: 'Figma 设计工具',
    url: 'https://www.figma.com',
    description: '协作式界面设计工具',
    visit_count: 15,
    user_id: 1,
    tags: [mockTags[3] as MockTag],
    status: 'active',
    created_at: '2024-01-22T16:45:00.000Z',
    updated_at: null
  },
  {
    id: 5,
    title: 'Notion 笔记工具',
    url: 'https://www.notion.so',
    description: 'All-in-one 工作空间',
    visit_count: 22,
    user_id: 1,
    tags: [mockTags[4] as MockTag],
    status: 'active',
    created_at: '2024-01-25T08:30:00.000Z',
    updated_at: null
  },
  {
    id: 6,
    title: 'OpenAI 官网',
    url: 'https://openai.com',
    description: 'OpenAI 官方网站，了解最新的 AI 技术',
    visit_count: 35,
    user_id: 1,
    tags: [mockTags[5] as MockTag],
    status: 'active',
    created_at: '2024-01-28T13:15:00.000Z',
    updated_at: null
  }
]

const mockMemos: MockMemo[] = [
  {
    id: 1,
    title: 'React Hooks 最佳实践',
    content: '1. 使用 useCallback 优化函数引用\n2. 使用 useMemo 优化计算属性\n3. 避免在 useEffect 中直接使用状态\n4. 合理使用依赖数组',
    isPinned: true,
    userId: 1,
    tags: [mockTags[0] as MockTag, mockTags[2] as MockTag],
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: null
  },
  {
    id: 2,
    title: 'Vue 3 Composition API 学习笔记',
    content: 'Composition API 提供了更好的代码组织和复用能力\n关键特性：\n- setup() 函数\n- ref 和 reactive\n- computed 和 watch\n- 生命周期钩子',
    isPinned: false,
    userId: 1,
    tags: [mockTags[1] as MockTag],
    createdAt: '2024-01-18T14:20:00.000Z',
    updatedAt: null
  },
  {
    id: 3,
    title: 'TypeScript 类型系统学习',
    content: 'TypeScript 的类型系统非常强大\n- 基础类型：string, number, boolean\n- 高级类型：泛型、联合类型、交叉类型\n- 类型推断和类型守卫',
    isPinned: true,
    userId: 1,
    tags: [mockTags[2] as MockTag],
    createdAt: '2024-01-20T09:00:00.000Z',
    updatedAt: null
  },
  {
    id: 4,
    title: 'UI 设计原则',
    content: '优秀的设计应该遵循以下原则：\n1. 一致性\n2. 可读性\n3. 可访问性\n4. 响应式设计\n5. 性能优化',
    isPinned: false,
    userId: 1,
    tags: [mockTags[3] as MockTag],
    createdAt: '2024-01-22T16:45:00.000Z',
    updatedAt: null
  },
  {
    id: 5,
    title: 'AI 辅助编程工具',
    content: '当前流行的 AI 编程助手：\n1. GitHub Copilot\n2. ChatGPT\n3. Claude\n4. Cursor\n\n如何更好地使用这些工具？\n- 提供清晰的上下文\n- 分步骤描述需求\n- 检查生成的代码',
    isPinned: true,
    userId: 1,
    tags: [mockTags[5] as MockTag],
    createdAt: '2024-01-28T13:15:00.000Z',
    updatedAt: null
  }
]

const baseRelatedTagData = [
  {
    name: 'Vue',
    color: '#10B981',
    userId: 1,
    isAiGenerated: false,
    bookmarksCount: 8,
    memosCount: 5,
    createdAt: '2024-01-18T14:20:00.000Z',
    updatedAt: null,
    cooccurrenceCount: 8
  },
  {
    name: 'TypeScript',
    color: '#8B5CF6',
    userId: 1,
    isAiGenerated: false,
    bookmarksCount: 15,
    memosCount: 12,
    createdAt: '2024-01-20T09:00:00.000Z',
    updatedAt: null,
    cooccurrenceCount: 6
  },
  {
    name: 'Backend',
    color: '#6366F1',
    userId: 1,
    isAiGenerated: false,
    bookmarksCount: 9,
    memosCount: 7,
    createdAt: '2024-02-01T10:00:00.000Z',
    updatedAt: null,
    cooccurrenceCount: 4
  },
  {
    name: 'Productivity',
    color: null,
    userId: 1,
    isAiGenerated: false,
    bookmarksCount: 10,
    memosCount: 6,
    createdAt: '2024-01-25T08:30:00.000Z',
    updatedAt: null,
    cooccurrenceCount: 3
  }
]

const mockRelatedTags: MockRelatedTag[] = baseRelatedTagData.map((tag, index) => ({
  id: index + 1,
  name: tag.name,
  color: tag.color,
  userId: tag.userId,
  isAiGenerated: tag.isAiGenerated,
  bookmarksCount: tag.bookmarksCount,
  memosCount: tag.memosCount,
  createdAt: tag.createdAt,
  updatedAt: tag.updatedAt,
  cooccurrenceCount: tag.cooccurrenceCount
}))

export { mockTags, mockBookmarks, mockMemos, mockRelatedTags }
