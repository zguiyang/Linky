与用户的所有聊天、对话、文档都采用中文作为主语言

<!-- OPENSPEC:START -->

# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Nuxt 4 的现代化全栈应用框架，集成了用户认证、数据库操作、API 接口等核心功能。

## 常用开发命令

### 启动开发

```bash
pnpm dev              # 启动开发服务器 (http://localhost:13090)
pnpm build           # 构建生产版本
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
  - `plugins/` - 服务端插件 (数据库连接、日志、存储等)
  - `middleware/` - 服务端中间件
  - `lib/` - 服务端库 (数据库连接、认证、日志等)
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

### 环境配置

- 开发环境: `.env.local`
- 生产环境: `.env.prod`
- 环境模板: `.env.example`
- 开发服务器端口: 13090

### 重要文件说明

- `nuxt.config.ts` - Nuxt 配置，包含模块、运行时配置等
- `drizzle.config.ts` - Drizzle ORM 配置
- `eslint.config.mjs` - ESLint 配置
- `prettier.config.mjs` - Prettier 配置
- `server/plugins/database.ts` - 数据库插件初始化
- `server/plugins/logger.ts` - 日志插件初始化

### 开发规范

- 使用 TypeScript 确保类型安全
- 使用 Zod 进行数据验证
- 代码提交前会自动运行 lint-staged 进行格式化
- 数据库操作必须通过 Drizzle ORM
- API 响应格式统一 (参考 `shared/schemas/common/response.schema.ts`)

### Git Hooks

项目使用 Husky 配置了 Git hooks，主要配置在 `.husky/` 目录，包含代码质量检查和格式化。
