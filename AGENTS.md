# AGENTS.md

本文档为在此代码库中工作的 AI 编码助手（如 Claude Code）提供指导。

## 项目概述

基于 AdonisJS 6.x 的全栈 Web 应用框架，集成用户认证、数据库操作、Inertia.js、Vue 3 和 Nuxt UI 等核心功能。采用前后端一体化架构，TypeScript 开发。

## 常用开发命令

```bash
# 开发和构建
npm run dev              # 启动开发服务器 (端口 3333，支持 HMR)
node ace serve --hmr     # 启动开发服务器（支持热模块替换）
node ace build           # 构建生产版本
npm start                # 启动生产服务器

# AdonisJS 代码生成
# 所有 make:* 命令请参考 adonisjs skill 的 commands.md 和 database.md
# 示例：
# node ace make:controller UserController           # 创建控制器
# node ace make:model User                          # 创建模型
# node ace make:migration create_users_table        # 创建数据库迁移
# node ace make:validator CreateUserValidator       # 创建验证器
# node ace make:middleware AuthMiddleware            # 创建中间件

# 数据库迁移
node ace migration:run           # 运行所有待执行的数据库迁移
node ace migration:rollback      # 回滚最近一次迁移
node ace migration:refresh       # 回滚并重新运行所有迁移
node ace migration:fresh         # 清空数据库并运行所有迁移（开发环境）

# 代码质量
node ace lint           # 运行 ESLint 检查
node ace format         # 使用 Prettier 格式化代码
npm run typecheck       # 运行 TypeScript 类型检查

# 测试
npm test                # 运行所有测试
node ace test           # 运行所有测试（Japa）
node ace test tests/unit/some_file.spec.ts    # 运行单个测试文件
node ace test tests/unit/**/*.spec.ts        # 只运行单元测试
node ace test tests/functional/**/*.spec.ts  # 只运行功能测试
node ace test --grep="测试名称"               # 运行匹配名称的测试
```

## 核心架构

### 目录结构

```
app/
  controllers/          # HTTP 请求控制器
  models/               # Lucid ORM 数据模型
  middleware/           # HTTP 中间件
  exceptions/           # 异常处理器
  validators/           # Vine.js 数据验证器
  services/             # 业务逻辑服务
  mails/                # 邮件模板
  listeners/            # 事件监听器
  events/               # 事件定义
  policies/             # 授权策略
  abilities/            # 能力定义

start/
  routes.ts             # HTTP 路由定义
  kernel.ts             # 中间件注册

inertia/
  pages/                # Vue 页面组件
  layouts/              # Vue 布局组件
  components/           # Vue 组件
  app/                  # 前端入口文件
  css/                  # 样式文件

database/
  migrations/           # 数据库迁移文件

tests/
  unit/                 # 单元测试 (*.spec.ts)
  functional/           # 功能测试
```

### 技术栈

- **后端**: AdonisJS 6.x + PostgreSQL + Lucid ORM
- **前端**: Vue 3 + Inertia.js + Nuxt UI + TypeScript
- **UI 库**: Nuxt UI (基于 Tailwind CSS)
- **认证**: AdonisJS Auth（API Token 认证）
- **验证**: Vine.js
- **测试**: Japa
- **构建**: Vite

## 代码风格指南

### 导入顺序

1. Node.js 内置模块（如 `import { readFileSync } from 'fs'`）
2. 第三方库（如 `import vine from '@vinejs/vine'`）
3. AdonisJS 内部模块（使用 # 别名，如 `import User from '#models/user'`）
4. 相对路径导入（如 `import { helper } from './utils'`）

### 命名约定

- **文件名**: `kebab-case`，例如 `auth_middleware.ts`
- **类名**: `PascalCase`，例如 `AuthMiddleware`
- **接口和类型**: `PascalCase`，例如 `HttpContext`
- **函数和变量**: `camelCase`，例如 `getUserData`
- **常量**: `SCREAMING_SNAKE_CASE`，例如 `MAX_RETRY_COUNT`
- **私有成员**: 下划线前缀 `_`，例如 `_internalMethod`
- **Vue 组件文件**: `PascalCase`，例如 `UserProfile.vue`
- **Vue 组件名**: `PascalCase`，在多单词组件中必须包含
- **Vue 模板中组件使用**: `kebab-case`，例如 `<u-button>` 而非 `<UButton>`

### TypeScript 类型

- 显式类型导入：`import type { NextFn } from '@adonisjs/core/types/http'`
- 类型声明优先使用 `declare` 关键字
- 可选类型使用 `| null` 而非 `undefined`
- 避免使用 `any`，优先使用 `unknown` 或具体类型

### 装饰器使用

```typescript
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
```

### 路由定义

```typescript
import router from '@adonisjs/core/services/router'

// 静态 Inertia 页面
router.on('/').renderInertia('home')

// 控制器路由
router.get('/users', 'UsersController.index').middleware('auth')
router.resource('/bookmarks', 'BookmarksController').middleware('auth')
```

详细的路由用法请参考 adonisjs skill 的 basics.md。

### 数据库迁移

```typescript
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookmarks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('title').notNullable()
      table.string('url').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

### Vue 组件开发

```vue
<template>
  <div class="component">
    <slot />
  </div>
</template>

<script setup lang="ts">
// 所有 Nuxt UI 组件和 Vue API 自动导入，无需手动导入

const count = ref(0)
const doubleCount = computed(() => count.value * 2)
</script>

<style scoped>
/* 使用 Tailwind CSS 类名 */
.component {
  @apply p-4 bg-white rounded-lg;
}
</style>
```

### 错误处理

```typescript
// 控制器中使用 findOrFail 抛出 404
const user = await User.findOrFail(id)

// 使用 Vine.js 验证请求
const payload = await vine.validate(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
  }),
  request.all()
)

// 异常在 app/exceptions/handler.ts 中统一处理
```

### 代码格式化

- 使用 Prettier（继承 `@adonisjs/prettier-config`）
- 缩进：2 空格
- 引号：单引号
- 分号：强制使用
- 尾随逗号：在多行对象/数组中保留
- 行宽：100 字符

### 中间件使用

```typescript
// 路由级别
router.get('/protected', 'ProtectedController.index').middleware('auth')

// 全局中间件在 start/kernel.ts 中注册
```

## Nuxt UI 使用

使用 nuxt-ui skill 和 nuxt-ui MCP 工具获取组件文档和示例。所有 Nuxt UI 组件自动导入，在模板中使用 `kebab-case` 命名，如 `<u-button>`、`<u-card>` 等。

## 重要注意事项

1. **AdonisJS 开发**: 使用 adonisjs skill 和相关文档进行功能开发和代码修改
2. **文件创建优先级**: 优先使用 `node ace make:*` 命令创建控制器、模型、迁移等文件，然后手动修改，避免手动创建导致的错误
3. **类型安全**: 始终使用 TypeScript 类型，避免使用 `any`
4. **路径别名**: 使用 `#` 别名导入应用模块（例如 `#models/user`）
5. **迁移优先**: 修改数据库结构前先创建迁移文件
6. **认证检查**: 需要认证的路由使用 `.middleware('auth')`
7. **异步处理**: 所有数据库操作、HTTP 请求必须使用 async/await
8. **错误处理**: 使用 `findOrFail()` 而非 `find()` 来抛出 404
9. **代码提交**: 提交前运行 `npm run lint` 和 `npm run typecheck`
10. **Vue 组件**: 使用 Composition API (`<script setup>`)
11. **样式**: 优先使用 Tailwind CSS 类名，必要时使用 scoped style
12. **暗色模式**: 支持暗色模式，使用 `.dark` 类名或 `u-color-mode-button`

## 常用路径别名

```typescript
#models/*      -> app/models/*
#controllers/* -> app/controllers/*
#middleware/*  -> app/middleware/*
#exceptions/*  -> app/exceptions/*
#validators/*  -> app/validators/*
#services/*    -> app/services/*
#mails/*       -> app/mails/*
#listeners/*   -> app/listeners/*
#events/*      -> app/events/*
#policies/*    -> app/policies/*
#abilities/*   -> app/abilities/*
#tests/*       -> tests/*
#start/*       -> start/*
#config/*      -> config/*
#database/*    -> database/*
```

## 环境变量

从 `.env.example` 文件复制配置：

- `PORT`: 服务器端口（默认 3333）
- `NODE_ENV`: 环境模式（development/production/test）
- `APP_KEY`: 应用密钥
- `DB_CONNECTION`: 数据库连接（pg）
- `PG_HOST`: PostgreSQL 主机
- `PG_PORT`: PostgreSQL 端口
- `PG_USER`: PostgreSQL 用户
- `PG_PASSWORD`: PostgreSQL 密码
- `DB_NAME`: 数据库名称

## 测试规范

使用 Japa 测试框架，详细用法请参考 adonisjs skill 的 testing.md。

```typescript
import { test } from '@japa/runner'
import User from '#models/user'

test.group('User model', () => {
  test('should create a user', async ({ assert }) => {
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
    })

    assert.exists(user.id)
  })
})
```
