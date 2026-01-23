# Linky

> 个人知识管理系统

Linky 是一个现代化的个人知识管理系统，提供高效的书签管理和备忘录功能，拥有优雅的用户界面和安全的认证系统。

**[English](README.md)** | 简体中文

---

## 功能特性

### 书签管理
- 📚 支持分类和标签的多维度组织
- 🔍 强大的搜索和过滤功能
- 👁️ 访问次数统计
- 📊 三种视图模式：瀑布流、网格、列表
- 🏷️ 自定义标签系统

### 备忘录
- 📝 富文本编辑（Markdown 支持）
- ⭐ 置顶重要备忘录
- 🏷️ 标签分类管理
- 📅 快速日期显示（今天/昨天）
- 🔍 搜索和排序功能

### 用户认证
- ✉️ 邮箱注册与登录
- 🔒 Access Token 认证（无状态）
- 📧 邮箱验证
- 🔑 忘记密码 / 重置密码
- 🔄 重新发送验证邮件

## 技术栈

### 后端
- **框架**: AdonisJS 6.x
- **语言**: TypeScript
- **数据库**: PostgreSQL
- **ORM**: Lucid ORM
- **认证**: Access Token (Bearer Token)
- **验证**: VineJS
- **测试**: Japa
- **邮件**: AdonisJS Mail

### 前端
- **框架**: Nuxt 4.x
- **语言**: TypeScript
- **UI 库**: Nuxt UI 4.x (基于 Tailwind CSS)
- **样式**: Tailwind CSS 4.x
- **HTTP 客户端**: Nitro ($fetch)
- **图标**: Heroicons, Lucide

### 构建与工具
- **包管理器**: pnpm workspace
- **代码检查**: ESLint + Prettier
- **类型检查**: TypeScript compiler
- **版本控制**: Git

## 项目结构

```
Linky/
├── backend/                      # AdonisJS 后端应用
│   ├── app/
│   │   ├── controllers/        # HTTP 路由处理器
│   │   │   └── auth_controller.ts
│   │   ├── models/            # 数据模型 (Lucid ORM)
│   │   │   └── user.ts
│   │   ├── middleware/        # HTTP 中间件
│   │   │   ├── auth_middleware.ts
│   │   │   └── force_json_response_middleware.ts
│   │   ├── validators/        # 请求验证 (VineJS)
│   │   │   ├── login.ts
│   │   │   ├── register.ts
│   │   │   └── reset_password.ts
│   │   ├── services/          # 业务逻辑服务
│   │   │   └── auth_service.ts
│   │   ├── mails/             # 邮件模板
│   │   │   ├── verify_email_notification.ts
│   │   │   └── reset_password_notification.ts
│   │   └── exceptions/        # 自定义异常
│   ├── config/                # 配置文件
│   │   ├── auth.ts           # 认证配置
│   │   ├── database.ts       # 数据库连接
│   │   ├── mail.ts           # 邮件服务配置
│   │   └── cors.ts           # CORS 配置
│   ├── database/
│   │   └── migrations/       # 数据库迁移文件
│   ├── start/                 # 启动文件
│   │   ├── routes.ts         # API 路由定义
│   │   ├── kernel.ts         # 中间件注册
│   │   └── env.ts           # 环境变量验证
│   ├── tests/                # 测试文件 (Japa)
│   └── package.json
│
├── web/                       # Nuxt 4.x 前端应用
│   ├── app/
│   │   ├── pages/           # 文件路由
│   │   │   ├── index.vue
│   │   │   ├── auth/
│   │   │   │   ├── sign-in.vue
│   │   │   │   ├── sign-up.vue
│   │   │   │   ├── forgot-password.vue
│   │   │   │   ├── reset-password.vue
│   │   │   │   └── verify-email.vue
│   │   │   └── workspace/
│   │   │       ├── bookmarks.vue
│   │   │       └── memos.vue
│   │   ├── layouts/         # 页面布局
│   │   │   ├── default.vue
│   │   │   ├── auth.vue
│   │   │   ├── marketing.vue
│   │   │   └── workspace.vue
│   │   ├── components/      # Vue 组件
│   │   │   ├── BookmarkCard.vue
│   │   │   ├── MemoCard.vue
│   │   │   ├── TagsInput.vue
│   │   │   └── shared/
│   │   ├── middleware/      # 路由中间件
│   │   │   └── auth.global.ts
│   │   ├── composables/     # Vue 组合式函数
│   │   │   ├── useAuth.ts
│   │   │   └── useHttpError.ts
│   │   ├── api/             # API 客户端模块
│   │   │   ├── auth.ts
│   │   │   └── types.ts
│   │   ├── lib/             # 工具函数
│   │   │   └── request.ts   # HTTP 请求封装
│   │   └── assets/          # 静态资源
│   │       └── css/
│   ├── public/              # 静态文件
│   ├── nuxt.config.ts       # Nuxt 配置
│   └── package.json
│
├── package.json            # 根 package (workspace 管理器)
├── pnpm-workspace.yaml    # Workspace 配置
├── AGENTS.md               # AI 助手指南
├── openspec/               # OpenSpec 文档
└── .opencode/              # AI 编码规则
    ├── rules/              # 开发规范
    │   ├── 00-overview.md
    │   ├── 01-common.md
    │   ├── 02-backend.md
    │   └── 03-frontend.md
    └── skills/             # 框架特定技能
        ├── adonisjs/
        ├── nuxt/
        ├── nuxt-ui/
        └── tailwindcss/
```

## 快速开始

### 环境要求

- Node.js >= 20.0.0
- pnpm >= 10.26.1
- PostgreSQL

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

**后端环境变量** (`backend/.env`):

```bash
PORT=3333
APP_KEY=your-app-key-here
NODE_ENV=development

# Database
PG_HOST=127.0.0.1
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password
PG_DATABASE=linky

# Mail (可选)
MAIL_SMTP_HOST=smtp.gmail.com
MAIL_SMTP_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

**前端环境变量** (`web/.env`):

```bash
NUXT_PUBLIC_API_BASE_URL=http://localhost:3333
NUXT_PUBLIC_APP_NAME=Linky
```

### 数据库设置

```bash
cd backend
node ace migration:run
```

### 开发模式

启动后端服务器 (端口 3333):

```bash
pnpm run dev:backend
```

启动前端服务器 (端口 3000):

```bash
pnpm run dev:web
```

访问应用: http://localhost:3000

### 构建生产版本

```bash
pnpm run build
```

启动生产后端:

```bash
pnpm run start
```

预览生产前端:

```bash
pnpm run preview
```

## API 文档

### 认证 API

#### 注册
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}

Response 200:
{
  "user": { ... },
  "token": "access_token_here"
}
```

#### 登录
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response 200:
{
  "user": { ... },
  "token": "access_token_here"
}
```

#### 登出
```http
POST /api/auth/logout
Authorization: Bearer {token}

Response 200:
{
  "success": true
}
```

#### 获取当前用户
```http
GET /api/auth/me
Authorization: Bearer {token}

Response 200:
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  ...
}
```

#### 忘记密码
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}

Response 200:
{
  "success": true,
  "message": "重置密码邮件已发送"
}
```

#### 重置密码
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_here",
  "password": "new_password"
}

Response 200:
{
  "success": true
}
```

#### 验证邮箱
```http
GET /api/auth/verify-email?token=verification_token_here

Response 200:
{
  "success": true,
  "message": "邮箱验证成功"
}
```

#### 重新发送验证邮件
```http
POST /api/auth/resend-verification
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "message": "验证邮件已发送"
}
```

## 代码质量

### Linting

```bash
# Lint 所有代码
pnpm run lint

# 仅后端
pnpm --filter backend lint

# 仅前端
pnpm --filter web lint

# 自动修复
pnpm --filter backend lint --fix
pnpm --filter web lint --fix
```

### Type Checking

```bash
# 类型检查所有代码
pnpm run typecheck

# 仅后端
pnpm --filter backend typecheck

# 仅前端
pnpm --filter web typecheck
```

### Testing

```bash
# 运行后端测试
pnpm --filter backend test
```

## 认证机制

Linky 使用 Access Token 认证系统（无状态）:

1. **登录流程**:
   - 用户提交凭证到 `/api/auth/login`
   - 后端验证并返回 JWT access token
   - 前端将 token 存储在 `auth_token` cookie

2. **请求认证**:
   - 每个请求自动携带 `Authorization: Bearer {token}` 头
   - 后端验证 token 并获取用户信息
   - 受保护的路由使用 `middleware.auth()` 中间件

3. **Token 存储**:
   - 前端: `auth_token` cookie (30天有效期)
   - 后端: `access_tokens` 数据库表

## 开发规范

### 命名约定

- **文件名**: `kebab-case` (e.g., `auth_middleware.ts`, `user-profile.vue`)
- **组件名**: `PascalCase` (e.g., `UserProfile`, `TagsInput`)
- **类/接口名**: `PascalCase` (e.g., `UserController`, `AuthService`)
- **函数/变量名**: `camelCase` (e.g., `getUserData`, `isAuthenticated`)
- **常量**: `SCREAMING_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`)

### 代码风格

- **缩进**: 2 空格
- **引号**: 单引号
- **行宽**: 100 字符
- **分号**: 无分号
- **尾随逗号**: 无

### 组件使用

- **Nuxt UI 组件**: 使用 kebab-case (e.g., `<u-button>`, `<u-input>`)
- **自定义组件**: 使用 kebab-case (e.g., `<bookmark-card>`, `<memo-card>`)
- **布局组件**: 使用 kebab-case (e.g., `<workspace-layout>`, `<auth-layout>`)

## 后端开发指南

### 创建文件 (使用 ACE CLI)

```bash
cd backend

# 创建控制器
node ace make:controller UserController

# 创建模型
node ace make:model Bookmark

# 创建迁移
node ace make:migration create_bookmarks_table

# 创建验证器
node ace make:validator CreateBookmark

# 创建服务
node ace make:service BookmarkService

# 创建中间件
node ace make:middleware AuthMiddleware
```

### 运行迁移

```bash
# 运行待处理的迁移
node ace migration:run

# 回滚最后一次迁移
node ace migration:rollback
```

### 测试

```bash
# 运行所有测试
pnpm --filter backend test

# 运行特定测试文件
node ace test --files="**/auth.spec.ts"
```

## 前端开发指南

### 创建页面

在 `app/pages/` 创建 `.vue` 文件，自动生成路由:

```
pages/
├── index.vue              # /
├── auth/
│   ├── sign-in.vue       # /auth/sign-in
│   └── sign-up.vue       # /auth/sign-up
└── workspace/
    ├── bookmarks.vue     # /workspace/bookmarks
    └── memos.vue        # /workspace/memos
```

### 创建组件

在 `app/components/` 创建 Vue 组件:

```vue
<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div>{{ title }}</div>
</template>
```

### API 调用

使用封装的 `request` 工具:

```typescript
import { request } from '~/lib/request'

// GET
const user = await request.get<User>('/auth/me')

// POST
const result = await request.post<{ message: string }>('/auth/login', {
  email,
  password
})
```

### 组合式函数

在 `app/composables/` 创建可复用逻辑:

```typescript
export const useAuth = () => {
  const user = ref<User | null>(null)

  const login = async (credentials: LoginRequest) => {
    // ...
  }

  return { user, login }
}
```

## 常见问题

### Q: 如何重置数据库?

```bash
cd backend
node ace migration:rollback --batch=0
node ace migration:run
```

### Q: 如何生成新的应用密钥?

```bash
cd backend
node ace generate:key
```

### Q: 前端如何处理后端 401 错误?

参考 `app/composables/useHttpError.ts`，会自动重定向到登录页。

### Q: 如何添加新的认证中间件?

1. 使用 `node ace make:middleware` 创建
2. 在 `start/kernel.ts` 注册
3. 在路由中使用: `.middleware(middleware.auth())`

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

Linky 采用双重许可模式：

### 开源许可证（GPLv3）
- 个人、教育和非商业用途免费
- 修改后的代码需以相同许可证开源
- 适用于开源项目和内部工具

### 商业许可证
- 在商业产品中使用无需公开代码
- 优先支持和定制功能
- 可移除署名要求
- 联系我们了解定价和条款

**商业许可咨询**，请联系：
- 邮箱：zhaoguiyang18@outlook.com
- 网站：https://linky.zhaoguiyang.com

完整许可证详情，请参阅 [LICENSE](LICENSE) 文件。

## 相关资源

- **AdonisJS 官方文档**: https://docs.adonisjs.com
- **Nuxt 官方文档**: https://nuxt.com/docs
- **Nuxt UI 文档**: https://ui.nuxt.com
- **Tailwind CSS 文档**: https://tailwindcss.com/docs

## 联系方式

如有问题或建议，欢迎通过 Issues 进行反馈。
