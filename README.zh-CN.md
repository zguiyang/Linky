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

## 部署

### 环境要求
- Node.js >= 20.0.0
- pnpm >= 10.26.1
- PostgreSQL
- PM2

### 快速部署

```bash
# 1. 拉取代码
git clone https://github.com/zguiyang/Linky.git
cd Linky

# 2. 安装依赖
pnpm install

# 3. 复制并配置 env 文件
cp backend/.env.example backend/.env
cp web/.env.example web/.env

# 编辑 backend/.env 配置数据库等信息

# 4. 运行数据库迁移
cd backend
node ace migration:run
cd ..

# 5. 打包前后端
pnpm run build

# 6. 用 PM2 启动
pm2 start ecosystem.config.js
```

### 配置

编辑 `backend/.env`：
```env
# 数据库
PG_HOST=127.0.0.1
PG_PORT=5432
PG_USER=root
PG_PASSWORD=你的密码
PG_DATABASE=linky

# 应用
PORT=3333
APP_URL=http://你的域名.com

# 前端 (web/.env)
NUXT_PUBLIC_API_BASE_URL=http://localhost:3333
```

### PM2 命令

```bash
# 启动
pm2 start ecosystem.config.js

# 重启
pm2 restart linky-backend
pm2 restart linky-web

# 停止
pm2 stop ecosystem.config.js

# 查看日志
pm2 logs

# 监控
pm2 monit
```

---

## 快速开始（开发）

```bash
# 安装依赖
pnpm install

# 配置环境
cp backend/.env.example backend/.env
cp web/.env.example web/.env

# 运行数据库迁移
cd backend && node ace migration:run && cd ..

# 启动开发服务
pnpm run dev:backend   # 后端 :3333
pnpm run dev:web       # 前端 :3000
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

## 许可证

双许可证：
- GPLv3 开源版本
- 商业许可证可联系：zhaoguiyang18@outlook.com

---

## 为什么做这个

我就是想找个简单、能自托管的工具来整理书签和写笔记。不要多复杂的功能，不要依赖云服务。自己能掌控数据，够用就行。

---

## 反馈

欢迎提 Issue：https://github.com/zguiyang/Linky/issues
