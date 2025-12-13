# Mock Data Structure

**Feature**: 书签备忘录管理工具高保真原型设计
**Date**: 2025-12-12
**Purpose**: 定义原型中使用的模拟数据结构

## 1. 数据实体定义（简化版）

### 1.1 书签 (Bookmark)

```javascript
{
  id: 1,
  title: "GitHub",
  url: "https://github.com",
  description: "全球最大的代码托管平台，开发者必备工具",
  thumbnail: "https://images.unsplash.com/photo-1618404738559-9e7b15d4b318?w=400",
  favicon: "https://github.com/favicon.ico",
  tags: ["开发", "代码", "开源"],
  category: "开发工具",
  createdAt: "2024-01-10T09:00:00Z",
  visitCount: 156,
  isFavorite: true
}
```

### 1.2 分类 (Category)

```javascript
{
  id: 1,
  name: "工作",
  description: "与工作相关的书签",
  color: "#3b82f6",
  icon: "💼",
  bookmarkCount: 45,
  parentId: null
}
```

### 1.3 标签 (Tag)

```javascript
{
  id: 1,
  name: "重要",
  color: "#ef4444",
  count: 25
}
```

### 1.4 备忘录 (Memo)

```javascript
{
  id: 1,
  title: "项目要点",
  content: [
    {
      type: "paragraph",
      content: [
        { type: "text", text: "项目的主要功能和技术要点记录。" }
      ]
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "需要关注的时间节点和关键里程碑。" }
      ]
    }
  ],
  bookmarkId: 1,
  createdAt: "2024-01-16T14:20:00Z",
  isPinned: true
}
```

## 2. 完整模拟数据集

### 2.1 书签列表 (15个示例)

```javascript
const mockBookmarks = [
  {
    id: 1,
    title: 'GitHub',
    url: 'https://github.com',
    description: '全球最大的代码托管平台，开发者必备工具',
    thumbnail: 'https://images.unsplash.com/photo-1618404738559-9e7b15d4b318?w=400',
    tags: ['开发', '代码', '开源'],
    category: '开发工具',
    createdAt: '2024-01-10T09:00:00Z',
    visitCount: 156,
    isFavorite: true,
  },
  {
    id: 2,
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    description: '程序员问答社区，解决技术问题的最佳平台',
    thumbnail: 'https://images.unsplash.com/photo-1586953431220-5e1d3f6b27a4?w=400',
    tags: ['问答', '社区', '学习'],
    category: '学习资源',
    createdAt: '2024-01-11T14:30:00Z',
    visitCount: 89,
    isFavorite: false,
  },
  {
    id: 3,
    title: 'Dribbble',
    url: 'https://dribbble.com',
    description: '设计师作品展示平台，获取灵感的重要来源',
    thumbnail: 'https://images.unsplash.com/photo-1586953431220-5e1d3f6b27a5?w=400',
    tags: ['设计', '灵感', 'UI/UX'],
    category: '设计资源',
    createdAt: '2024-01-12T11:15:00Z',
    visitCount: 67,
    isFavorite: false,
  },
  {
    id: 4,
    title: 'Medium',
    url: 'https://medium.com',
    description: '高质量的内容发布平台，深度技术文章',
    thumbnail: 'https://images.unsplash.com/photo-1504711434919-fab6f1d8931e?w=400',
    tags: ['阅读', '文章', '深度'],
    category: '阅读资源',
    createdAt: '2024-01-13T16:45:00Z',
    visitCount: 234,
    isFavorite: true,
  },
  {
    id: 5,
    title: 'Notion',
    url: 'https://notion.so',
    description: '全能的笔记和知识管理工具，组织个人和团队信息',
    thumbnail: 'https://images.unsplash.com/photo-1504711434919-fab6f1d891e?w=400',
    tags: ['笔记', '工具', '效率'],
    category: '效率工具',
    createdAt: '2024-01-14T10:20:00Z',
    visitCount: 178,
    isFavorite: true,
  },
  {
    id: 6,
    title: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    description: '实用优先的CSS框架，快速构建美观界面',
    thumbnail: 'https://images.unsplash.com/photo-1504711434919-fab6f1d891e?w=400',
    tags: ['CSS', '框架', '前端'],
    category: '开发工具',
    createdAt: '2024-01-15T08:30:00Z',
    visitCount: 92,
    isFavorite: false,
  },
  {
    id: 7,
    title: 'Vue.js',
    url: 'https://vuejs.org',
    description: '渐进式JavaScript框架，构建用户界面',
    thumbnail: 'https://images.unsplash.com/photo-1618404738559-9e7b15d4b318?w=400',
    tags: ['JavaScript', '框架', 'Vue'],
    category: '开发工具',
    createdAt: '2024-01-16T09:45:00Z',
    visitCount: 145,
    isFavorite: false,
  },
  {
    id: 8,
    title: 'Figma',
    url: 'https://figma.com',
    description: '协作式界面设计工具，团队设计必备',
    thumbnail: 'https://images.unsplash.com/photo-1586953431220-5e1d3f6b27a4?w=400',
    tags: ['设计', '协作', '工具'],
    category: '设计工具',
    createdAt: '2024-01-17T13:10:00Z',
    visitCount: 56,
    isFavorite: false,
  },
  {
    id: 9,
    title: 'Google Fonts',
    url: 'https://fonts.google.com',
    description: '免费字体库，丰富网站字体选择',
    thumbnail: 'https://images.unsplash.com/photo-1504711434919-fab6f1d891e?w=400',
    tags: ['字体', '资源', '设计'],
    category: '设计资源',
    createdAt: '2024-01-18T07:25:00Z',
    visitCount: 34,
    isFavorite: false,
  },
  {
    id: 10,
    title: 'Dev.to',
    url: 'https://dev.to',
    description: '开发者社区，分享技术经验和见解',
    thumbnail: 'https://images.unsplash.com/photo-1504711434919-fab6f1d891e?w=400',
    tags: ['社区', '博客', '技术'],
    category: '社区资源',
    createdAt: '2024-01-19T15:40:00Z',
    visitCount: 201,
    isFavorite: false,
  },
  {
    id: 11,
    title: 'Product Hunt',
    url: 'https://www.producthunt.com',
    description: '发现最新的产品和工具，保持技术敏感度',
    thumbnail: 'https://images.unsplash.com/photo-1618404738559-9e7b15d4b318?w=400',
    tags: ['发现', '工具', '创新'],
    category: '发现',
    createdAt: '2024-01-20T11:55:00Z',
    visitCount: 123,
    isFavorite: false,
  },
  {
    id: 12,
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    description: '技术新闻和讨论，保持技术前沿视野',
    thumbnail: 'https://images.unsplash.com/photo-1618404738559-9e7b15d4b318?w=400',
    tags: ['新闻', '讨论', '技术'],
    category: '资讯',
    createdAt: '2024-01-21T09:20:00Z',
    visitCount: 267,
    isFavorite: true,
  },
  {
    id: 13,
    title: 'CodePen',
    url: 'https://codepen.io',
    description: '在线代码编辑器，前端代码分享和演示',
    thumbnail: 'https://images.unsplash.com/photo-1504711434919-fab6f1d891e?w=400',
    tags: ['代码', '演示', '分享'],
    category: '开发工具',
    createdAt: '2024-01-22T16:30:00Z',
    visitCount: 89,
    isFavorite: false,
  },
  {
    id: 14,
    title: 'Awwwards',
    url: 'https://www.awwwards.com',
    description: '网站和设计大奖，发现优秀设计案例',
    thumbnail: 'https://images.unsplash.com/photo-1586953431220-5e1d3f6b27a4?w=400',
    tags: ['设计', '案例', '灵感'],
    category: '设计资源',
    createdAt: '2024-01-23T12:45:00Z',
    visitCount: 45,
    isFavorite: false,
  },
  {
    id: 15,
    title: 'npm',
    url: 'https://www.npmjs.com',
    description: 'JavaScript包管理器，生态系统核心',
    thumbnail: 'https://images.unsplash.com/photo-1504711434919-fab6f1d891e?w=400',
    tags: ['包管理', '生态', '工具'],
    category: '开发工具',
    createdAt: '2024-01-24T10:15:00Z',
    visitCount: 198,
    isFavorite: true,
  },
];
```

### 2.2 分类树 (5个主分类)

```javascript
const mockCategories = [
  {
    id: 1,
    name: '工作',
    description: '与工作相关的书签和资源',
    color: '#3b82f6',
    icon: '💼',
    bookmarkCount: 45,
    children: [
      {
        id: 101,
        name: '项目管理',
        color: '#3b82f6',
        bookmarkCount: 15,
      },
      {
        id: 102,
        name: '文档资料',
        color: '#3b82f6',
        bookmarkCount: 20,
      },
      {
        id: 103,
        name: '团队协作',
        color: '#3b82f6',
        bookmarkCount: 10,
      },
    ],
  },
  {
    id: 2,
    name: '学习',
    description: '学习和自我提升相关的资源',
    color: '#10b981',
    icon: '📚',
    bookmarkCount: 38,
    children: [
      {
        id: 201,
        name: '在线课程',
        color: '#10b981',
        bookmarkCount: 12,
      },
      {
        id: 202,
        name: '技术文档',
        color: '#10b981',
        bookmarkCount: 26,
      },
    ],
  },
  {
    id: 3,
    name: '开发工具',
    description: '编程和开发相关的工具网站',
    color: '#f59e0b',
    icon: '🔧',
    bookmarkCount: 52,
    children: [],
  },
  {
    id: 4,
    name: '设计资源',
    description: '设计灵感和工具类网站',
    color: '#ec4899',
    icon: '🎨',
    bookmarkCount: 28,
    children: [],
  },
  {
    id: 5,
    name: '效率工具',
    description: '提高工作和学习效率的工具',
    color: '#8b5cf6',
    icon: '⚡',
    bookmarkCount: 21,
    children: [],
  },
];
```

### 2.3 标签云 (12个常用标签)

```javascript
const mockTags = [
  { id: 1, name: '重要', color: '#ef4444', count: 25 },
  { id: 2, name: '待读', color: '#f59e0b', count: 18 },
  { id: 3, name: '教程', color: '#10b981', count: 22 },
  { id: 4, name: '工具', color: '#6366f1', count: 30 },
  { id: 5, name: '设计', color: '#ec4899', count: 15 },
  { id: 6, name: '开发', color: '#3b82f6', count: 28 },
  { id: 7, name: '代码', color: '#14b8a6', count: 35 },
  { id: 8, name: '学习', color: '#059669', count: 19 },
  { id: 9, name: '社区', color: '#64748b', count: 17 },
  { id: 10, name: '资源', color: '#6b7280', count: 23 },
  { id: 11, name: '创新', color: '#8b5cf6', count: 12 },
  { id: 12, name: '分享', color: '#10b981', count: 14 },
];
```

### 2.4 备忘录列表 (8个示例)

```javascript
const mockMemos = [
  {
    id: 1,
    title: "项目启动清单",
    content: [
      { type: "h2", content: [{ text: "项目启动前准备事项" }] },
      { type: "h3", content: [{ text: "技术选型" }] },
      { type: "ul", content: [{ text: "确定技术栈和框架" }, { text: "搭建开发环境" }] },
      { type: "h3", content: [{ text: "团队准备" }] },
      { type: "ul", content: [{ text: "分配开发人员" }, { text: "建立沟通机制" }] },
      { type: "h3", content: [{ text: "初期规划" }] },
      { type: "ul", content: [{ text: "明确功能范围" }, { text: "制定时间计划" }] }
    ],
    bookmarkId: null,
    createdAt: "2024-01-16T09:00:00Z",
    isPinned: true
  },
  {
    id: 2,
    title: "面试准备",
    content: [
      { type: "h2", content: [{ text: "技术面试重点" }] },
      { type: "h3", content: [{ text: "JavaScript基础" }] },
      { type: "ul", content: [{ text: "原型链和闭包" }, { text: "异步编程" }, { text: "ES6+新特性" }] },
      { type: "h3", content: [{ text: "算法与数据结构" }] },
      { type: "ul", content: [{ text: "常见排序算法" }, { text: "树和图" }, { text: "动态规划" }] },
      { type: "h3", content: [{ text: "项目经验" }] },
      { type: "ul", content: [{ text: "准备3个重点项目" }, { text: "STAR法则表达" }] }
    ],
    bookmarkId: 2,
    createdAt: "2024-01-16T14:30:00Z",
    isPinned: false
  },
  {
    id: 3,
    title: "设计系统文档",
    content: [
      { type: "h2", content: [{ text: "色彩规范" }] },
      { type: "ul", content: [{ text: "主色调：#3b82f6" }, { text: "辅助色：#10b981" }, { text: "中性色：#6b7280" }] },
      { type: "h3", content: [{ text: "间距系统" }] },
      { type: "ul", content: [{ text: "基础间距：8px" }, { text: "常用间距：16px、24px、32px" }] },
      { type: "h3", content: [{ text: "圆角规范" }] },
      { type: "ul", content: [{ text: "小：4px" }, { text: "中：8px" }, { text: "大：16px" }] }
    ],
    bookmarkId: 5,
    createdAt: "2024-01-17T10:00:00Z",
    isPinned: true
  },
  {
    id: 4,
    title: "API接口文档",
    content: [
      { type: "h2", content: [{ text: "REST API设计原则" }] },
      { type: "ul", content: [{ text: "RESTful设计" }, { text: "统一响应格式" }, { text: "版本控制" }] },
      { type: "h3", content: [{ text: "接口规范" }] },
      { type: "ul", content: [{ text: "URL设计规范" }, { text: "请求方法约定" }, { text: "状态码使用" }] }
    ],
    bookmarkId: 6,
    createdAt: "2024-01-18T15:00:00Z",
    isPinned: false
  },
  {
    id: 5,
    title: "会议纪要",
    content: [
      { type: "h2", content: [{ text: "产品讨论会" }] },
      { type: "p", content: [{ text: "日期：2024-01-19" }] },
      { type: "h3", content: [{ text: "讨论要点" }] },
      { type: "ul", content: [{ text: "新功能需求" }, { text: "用户反馈分析" }, { text: "技术可行性评估" }] },
      { type: "p", content: [{ text: "行动计划：" }] },
      { type: "ul", content: [{ text: "优先级1：完成核心功能" }, { text: "优先级2：优化性能" }] }
    ],
    bookmarkId: 3,
    createdAt: "2024-01-19T14:00:00Z",
    isPinned: false
  },
  {
    id: 6,
    title: "学习计划",
    content: [
      { type: "h2", content: [{ text: "第一季度学习目标" }] },
      { type: "h3", content: [{ text: "技术提升" }] },
      { text: [
        { type: "ul", content: [{ text: "深入学习Vue.js源码" }, { text: "学习TypeScript" }, { text: "掌握性能优化" }]
      ] },
      { type: "h3", content: [{ text: "软技能" }] },
      { type: "ul", content: [{ text: "提升沟通能力" }, { text: "项目管理基础" }, { text: "文档编写能力" }] }
    ],
    bookmarkId: 7,
    createdAt: "2024-01-20T09:00:00Z",
    isPinned: false
  },
  {
    id: 7,
    title: "代码片段收集",
    content: [
      { type: "h2", content: [{ text: "常用代码片段" }] },
      { type: "pre", content: [
        { text: "// 防抖函数\n" },
        { text: "const debounce = (func, delay) => {\n" },
        { text: "  let timeoutId;\n" },
        { text: "  return (...args) => {\n" },
        { text: "    clearTimeout(timeoutId);\n" },
        { text: "    timeoutId = setTimeout(() => func(...args), delay);\n" },
        { text: "  };\n" },
        { text: "};" }
      ] },
      { type: "pre", content: [
        { text: "// 数组去重\n" },
        { text: "const uniqueArray = [...new Set(array)];\n" }
      ] },
      { type: "pre", content: [
        { text: "日期格式化\n" },
        { text: "const formatDate = (date) => {\n" },
        { text: "  return new Date(date).toLocaleDateString('zh-CN');\n" },
        { text: "};" }
      ]
    ],
    bookmarkId: 4,
    createdAt: "2024-01-21T11:00:00Z",
    isPinned: false
  },
  {
    id: 8,
    title: "灵感记录",
    content: [
      { type: "h2", content: [{ text: "设计灵感" }] },
      { type: "ul", content: [
        { text: "卡片设计参考：Dribbble上" },
        { text: "色彩搭配：Adobe Color CC" },
        text: "排版参考：Awwards获奖作品" }
      ]
    ],
    bookmarkId: null,
    createdAt: "2024-01-22T13:00:00Z",
    isPinned: false
  }
];
```

## 3. 使用方式

### 在HTML文件中使用

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <script>
      // 直接在页面中定义
      const mockData = {
        bookmarks: mockBookmarks,
        categories: mockCategories,
        tags: mockTags,
        memos: mockMemos,
      };

      // 使用示例
      console.log(mockData.bookmarks[0]);
    </script>
  </body>
</html>
```

### 或者创建独立的JS文件

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <script src="mock-data.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```

### mock-data.js

```javascript
const mockData = {
  bookmarks: mockBookmarks,
  categories: mockCategories,
  tags: mockTags,
  memos: mockMemos,
};

// 导出供其他脚本使用
if (typeof module !== 'undefined') {
  module.exports = mockData;
} else {
  window.mockData = mockData;
}
```

## 4. 数据关系说明

- 每个书签可以有多个标签（通过 tags 数组关联）
- 每个书签只能属于一个分类
- 每个备忘录可以选择关联一个书签
- 分类支持层级结构（通过 parentId 实现）
- 所有时间戳使用 ISO 8601 格式
