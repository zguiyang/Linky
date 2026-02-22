# Linky

Personal Knowledge Management System

**[English](README.md)** | [简体中文](README.zh-CN.md)

---

## What It Does

### Bookmarks
- Save URLs with auto-fetched title, description, and thumbnail
- Import from browser HTML exports
- Organize with tags
- 2 view modes: waterfall (masonry), list
- Track visit count

### Memos
- Write in Markdown
- Pin important ones
- Tag them too

### Tags
- Create colored tags
- View all items under a tag
- AI auto-tagging (triggers automatically when creating bookmarks)

### AI Integration
- Connect to OpenAI-compatible API (Ollama, Groq, etc.)
- AI can suggest tags when adding bookmarks
- **Note**: Frontend does not have a dedicated AI chat interface. Chat API is available at backend for custom integrations.

### Search
- Global search across bookmarks, memos, and tags
- Keyboard shortcut: Ctrl+K

### Auth
- Email + password login
- Token-based auth (stateless)
- Email verification
- Password reset
- Avatar upload/delete

---

## Tech Stack

### Backend
- AdonisJS 6.x
- TypeScript
- PostgreSQL
- Lucid ORM

### Frontend
- Nuxt 4.x
- TypeScript
- Nuxt UI 4.x (Tailwind CSS)
- Nitro for API calls

---

## Quick Start

### Requirements
- Node.js >= 20.0.0
- pnpm >= 10.26.1
- PostgreSQL

### Install

```bash
pnpm install
```

### Setup

1. Copy env files and fill in your config:
   - `backend/.env`
   - `web/.env`

2. Run migrations:
```bash
cd backend
node ace migration:run
```

3. Start servers:
```bash
# Backend :3333
pnpm run dev:backend

# Frontend :3000
pnpm run dev:web
```

Visit http://localhost:3000

---

## Project Structure

```
Linky/
├── backend/           # AdonisJS API
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   └── ...
│   └── database/migrations/

└── web/               # Nuxt frontend
    └── app/
        ├── pages/
        ├── components/
        └── ...
```

---

## API Endpoints

### Auth (Public)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Auth (Protected)
- `POST /api/auth/logout`

### User
- `GET /api/user/me`
- `PUT /api/user`
- `POST /api/user/avatar`
- `DELETE /api/user/avatar`
- `POST /api/user/change-email`
- `GET /api/user/verify-email`
- `POST /api/user/resend-verification`

### Bookmarks
- `GET /api/bookmarks`
- `GET /api/bookmarks/paginate`
- `POST /api/bookmarks`
- `POST /api/bookmarks/by-url` (auto-fetch metadata)
- `PUT /api/bookmarks/:id`
- `DELETE /api/bookmarks/:id`
- `POST /api/bookmarks/import` (HTML import)
- `GET /api/bookmarks/import/:jobId/status`
- `POST /api/bookmarks/:id/refresh-metadata`
- `GET /api/bookmarks/fetching-count`

### Memos
- `GET /api/memos`
- `GET /api/memos/paginate`
- `POST /api/memos`
- `PUT /api/memos/:id`
- `DELETE /api/memos/:id`

### Tags
- `GET /api/tags`
- `POST /api/tags`
- `GET /api/tags/:id`
- `PUT /api/tags/:id`
- `DELETE /api/tags/:id`
- `GET /api/tags/:id/items`

### Settings
- `GET /api/settings/ai`
- `PUT /api/settings/ai`

### AI
- `GET /api/ai/config`
- `POST /api/ai/chat`
- `POST /api/ai/chat/stream` (SSE streaming)

### Search
- `GET /api/search`

---

## Frontend Pages

- `/` - Home
- `/auth/sign-in` - Sign in
- `/auth/sign-up` - Sign up
- `/auth/forgot-password` - Forgot password
- `/auth/reset-password` - Reset password
- `/verify-email` - Email verification
- `/workspace/bookmarks` - Bookmarks
- `/workspace/memos` - Memos
- `/workspace/tags` - Tags list
- `/workspace/tags/[id]` - Tag detail
- `/workspace/settings` - Settings

---

## Development

### Lint & Type Check

```bash
pnpm run lint
pnpm run typecheck
```

### Backend CLI

```bash
cd backend

# Make stuff
node ace make:controller User
node ace make:model Bookmark
node ace make:service BookmarkService

# Migrations
node ace migration:run
node ace migration:rollback
```

---

## License

Dual licensed:
- GPLv3 for open source
- Commercial license available

Contact: zhaoguiyang18@outlook.com

---

## Why I Built This

I wanted a simple, self-hosted tool to organize bookmarks and write notes. No complex features, no cloud dependency. Just something that works and keeps my data.

---

## TODO

- [ ] Add more view customization
- [ ] Export data
- [ ] Browser extension (maybe)

---

## Contact

Issues welcome: https://github.com/anomalyco/Linky/issues
