# Project Context

## Purpose

Linky 是一个基于 Nuxt 4 的现代化全栈 Web 应用框架，旨在提供快速开发全栈应用的完整解决方案。项目集成了用户认证、数据库操作、API 接口、前后端共享类型等核心功能，为开发者提供开箱即用的开发体验。

## Tech Stack

### 核心框架

- **Nuxt 4** - 基于 Vue 3 的全栈应用框架，支持 SSR/CSR/SSG
- **Vue 3** - 响应式前端框架
- **TypeScript** - 类型安全的 JavaScript 超集

### 前端技术

- **@nuxt/ui** - 基于 Tailwind CSS 的 UI 组件库
- **Tailwind CSS 4** - 原子化 CSS 框架
- **@nuxt/icon** - 图标组件库（支持 Lucide、Heroicons）
- **Vue Router** - 前端路由管理

### 后端技术

- **Nuxt Server API** - 服务端 API 路由
- **PostgreSQL** - 主数据库
- **Drizzle ORM** - 类型安全的数据库 ORM
- **Better Auth** - 现代化认证解决方案
- **Redis** - 缓存和会话存储
- **Pino** - 结构化日志库

### 开发工具

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Husky** - Git hooks 管理
- **lint-staged** - 暂存文件检查

## Project Conventions

### Code Style

#### 命名规范

- **文件命名**：
  - Vue 组件：PascalCase（如 `ExamplesFormDialog.vue`）
  - TypeScript 文件：kebab-case（如 `use-pagination.ts`）
  - API 路由：遵循 Nuxt 约定（如 `examples/[id].get.ts`）

- **变量命名**：
  - 变量和函数：camelCase
  - 常量：UPPER_SNAKE_CASE
  - 类和接口：PascalCase

- **组件命名**：
  - Vue 组件使用 PascalCase
  - 组件文件名与组件名保持一致

#### 代码组织

- 使用 TypeScript 进行类型安全开发
- 所有 API 响应必须使用统一的响应格式（参考 `shared/schemas/common/response.schema.ts`）
- 数据库操作必须通过 Drizzle ORM
- 使用 Zod 进行数据验证

### Architecture Patterns

#### 目录结构

```
├── app/              # 前端代码
│   ├── pages/        # 页面组件（文件路由）
│   ├── components/   # Vue 组件
│   ├── api/          # API 客户端
│   ├── lib/          # 前端工具库
│   ├── middleware/   # 前端路由中间件
│   └── utils/        # 前端工具函数
├── server/           # 服务端代码
│   ├── api/          # API 路由
│   ├── plugins/      # 服务端插件
│   ├── lib/          # 服务端库
│   ├── services/     # 业务逻辑服务
│   ├── middleware/   # 服务端中间件
│   └── utils/        # 服务端工具函数
└── shared/           # 前后端共享代码
    ├── tables/       # 数据库表定义
    ├── schemas/      # 数据验证模式
    ├── types/        # TypeScript 类型定义
    └── constants/    # 常量定义
```

#### 数据流模式

- 使用 Nuxt 的 `useFetch` 和 `useAsyncData` 进行数据获取
- 统一的 API 错误处理和响应格式
- 前后端共享类型定义，确保类型一致性

#### 认证流程

- 使用 Better Auth 处理用户认证
- 支持邮箱密码登录和第三方 OAuth（GitHub、Google）
- 认证中间件保护需要权限的路由

### Testing Strategy

当前项目尚未配置测试框架，但建议：

- 使用 `@nuxt/test-utils` 进行组件测试
- API 端点测试
- 数据库操作测试
- 认证流程测试

### Git Workflow

#### 分支策略

- `main` - 主分支，用于生产环境
- `develop` - 开发分支，用于集成新功能
- `feature/*` - 功能分支
- `bugfix/*` - 修复分支
- `hotfix/*` - 紧急修复分支

#### 提交规范

提交信息应清晰描述更改内容：

```
<type>(<scope>): <subject>

<body>

<footer>
```

类型包括：

- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档
- `style`: 格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

#### Git Hooks

- **Pre-commit**: 运行 `pnpm lint` 进行代码格式化和检查
- 使用 Husky 管理 Git hooks
- 通过 lint-staged 只检查暂存的文件

## Domain Context

Linky 是一个通用的全栈应用开发框架，适合构建：

- Web 应用程序
- 管理后台系统
- API 服务
- 需要 SSR/SSG 的内容展示网站

核心功能模块：

- 用户认证和授权
- 数据库 CRUD 操作
- 文件上传和管理
- 日志记录和监控

## Important Constraints

### 技术约束

- 必须使用 TypeScript 开发
- 数据库操作必须通过 Drizzle ORM
- 前端必须使用 @nuxt/ui 组件库
- API 必须返回统一的响应格式

### 性能约束

- 页面首次加载时间 < 2 秒
- API 响应时间 < 500ms
- 支持服务端渲染（SSR）

### 安全约束

- 所有 API 端点需要适当的认证和授权
- 敏感信息必须通过环境变量管理
- 使用 HTTPS 传输
- 输入数据必须经过验证

## External Dependencies

### 认证服务

- **GitHub OAuth** - 第三方登录
- **Google OAuth** - 第三方登录

### 数据库服务

- **PostgreSQL** - 主数据库
- **Redis** - 缓存和会话存储

### 部署平台

- 支持所有 Nuxt 4 兼容的部署平台
- 环境变量配置通过 `.env.local`（开发）和 `.env.prod`（生产）

### API 依赖

- 暂无外部 API 依赖，但架构支持扩展

### 开发工具依赖

- **Node.js** - 运行时环境
- **pnpm** - 包管理器（推荐）
- **PostgreSQL** - 开发环境数据库
- **Redis** - 开发环境缓存
