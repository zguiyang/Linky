# AGENTS.md

本文档为在此代码库中工作的 AI 编码助手（如 Claude Code）提供指导。

## 项目概述

基于 AdonisJS 的全栈 Web 应用框架，集成用户认证、数据库操作、Inertia.js、Vue 3 等核心功能。

## 常用开发命令

```bash
node ace dev          # 启动开发服务器 (端口 3333)
node ace serve --hmr  # 启动开发服务器（支持热模块替换）
node ace build        # 构建生产版本
node start            # 启动生产服务器
node ace migration:run        # 运行所有待执行的数据库迁移
node ace migration:rollback  # 回滚最近一次迁移
node ace migration:refresh   # 回滚并重新运行所有迁移
node ace make:migration      # 创建新的迁移文件
node ace lint          # 运行 ESLint 检查
node ace format        # 使用 Prettier 格式化代码
npm run typecheck      # 运行 TypeScript 类型检查
npm test               # 运行所有测试
node ace test          # 运行所有测试（Japa）
node ace test tests/unit/some_file.spec.ts    # 运行单个测试文件
node ace test tests/unit/**/*.spec.ts        # 只运行单元测试
node ace test tests/functional/**/*.spec.ts  # 只运行功能测试
```

## 核心架构

### 目录结构

- `app/controllers/` - 控制器
- `app/models/` - Lucid ORM 模型
- `app/middleware/` - HTTP 中间件
- `app/exceptions/` - 异常处理器
- `app/validators/` - Vine.js 数据验证器
- `app/services/` - 业务逻辑服务
- `start/routes.ts` - HTTP 路由定义
- `start/kernel.ts` - HTTP 中间件注册
- `database/migrations/` - 数据库迁移文件
- `inertia/pages/` - Vue 页面组件
- `tests/unit/` - 单元测试（\*.spec.ts）
- `tests/functional/` - 功能测试

### 技术栈

- **后端**: AdonisJS 6.x + PostgreSQL + Lucid ORM
- **前端**: Vue 3 + Inertia.js + TypeScript
- **认证**: AdonisJS Auth（API Token 认证）
- **验证**: Vine.js
- **测试**: Japa

## 代码风格指南

### 导入顺序

1. Node.js 内置模块
2. 第三方库
3. AdonisJS 内部模块（使用 # 别名）
4. 相对路径导入

### 命名约定

- **文件名**: `kebab-case`，例如 `auth_middleware.ts`
- **类名**: `PascalCase`，例如 `AuthMiddleware`
- **接口和类型**: `PascalCase`，例如 `HttpContext`
- **函数和变量**: `camelCase`，例如 `getUserData`
- **常量**: `SCREAMING_SNAKE_CASE`，例如 `MAX_RETRY_COUNT`
- **私有成员**: 下划线前缀 `_`，例如 `_internalMethod`

### TypeScript 类型

- 显式类型导入：`import type { NextFn } from '@adonisjs/core/types/http'`
- 类型声明优先使用 `declare`
- 可选类型使用 `| null` 而非 `undefined`

### 装饰器使用

```typescript
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
```

### 路由定义

```typescript
import router from '@adonisjs/core/services/router'
router.get('/', async ({ inertia }) => inertia.render('home'))
router.post('/users', 'UsersController.store').middleware('auth')
```

### 代码格式化

- 使用 Prettier（继承 `@adonisjs/prettier-config`）
- 缩进：2 空格，单引号，强制使用分号
- 尾随逗号：在多行对象/数组中保留

## 重要注意事项

1. **类型安全**: 始终使用 TypeScript 类型，避免使用 `any`
2. **路径别名**: 使用 `#` 别名导入应用模块（例如 `#models/user`）
3. **迁移优先**: 修改数据库结构前先创建迁移文件
4. **认证检查**: 需要认证的路由使用 `.middleware('auth')`
5. **异步处理**: 所有数据库操作、HTTP 请求必须使用 async/await
6. **错误处理**: 使用 `findOrFail()` 而非 `find()` 来抛出 404
7. **代码提交**: 提交前运行 `node ace lint` 和 `node ace format`

## 常用路径别名

```typescript
#models/*      -> app/models/*
#controllers/* -> app/controllers/*
#middleware/*  -> app/middleware/*
#exceptions/*  -> app/exceptions/*
#validators/*  -> app/validators/*
#services/*    -> app/services/*
#tests/*       -> tests/*
#start/*       -> start/*
#config/*      -> config/*
```
