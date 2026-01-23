# Linky

> Personal Knowledge Management System

Linky is a modern personal knowledge management system featuring efficient bookmark management, memos, an elegant user interface, and secure authentication.

**[简体中文](README.zh-CN.md)** | English

---

## Features

### Bookmark Management
- 📚 Multi-dimensional organization with categories and tags
- 🔍 Powerful search and filtering capabilities
- 👁️ Visit count tracking
- 📊 Three view modes: masonry, grid, list
- 🏷️ Custom tag system

### Memos
- 📝 Rich text editing (Markdown support)
- ⭐ Pin important memos
- 🏷️ Tag-based categorization
- 📅 Quick date display (today/yesterday)
- 🔍 Search and sorting functionality

### User Authentication
- ✉️ Email registration and login
- 🔒 Access Token authentication (stateless)
- 📧 Email verification
- 🔑 Forgot password / reset password
- 🔄 Resend verification email

## Tech Stack

### Backend
- **Framework**: AdonisJS 6.x
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Lucid ORM
- **Authentication**: Access Token (Bearer Token)
- **Validation**: VineJS
- **Testing**: Japa
- **Mail**: AdonisJS Mail

### Frontend
- **Framework**: Nuxt 4.x
- **Language**: TypeScript
- **UI Library**: Nuxt UI 4.x (built on Tailwind CSS)
- **Styling**: Tailwind CSS 4.x
- **HTTP Client**: Nitro ($fetch)
- **Icons**: Heroicons, Lucide

### Build & Tools
- **Package Manager**: pnpm workspace
- **Code Quality**: ESLint + Prettier
- **Type Checking**: TypeScript compiler
- **Version Control**: Git

## Project Structure

```
Linky/
├── backend/                      # AdonisJS backend application
│   ├── app/
│   │   ├── controllers/        # HTTP route handlers
│   │   │   └── auth_controller.ts
│   │   ├── models/            # Database models (Lucid ORM)
│   │   │   └── user.ts
│   │   ├── middleware/        # HTTP middleware
│   │   │   ├── auth_middleware.ts
│   │   │   └── force_json_response_middleware.ts
│   │   ├── validators/        # Request validators (VineJS)
│   │   │   ├── login.ts
│   │   │   ├── register.ts
│   │   │   └── reset_password.ts
│   │   ├── services/          # Business logic services
│   │   │   └── auth_service.ts
│   │   ├── mails/             # Email templates
│   │   │   ├── verify_email_notification.ts
│   │   │   └── reset_password_notification.ts
│   │   └── exceptions/        # Custom exceptions
│   ├── config/                # Configuration files
│   │   ├── auth.ts           # Authentication configuration
│   │   ├── database.ts       # Database connection
│   │   ├── mail.ts           # Email service configuration
│   │   └── cors.ts           # CORS configuration
│   ├── database/
│   │   └── migrations/       # Database migration files
│   ├── start/                 # Startup files
│   │   ├── routes.ts         # API route definitions
│   │   ├── kernel.ts         # Middleware registration
│   │   └── env.ts           # Environment variable validation
│   ├── tests/                # Test files (Japa)
│   └── package.json
│
├── web/                       # Nuxt 4.x frontend application
│   ├── app/
│   │   ├── pages/           # File-based routing
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
│   │   ├── layouts/         # Page layouts
│   │   │   ├── default.vue
│   │   │   ├── auth.vue
│   │   │   ├── marketing.vue
│   │   │   └── workspace.vue
│   │   ├── components/      # Vue components
│   │   │   ├── BookmarkCard.vue
│   │   │   ├── MemoCard.vue
│   │   │   ├── TagsInput.vue
│   │   │   └── shared/
│   │   ├── middleware/      # Route middleware
│   │   │   └── auth.global.ts
│   │   ├── composables/     # Vue composables
│   │   │   ├── useAuth.ts
│   │   │   └── useHttpError.ts
│   │   ├── api/             # API client modules
│   │   │   ├── auth.ts
│   │   │   └── types.ts
│   │   ├── lib/             # Utilities
│   │   │   └── request.ts   # HTTP request wrapper
│   │   └── assets/          # Static assets
│   │       └── css/
│   ├── public/              # Static files
│   ├── nuxt.config.ts       # Nuxt configuration
│   └── package.json
│
├── package.json            # Root package (workspace manager)
├── pnpm-workspace.yaml    # Workspace configuration
├── AGENTS.md               # AI assistant guidelines
├── openspec/               # OpenSpec documentation
└── .opencode/              # AI coding rules
    ├── rules/              # Development rules
    │   ├── 00-overview.md
    │   ├── 01-common.md
    │   ├── 02-backend.md
    │   └── 03-frontend.md
    └── skills/             # Framework-specific skills
        ├── adonisjs/
        ├── nuxt/
        ├── nuxt-ui/
        └── tailwindcss/
```

## Quick Start

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.26.1
- PostgreSQL

### Install Dependencies

```bash
pnpm install
```

### Environment Variables

**Backend environment variables** (`backend/.env`):

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

# Mail (optional)
MAIL_SMTP_HOST=smtp.gmail.com
MAIL_SMTP_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

**Frontend environment variables** (`web/.env`):

```bash
NUXT_PUBLIC_API_BASE_URL=http://localhost:3333
NUXT_PUBLIC_APP_NAME=Linky
```

### Database Setup

```bash
cd backend
node ace migration:run
```

### Development Mode

Start backend server (port 3333):

```bash
pnpm run dev:backend
```

Start frontend server (port 3000):

```bash
pnpm run dev:web
```

Visit the app: http://localhost:3000

### Build for Production

```bash
pnpm run build
```

Start production backend:

```bash
pnpm run start
```

Preview production frontend:

```bash
pnpm run preview
```

## API Documentation

### Authentication API

#### Register
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

#### Login
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

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}

Response 200:
{
  "success": true
}
```

#### Get Current User
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

#### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}

Response 200:
{
  "success": true,
  "message": "Reset email has been sent"
}
```

#### Reset Password
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

#### Verify Email
```http
GET /api/auth/verify-email?token=verification_token_here

Response 200:
{
  "success": true,
  "message": "Email verified successfully"
}
```

#### Resend Verification Email
```http
POST /api/auth/resend-verification
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "message": "Verification email has been sent"
}
```

## Code Quality

### Linting

```bash
# Lint all code
pnpm run lint

# Backend only
pnpm --filter backend lint

# Frontend only
pnpm --filter web lint

# Auto-fix
pnpm --filter backend lint --fix
pnpm --filter web lint --fix
```

### Type Checking

```bash
# Type check all code
pnpm run typecheck

# Backend only
pnpm --filter backend typecheck

# Frontend only
pnpm --filter web typecheck
```

### Testing

```bash
# Run backend tests
pnpm --filter backend test
```

## Authentication Mechanism

Linky uses an Access Token authentication system (stateless):

1. **Login Flow**:
   - User submits credentials to `/api/auth/login`
   - Backend validates and returns JWT access token
   - Frontend stores token in `auth_token` cookie

2. **Request Authentication**:
   - Each request automatically carries `Authorization: Bearer {token}` header
   - Backend validates token and retrieves user information
   - Protected routes use `middleware.auth()` middleware

3. **Token Storage**:
   - Frontend: `auth_token` cookie (30-day expiration)
   - Backend: `access_tokens` database table

## Development Guidelines

### Naming Conventions

- **File names**: `kebab-case` (e.g., `auth_middleware.ts`, `user-profile.vue`)
- **Component names**: `PascalCase` (e.g., `UserProfile`, `TagsInput`)
- **Class/Interface names**: `PascalCase` (e.g., `UserController`, `AuthService`)
- **Function/Variable names**: `camelCase` (e.g., `getUserData`, `isAuthenticated`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`)

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Line width**: 100 characters
- **Semicolons**: No semicolons
- **Trailing commas**: No trailing commas

### Component Usage

- **Nuxt UI components**: Use kebab-case (e.g., `<u-button>`, `<u-input>`)
- **Custom components**: Use kebab-case (e.g., `<bookmark-card>`, `<memo-card>`)
- **Layout components**: Use kebab-case (e.g., `<workspace-layout>`, `<auth-layout>`)

## Backend Development Guide

### Creating Files (Using ACE CLI)

```bash
cd backend

# Create controller
node ace make:controller UserController

# Create model
node ace make:model Bookmark

# Create migration
node ace make:migration create_bookmarks_table

# Create validator
node ace make:validator CreateBookmark

# Create service
node ace make:service BookmarkService

# Create middleware
node ace make:middleware AuthMiddleware
```

### Running Migrations

```bash
# Run pending migrations
node ace migration:run

# Rollback last migration
node ace migration:rollback
```

### Testing

```bash
# Run all tests
pnpm --filter backend test

# Run specific test file
node ace test --files="**/auth.spec.ts"
```

## Frontend Development Guide

### Creating Pages

Create `.vue` files in `app/pages/`, routes are auto-generated:

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

### Creating Components

Create Vue components in `app/components/`:

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

### API Calls

Use the wrapped `request` utility:

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

### Composables

Create reusable logic in `app/composables/`:

```typescript
export const useAuth = () => {
  const user = ref<User | null>(null)

  const login = async (credentials: LoginRequest) => {
    // ...
  }

  return { user, login }
}
```

## FAQ

### Q: How to reset the database?

```bash
cd backend
node ace migration:rollback --batch=0
node ace migration:run
```

### Q: How to generate a new app key?

```bash
cd backend
node ace generate:key
```

### Q: How does the frontend handle backend 401 errors?

Refer to `app/composables/useHttpError.ts`, it automatically redirects to the login page.

### Q: How to add new authentication middleware?

1. Create using `node ace make:middleware`
2. Register in `start/kernel.ts`
3. Use in routes: `.middleware(middleware.auth())`

## Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Linky is dual-licensed under the following terms:

### Open Source License (GPLv3)
- Free for personal, educational, and non-commercial use
- Modifications must be shared under the same license
- Suitable for open-source projects and internal tools

### Commercial License
- Use in commercial products without making your code public
- Priority support and custom features
- Remove attribution requirements
- Contact us for pricing and terms

**For commercial licensing inquiries**, please contact us at:
- Email: zhaoguiyang18@outlook.com
- Website: https://linky.zhaoguiyang.com

For full license details, see the [LICENSE](LICENSE) file.

## Resources

- **AdonisJS Official Docs**: https://docs.adonisjs.com
- **Nuxt Official Docs**: https://nuxt.com/docs
- **Nuxt UI Docs**: https://ui.nuxt.com
- **Tailwind CSS Docs**: https://tailwindcss.com/docs

## Contact

For questions or suggestions, please open an Issue.
