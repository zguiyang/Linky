# Linky

个人知识管理系统

这是我为自己做的一个个人知识管理工具，用来整理书签和备忘录。界面干净，认证安全，数据自己掌控。

**[English](README.md)** | [简体中文](README.zh-CN.md)

---

## 功能

### 书签
- 保存网址，自动抓取标题、描述和缩略图
- 从浏览器导出的 HTML 文件导入
- 用标签整理
- 两种视图：瀑布流、列表
- 记录访问次数

### 备忘录
- 用 Markdown 写
- 可以置顶
- 也能打标签

### 标签
- 创建彩色标签
- 查看某个标签下的所有内容
- AI 自动打标签（创建书签时自动触发）

### AI 对接
- 接 OpenAI 兼容 API（比如 Ollama、Groq 之类的）
- 加书签时 AI 可以推荐标签
- **注意**：前端暂无对话界面，后端有 API 可自行对接

### 搜索
- 全局搜索书签、备忘录和标签
- 快捷键：Ctrl+K

### 认证
- 邮箱 + 密码登录
- Token 认证（无状态）
- 邮箱验证
- 密码重置
- 头像上传/删除

---

## 技术栈

### 后端
- AdonisJS 6.x
- TypeScript
- PostgreSQL
- Lucid ORM

### 前端
- Nuxt 4.x
- TypeScript
- Nuxt UI 4.x (Tailwind CSS)
- Nitro 发请求

---

## 快速开始

### 环境要求
- Node.js >= 20.0.0
- pnpm >= 10.26.1
- PostgreSQL

### 安装

```bash
pnpm install
```

### 配置

1. 复制并配置 env 文件：
   - `backend/.env`
   - `web/.env`

2. 运行数据库迁移：
```bash
cd backend
node ace migration:run
```

3. 启动服务：
```bash
# 后端 :3333
pnpm run dev:backend

# 前端 :3000
pnpm run dev:web
```

访问 http://localhost:3000

---

## 项目结构

```
Linky/
├── backend/           # AdonisJS API
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   └── ...
│   └── database/migrations/

└── web/               # Nuxt 前端
    └── app/
        ├── pages/
        ├── components/
        └── ...
```

---

## API 端点

### 认证（公开）
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### 认证（需登录）
- `POST /api/auth/logout`

### 用户
- `GET /api/user/me`
- `PUT /api/user`
- `POST /api/user/avatar`
- `DELETE /api/user/avatar`
- `POST /api/user/change-email`
- `GET /api/user/verify-email`
- `POST /api/user/resend-verification`

### 书签
- `GET /api/bookmarks`
- `GET /api/bookmarks/paginate`
- `POST /api/bookmarks`
- `POST /api/bookmarks/by-url`（自动抓取元数据）
- `PUT /api/bookmarks/:id`
- `DELETE /api/bookmarks/:id`
- `POST /api/bookmarks/import`（HTML 导入）
- `GET /api/bookmarks/import/:jobId/status`
- `POST /api/bookmarks/:id/refresh-metadata`
- `GET /api/bookmarks/fetching-count`

### 备忘录
- `GET /api/memos`
- `GET /api/memos/paginate`
- `POST /api/memos`
- `PUT /api/memos/:id`
- `DELETE /api/memos/:id`

### 标签
- `GET /api/tags`
- `POST /api/tags`
- `GET /api/tags/:id`
- `PUT /api/tags/:id`
- `DELETE /api/tags/:id`
- `GET /api/tags/:id/items`

### 设置
- `GET /api/settings/ai`
- `PUT /api/settings/ai`

### AI
- `GET /api/ai/config`
- `POST /api/ai/chat`
- `POST /api/ai/chat/stream`（SSE 流式）

### 搜索
- `GET /api/search`

---

## 前端页面

- `/` - 首页
- `/auth/sign-in` - 登录
- `/auth/sign-up` - 注册
- `/auth/forgot-password` - 忘记密码
- `/auth/reset-password` - 重置密码
- `/verify-email` - 邮箱验证
- `/workspace/bookmarks` - 书签
- `/workspace/memos` - 备忘录
- `/workspace/tags` - 标签列表
- `/workspace/tags/[id]` - 标签详情
- `/workspace/settings` - 设置

---

## 开发

### 代码检查

```bash
pnpm run lint
pnpm run typecheck
```

### 后端 CLI

```bash
cd backend

# 创建文件
node ace make:controller User
node ace make:model Bookmark
node ace make:service BookmarkService

# 数据库迁移
node ace migration:run
node ace migration:rollback
```

---

## 许可证

双许可证：
- GPLv3 开源版本
- 商业许可证可联系：zhaoguiyang18@outlook.com

---

## 为什么做这个

我就是想找个简单、能自托管的工具来整理书签和写笔记。不要多复杂的功能，不要依赖云服务。自己能掌控数据，够用就行。

---

## TODO（想做但还没做的）

- [ ] AI对话、搜索
- [ ] 导出数据
- [ ] 浏览器扩展

---

## 反馈

欢迎提 Issue：https://github.com/zguiyang/Linky/issues
