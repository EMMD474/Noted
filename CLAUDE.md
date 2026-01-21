# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Noted is a full-stack note-taking and task management application built with Next.js, Prisma, and PostgreSQL.

## Commands

```bash
pnpm install         # Install dependencies (runs prisma generate automatically)
pnpm dev             # Start Next.js dev server on port 3000
pnpm build           # Production build
pnpm start           # Start production server
pnpm lint            # Run ESLint
```

### Database

```bash
docker compose up -d                    # Start PostgreSQL container
npx prisma migrate dev                  # Apply migrations during development
npx prisma migrate deploy               # Apply migrations in production
npx prisma generate                     # Regenerate Prisma client after schema changes
```

### Quick Start

Run `./run.sh` to start both Docker (PostgreSQL) and the Next.js dev server.

## Architecture

### Stack
- **Framework**: Next.js 16 (App Router) with TypeScript
- **Database**: PostgreSQL 16 (via Docker Compose)
- **ORM**: Prisma 7.2
- **Authentication**: NextAuth with JWT/Credentials provider
- **UI**: Material-UI (MUI) 7

### Directory Structure
```
app/
├── (main)/              # Authenticated routes (notes, todo, calendar)
├── api/                 # API route handlers
│   ├── auth/[...nextauth]/  # NextAuth endpoints
│   ├── notes/[id]/      # Single note CRUD
│   ├── notes/           # Notes list/create
│   ├── todos/[id]/      # Single todo CRUD
│   ├── todos/           # Todos list/create
│   └── users/           # User registration
├── login/               # Login/signup page
├── layout.tsx           # Root layout
└── providers.tsx        # Client providers wrapper

components/              # Reusable React components
contexts/                # React Context (NotesProvider)
lib/                     # Utilities (auth config, Prisma client, theme)
prisma/                  # Schema and migrations
```

### Authentication Flow
1. User authenticates via NextAuth credentials provider (`/api/auth/[...nextauth]`)
2. Password verified against bcrypt hash in database
3. JWT session created and managed by NextAuth
4. Protected API routes use `getServerSession(authOptions)` to verify user
5. All data endpoints verify user ownership before operations

### State Management
- **NotesProvider** (`contexts/NotesContext.tsx`): Manages notes state synchronization
- Access via `useNotes()` hook for `getNotes()`, `setNotes()`, `notesUpdated`

### Provider Hierarchy (app/providers.tsx)
```
SessionProvider (NextAuth)
  → ThemeProvider (MUI)
    → NotesProvider
```

### Data Models (prisma/schema.prisma)

**User** → `auth_user` table
- id, username (unique), email (unique), password (bcrypt), createdAt

**Note** → `api_note` table
- id, title, content, importance (normal/important/urgent), createdAt, userId

**Todo** → `api_todo` table
- id, title, importance, checked (boolean), createdAt, userId

### API Endpoints

All data endpoints require authentication and filter by logged-in user.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | User registration |
| * | `/api/auth/[...nextauth]` | NextAuth handlers |
| GET/POST | `/api/notes` | List/create notes |
| GET/PUT/DELETE | `/api/notes/[id]` | Single note operations |
| GET/POST | `/api/todos` | List/create todos |
| GET/PUT/DELETE | `/api/todos/[id]` | Single todo operations |
