# Linky（链崽）

Linky（链崽）- 现代化链接管理平台，基于 Nuxt 4 构建的全栈应用，集成了用户认证、数据库操作、API 接口等核心功能，采用 TypeScript 和最佳实践构建。

## 技术栈

### 前端技术

- **Nuxt 4**: Vue 3 全栈框架，提供 SSR/SSG/ISR 等多种渲染模式
- **Vue 3**: 渐进式 JavaScript 框架
- **@nuxt/ui**: 基于 Tailwind CSS 的 UI 组件库
- **Tailwind CSS**: 实用优先的 CSS 框架
- **TypeScript**: 类型安全的 JavaScript 超集

### 后端技术

- **Nuxt Server API**: 内置服务端 API 路由
- **PostgreSQL**: 开源关系型数据库
- **Drizzle ORM**: 类型安全的 SQL 查询构建器
- **Better Auth**: 现代化的身份验证解决方案

### 开发工具

- **ESLint**: JavaScript/TypeScript 代码检查工具
- **Prettier**: 代码格式化工具
- **Husky**: Git hooks 工具
- **lint-staged**: 仅对暂存文件运行 linter
- **Zod**: TypeScript 优先的模式验证

## 项目结构

```
linky/
├── app/                 # 应用前端代码
│   ├── api/            # API 客户端
│   ├── assets/         # 静态资源
│   ├── components/     # Vue 组件
│   ├── lib/            # 前端工具库
│   └── pages/          # 页面组件
├── server/             # 服务端代码
│   ├── api/            # API 路由
│   ├── middleware/     # 服务端中间件
│   ├── plugins/        # 服务端插件
│   ├── services/       # 业务逻辑服务层
│   └── utils/          # 服务端工具函数
├── shared/             # 共享代码
│   ├── constants/      # 常量定义
│   ├── db/             # 数据库表定义
│   ├── schemas/        # 数据验证模式
│   └── types/          # TypeScript 类型定义
└── public/             # 公共静态资源
```

## 核心功能

### 1. 用户认证系统

- 基于 Better Auth 的现代化认证解决方案
- 支持邮箱/密码登录和注册
- 会话管理和账户关联
- 支持第三方登录（GitHub、Google 等）

### 2. 数据库设计

- 使用 PostgreSQL 作为数据库
- 通过 Drizzle ORM 进行类型安全的数据库操作
- 完整的数据表结构设计：
  - `users`: 用户基本信息
  - `sessions`: 用户会话
  - `accounts`: 第三方账户关联
  - `verifications`: 验证码
  - `examples`: 示例数据表

### 3. API 设计

- 统一的 API 响应格式
- 分页查询支持
- 错误码和错误消息统一管理
- 使用 Zod 进行数据验证

### 4. 前端界面

- 基于 @nuxt/ui 构建现代化界面
- 支持深色/浅色模式切换
- 响应式设计
- 表单验证和错误处理

## 开发特点

### 1. 代码规范

- 使用 ESLint 和 Prettier 进行代码格式化
- 通过 Husky 和 lint-staged 确保代码质量
- TypeScript 提供类型安全

### 2. 模块化设计

- 清晰的目录结构，前端和共享代码分离
- 模块化的数据表定义和模式验证
- 可复用的组件和工具函数

### 3. 类型安全

- 全面的 TypeScript 类型定义
- 使用 Zod 进行运行时数据验证
- 类型推断和类型守卫

## 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- pnpm 8.0 或更高版本（推荐）
- PostgreSQL 数据库

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 bun
bun install
```

### 环境配置

1. 复制环境变量模板：

```bash
cp .env.example .env.development
```

2. 编辑 `.env.development` 文件，配置数据库连接等信息：

```env
DATABASE_URI=postgresql://username:password@localhost:5432/database_name
BETTER_AUTH_CLIENT_URL=http://localhost:13090
AUTH_SECRET=your_auth_secret_here
```

### 数据库迁移

```bash
# 生成数据库迁移文件
pnpm drizzle:generate

# 运行数据库迁移
pnpm drizzle:migrate
```

### 启动开发服务器

```bash
# 使用 pnpm（推荐）
pnpm dev

# 或使用 npm
npm run dev

# 或使用 yarn
yarn dev

# 或使用 bun
bun run dev
```

开发服务器将在 `http://localhost:13090` 启动。

### 构建生产版本

```bash
# 使用 pnpm（推荐）
pnpm build

# 或使用 npm
npm run build

# 或使用 yarn
yarn build

# 或使用 bun
bun run build
```

### 预览生产版本

```bash
# 使用 pnpm（推荐）
pnpm preview

# 或使用 npm
npm run preview

# 或使用 yarn
yarn preview

# 或使用 bun
bun run preview
```

## 可用脚本

- `pnpm dev`: 启动开发服务器
- `pnpm build`: 构建生产版本
- `pnpm preview`: 预览生产版本
- `pnpm generate`: 生成静态站点
- `pnpm lint`: 运行 ESLint 检查
- `pnpm format`: 使用 Prettier 格式化代码
- `pnpm drizzle:generate`: 生成数据库迁移文件
- `pnpm drizzle:migrate`: 运行数据库迁移
- `pnpm drizzle:studio`: 启动 Drizzle Studio 数据库管理工具

## 部署

查看 [Nuxt 部署文档](https://nuxt.com/docs/getting-started/deployment) 了解更多部署选项。

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 许可证

MIT License
