# Project Overview

Linky is a Personal Knowledge Management System built with modern web technologies.

## Project Introduction

Linky is a Personal Knowledge Management System that provides efficient bookmark management with categories and tags, memos for recording ideas and inspiration, and a secure access token-based authentication system.

## Architecture

The project follows a monorepo architecture using pnpm workspace:

```
Linky (monorepo)
├── backend/              # AdonisJS 6.x API server
└── web/                 # Nuxt 4.x frontend application
```

- **Backend**: REST API server on port 3333
- **Frontend**: Client-side application on port 3000
- **Communication**: REST API with Bearer Token authentication

## Tech Stack

### Backend
- **Framework**: AdonisJS 6.x
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Lucid ORM
- **Authentication**: Access Token (not session-based)
- **Testing**: Japa

### Frontend
- **Framework**: Nuxt 4.x
- **Language**: TypeScript
- **UI Library**: Nuxt UI 4.x
- **Styling**: Tailwind CSS 4.x
- **HTTP Client**: Nitro ($fetch)

### Build & Tools
- **Package Manager**: pnpm workspace
- **Code Quality**: ESLint + Prettier
- **Type Checking**: TypeScript compiler

## Directory Structure

```
Linky/
├── backend/                    # AdonisJS backend application
│   ├── app/
│   │   ├── controllers/      # HTTP route handlers
│   │   ├── models/          # Database models (Lucid ORM)
│   │   ├── middleware/      # HTTP middleware
│   │   ├── validators/      # Request validators (VineJS)
│   │   ├── services/        # Business logic services
│   │   ├── mails/           # Email templates
│   │   └── exceptions/      # Custom exceptions
│   ├── config/              # Configuration files
│   │   ├── auth.ts          # Authentication configuration
│   │   ├── database.ts      # Database connection
│   │   └── mail.ts          # Email configuration
│   ├── database/
│   │   └── migrations/      # Database schema migrations
│   ├── start/
│   │   ├── routes.ts        # API route definitions
│   │   ├── kernel.ts        # Middleware registration
│   │   └── env.ts          # Environment validation
│   ├── tests/               # Test files (Japa)
│   ├── bin/                 # Entry points
│   ├── ace.js               # CLI tool configuration
│   ├── adonisrc.ts          # AdonisJS configuration
│   └── package.json
│
├── web/                      # Nuxt 4.x frontend application
│   ├── app/
│   │   ├── pages/           # File-based routing
│   │   ├── layouts/         # Page layouts
│   │   ├── components/      # Vue components
│   │   ├── middleware/      # Route middleware
│   │   ├── composables/     # Vue composables
│   │   ├── api/             # API client modules
│   │   ├── lib/             # Utilities (request wrapper)
│   │   └── assets/          # Static assets (CSS, images)
│   ├── public/              # Static files
│   ├── nuxt.config.ts       # Nuxt configuration
│   └── package.json
│
├── package.json              # Root package (workspace manager)
├── pnpm-workspace.yaml      # Workspace configuration
├── AGENTS.md                # AI assistant guidelines
├── openspec/                # OpenSpec documentation
└── .opencode/               # AI coding rules
    ├── rules/               # Development rules
    └── skills/              # Framework-specific skills
```

## Quick Start

### Install Dependencies

```bash
pnpm install
```

### Environment Variables

Configure backend environment:

```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

Configure frontend environment:

```bash
cd web
cp .env.example .env
# Edit .env with your configuration
```

### Development

Start backend server:

```bash
pnpm run dev:backend    # Runs on http://localhost:3333
```

Start frontend server (in another terminal):

```bash
pnpm run dev:web       # Runs on http://localhost:3000
```

### Build for Production

```bash
pnpm run build          # Build both backend and web
pnpm run start          # Start production backend
pnpm run preview        # Preview production web build
```

## Authentication

The project uses Access Token authentication (configured in `backend/config/auth.ts`):

- **Guard**: `api`
- **Provider**: `tokensUserProvider`
- **Storage**: Bearer token in HTTP Authorization header
- **Frontend Storage**: Token stored in `auth_token` cookie
- **User Model**: Has `accessTokens` relationship

### How it Works

1. User logs in via `/api/auth/login`
2. Backend returns JWT access token
3. Frontend stores token in cookie
4. Token automatically attached to all requests via `Authorization: Bearer {token}` header
5. Backend validates token on protected routes using `middleware.auth()`

## OpenSpec Workflow

OpenSpec is a structured change management process that ensures every feature change is fully discussed, designed, and reviewed.

### When to Use OpenSpec

Always use OpenSpec when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

### Workflow Steps

1. **Submit Change Request** - User describes the feature to be added or modified
2. **Create Change Proposal** - AI creates a change proposal file in `openspec/changes/` directory
3. **Review and Discussion** - Review feasibility and completeness, discuss technical details
4. **Implementation** - Implement code according to the proposal
5. **Verification and Commit** - Run quality checks, execute tests, commit code

### Change Proposal Structure

```
openspec/changes/<date>-<feature-name>.md
```

Proposals should include:
- Feature overview
- Background and motivation
- Detailed design
- Implementation steps
- Risks and considerations

### Core Principles

#### ✅ Must Do

- Prefer using `node ace make:*` commands to create files
- Create migration files before modifying database structure
- Run quality checks before committing
- Follow framework-specific development best practices

#### ⚠️ Ask First

- Modifying authentication method or adding new authentication providers
- Adding new dependencies or updating framework versions
- Major database structure changes

#### 🚫 Never Do

- Commit secrets to the code repository
- Modify `node_modules/` directories
- Delete data or directly operate on production database
- Disable framework middleware or security mechanisms

### Documentation Language Convention

- **Conversation**: Chinese (中文) for all AI interactions
- **Documentation**: English for all technical documentation, code comments, and specifications
- **Code**: English for variable names, function names, class names

For detailed OpenSpec documentation, refer to `openspec/AGENTS.md`.
