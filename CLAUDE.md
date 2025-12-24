# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Nuxt 4 的现代化全栈应用框架，集成了用户认证、数据库操作、API 接口等核心功能。

## 常用开发命令

### 启动开发

```bash
pnpm dev              # 启动开发服务器 (http://localhost:13090)
pnpm build           # 构建生产版本
pnpm build:local     # 使用本地环境变量构建
pnpm preview         # 预览生产版本
pnpm generate        # 生成静态站点
```

### 数据库操作

```bash
pnpm drizzle:generate  # 生成数据库迁移文件
pnpm drizzle:migrate   # 运行数据库迁移
pnpm drizzle:studio    # 启动 Drizzle Studio 数据库管理工具
```

### 代码质量

```bash
pnpm lint             # 运行 ESLint 检查 (通过 lint-staged)
pnpm format           # 使用 Prettier 格式化代码
```

## 核心架构

### 目录结构说明

- **`app/`** - 前端代码目录
  - `pages/` - 页面组件 (Nuxt 3 文件路由)
  - `components/` - Vue 组件
  - `api/` - API 客户端代码
  - `lib/` - 前端工具库
  - `assets/` - 静态资源
  - `middleware/` - 前端路由中间件
  - `utils/` - 前端工具函数

- **`server/`** - 服务端代码目录
  - `api/` - API 路由 (Nuxt 3 服务端路由)
  - `config/` - 服务端配置 (路由权限配置等)
  - `lib/` - 服务端库 (数据库连接、认证、日志等)
  - `middleware/` - 服务端中间件
  - `plugins/` - 服务端插件 (数据库连接、日志、存储等)
  - `services/` - 业务逻辑服务层
  - `utils/` - 服务端工具函数

- **`shared/`** - 前后端共享代码
  - `tables/` - 数据库表定义 (Drizzle ORM)
  - `schemas/` - 数据验证模式 (Zod)
  - `types/` - TypeScript 类型定义
  - `constants/` - 常量定义

### 技术栈核心

- **前端**: Nuxt 4 + Vue 3 + TypeScript + @nuxt/ui (Tailwind CSS)
- **后端**: Nuxt Server API + PostgreSQL + Drizzle ORM
- **认证**: Better Auth (支持 GitHub、Google 第三方登录)
- **存储**: unstorage + Redis
- **日志**: pino
- **验证**: Zod

### 数据库架构

- 主要数据表定义在 `shared/tables/` 目录
- 使用 Drizzle ORM 进行类型安全的数据库操作
- 数据库连接配置在 `server/lib/db-connection.ts`
- 迁移文件生成到 `./drizzle` 目录

### 认证系统

- 使用 Better Auth 作为认证解决方案
- 认证配置在 `nuxt.config.ts` 的 `runtimeConfig.auth` 中
- 服务端认证逻辑在 `server/lib/auth.ts`
- 服务端认证中间件 `server/middleware/auth.ts`
- 前端认证客户端在 `app/lib/auth-client.ts`
- Better Auth 处理路由: `server/api/auth/[...all].ts`

### 路由权限系统

- 路由权限配置在 `server/config/route-permissions.ts`
- 使用 `path-to-regexp` 进行路由匹配
- 支持公开路由 (`public: true`) 和基于角色的访问控制 (`roles`)
- 服务端中间件会自动检查权限并将 session 添加到 `event.context`
- 可使用 `server/utils/auth-helpers.ts` 中的辅助函数获取当前用户

### 环境配置

- 开发环境: `.env.local`
- 生产环境: `.env.prod`
- 环境模板: `.env.example`
- 开发服务器端口: 13090

### 重要文件说明

- `nuxt.config.ts` - Nuxt 配置，包含模块、运行时配置等
- `drizzle.config.ts` - Drizzle ORM 配置
- `eslint.config.mjs` - ESLint 配置 (继承 Nuxt 默认配置)
- `prettier.config.mjs` - Prettier 配置
- `server/plugins/database.ts` - 数据库插件初始化
- `server/plugins/logger.ts` - 日志插件初始化
- `app/app.config.ts` - Nuxt UI 配置 (颜色主题等)

### 开发规范

- 使用 TypeScript 确保类型安全
- 使用 Zod 进行数据验证
- 代码提交前会自动运行 lint-staged 进行格式化
- 数据库操作必须通过 Drizzle ORM
- API 响应格式统一 (参考 `shared/schemas/common/response.schema.ts`)
- 使用 `app/lib/request.ts` 中的 `request` 工具进行前端 API 调用

## API 路由开发模式

### 基本结构

API 路由位于 `server/api/` 目录，遵循 Nuxt 3 文件路由约定：

```
server/api/
├── auth/
│   └── [...all].ts      # Better Auth 处理所有认证相关请求
└── examples/
    ├── index.get.ts      # GET /api/examples
    ├── index.post.ts     # POST /api/examples
    ├── [id].get.ts       # GET /api/examples/:id
    ├── [id].put.ts       # PUT /api/examples/:id
    ├── [id].delete.ts    # DELETE /api/examples/:id
    └── page.get.ts       # GET /api/examples/page
```

### 获取当前用户

在需要认证的 API 中使用辅助函数：

```typescript
import { getCurrentUser } from '#server/utils/auth-helpers';

export default defineEventHandler(async event => {
  const user = getCurrentUser(event); // 自动验证认证并返回用户
  // 使用 user.id 进行操作
});
```

### 资源权限检查

```typescript
import { checkResourcePermission } from '#server/utils/auth-helpers';

export default defineEventHandler(async event => {
  const user = getCurrentUser(event);
  const resource = await getResource(id);
  checkResourcePermission(resource, user); // 检查 user_id 是否匹配
});
```

### 添加新路由权限

在 `server/config/route-permissions.ts` 中添加配置：

```typescript
export const routePermissions: RoutePermission[] = [
  // 公开路由
  { pattern: '/api/public/*splat', public: true },

  // 需要认证的路由 (默认)
  { pattern: '/api/protected/*splat' },

  // 需要特定角色的路由
  { pattern: '/api/admin/*splat', roles: ['admin'] },
];
```

### Git Hooks

项目使用 Husky 配置了 Git hooks，主要配置在 `.husky/` 目录，包含代码质量检查和格式化。
