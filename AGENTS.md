<!-- OPENSPEC:START -->

# OpenSpec 说明

本文档为在此项目中工作的 AI 编码助手提供指导。

当请求涉及以下情况时，必须打开 `@/openspec/AGENTS.md`：

- 涉及规划或提案（如 proposal、spec、change、plan 等词汇）
- 引入新功能、重大变更、架构调整或重大性能/安全改进
- 表述模糊，需要在编码前获取权威规范

使用 `@/openspec/AGENTS.md` 了解：

- 如何创建和应用变更提案
- 规范格式和约定
- 项目结构和指南

保留此托管块，以便 'openspec update' 可以刷新说明。

<!-- OPENSPEC:END -->

# AGENTS.md

本文档为在此代码库中工作的 AI 编码助手提供指导。

## 项目信息

**项目名称**: Linky - 个人知识管理系统

**功能模块**:

- 书签管理：高效管理网络书签，支持分类和标签
- 备忘录：记录想法和灵感
- 用户认证：基于 Access Token 的安全认证系统

**技术栈**:

- 后端: AdonisJS 6.x + PostgreSQL + Lucid ORM
- 前端: Vue 3 + Inertia.js + Nuxt UI + TypeScript
- 测试: Japa
- 构建: Vite

**项目特定说明**: 使用 Access Token 认证（非默认 Session）

## 关键文件位置

- 路由定义: `start/routes.ts`
- 页面组件: `inertia/pages/`
- 布局组件: `inertia/layouts/`
- Vue 组件: `inertia/components/`
- 数据库配置: `config/database.ts`
- 环境变量: `.env.example`

## 常用命令

### 开发

```bash
npm run dev              # 启动开发服务器 (端口 3333，支持 HMR)
```

### 代码质量

```bash
npm run typecheck       # TypeScript 类型检查
npm run lint --fix <path>  # 修复指定文件的 Lint 问题
npm test                # 运行所有测试
```

### AdonisJS 生成器（优先使用）

```bash
node ace make:controller <name>    # 创建控制器
node ace make:model <name>         # 创建模型
node ace make:migration <name>     # 创建迁移
```

**完整命令列表**: 运行 `node ace list` 查看所有可用命令

## 代码风格

### 命名约定

- 文件名: `kebab-case` (如 `auth_middleware.ts`)
- 类名/接口: `PascalCase` (如 `UserController`)
- 函数/变量: `camelCase` (如 `getUserData`)
- 常量: `SCREAMING_SNAKE_CASE` (如 `MAX_RETRY_COUNT`)
- Vue 组件名: `PascalCase` (如 `UserProfile.vue`)
- Vue 模板组件使用: `kebab-case` (如 `<u-button>`, `<u-card>`)

### TypeScript 类型

- 显式类型导入: `import type { NextFn } from '@adonisjs/core/types/http'`
- 可选类型使用 `| null` 而非 `undefined`
- 避免使用 `any`，优先使用 `unknown` 或具体类型

### 格式化

- 单引号，不使用分号，缩进 2 空格，行宽 100 字符

### Vue 组件

- 使用 Composition API (`<script setup>`)
- 所有 Nuxt UI 组件和 Vue API 自动导入

## 边界规则

### ✅ 必须做

- 优先使用 `node ace make:*` 命令创建文件，然后手动修改
- 修改数据库结构前先创建迁移文件
- 提交前运行 `npm run lint` 和 `npm run typecheck`
- 所有 AdonisJS 开发遵循 adonisjs skill 指导

### ⚠️ 需要先询问

- 修改认证方式或添加新的认证提供者
- 添加新依赖或更新框架版本
- 数据库重大结构变更（影响现有数据）

### 🚫 禁止做

- 提交 secrets（密钥、密码等）到代码仓库
- 修改 `node_modules/` 或 `vendor/` 目录
- 删除数据或直接操作生产数据库
- 禁用框架中间件或安全机制

## 外部文档引用

### AdonisJS 完整文档

- **命令和用法**: 使用 adonisjs skill 或访问 https://docs.adonisjs.com
- **路由**: 参考 adonisjs skill 的 `basics.md`
- **数据库迁移**: 参考 adonisjs skill 的 `database.md`
- **测试**: 参考 adonisjs skill 的 `testing.md`

### Nuxt UI 组件

- 使用 nuxt-ui MCP 服务查询组件文档和示例
- 在模板中使用 `kebab-case` 命名（如 `<u-button>`, `<u-card>`, `<u-input>`）

### 配置文件

- 路径别名: 见 `package.json` 中的 `imports` 配置
- 环境变量: 见项目根目录的 `.env.example`
- 数据库连接: 见 `config/database.ts`
