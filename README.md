# Noted

Noted is a full-stack note-taking and task management application built with Next.js (App Router), Prisma, and PostgreSQL. It also works as a standalone desktop app via Electron.

## Features

- Notes with importance levels (`normal`, `important`, `urgent`)
- Favourite notes
- Todos with completion tracking
- Calendar view (FullCalendar)
- Reminders
- Markdown editor
- Admin dashboard
- Authentication with credentials and Google OAuth (NextAuth)
- Health endpoint for DB status
- **Desktop app** (Electron) for offline-capable experience

## Tech Stack

- Next.js `16.1.2`
- React `19.2.3`
- Prisma `7.x`
- PostgreSQL `16` (local Docker)
- Material UI `7.x`
- NextAuth `4.x`
- FullCalendar `6.x`
- Sonner (toast notifications)
- Electron `35.x`

## Prerequisites

- Node.js `20+`
- `pnpm`
- Docker (for local PostgreSQL)

## Getting Started (Local PostgreSQL)

### Quick Start

```bash
make run
```

This starts Docker and the dev server. Or manually:

```bash
make install
make docker
make db-migrate
make dev
```

### Manual Setup

1. Install dependencies:

```bash
make install
# or: pnpm install
```

2. Create `.env` in the project root (copy from `.env.copy`) and set:

```env
DATABASE_URL="postgresql://postgres:ep543@localhost:5432/noted"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
PRISMA_CLIENT_ENGINE_TYPE=library

# Optional: Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

3. Start PostgreSQL:

```bash
make docker
# or: docker compose up -d
```

4. Run migrations:

```bash
make db-migrate
# or: npx prisma migrate dev
```

5. Start the app:

```bash
make dev
# or: pnpm dev
```

## Desktop App (Electron)

### Development Mode

```bash
make electron-dev
# or: pnpm electron:dev
```

This starts both the Next.js dev server and Electron app concurrently.

### Build for Distribution

```bash
# Linux (via Makefile)
make electron-build

# Linux
pnpm electron:build:linux

# Windows
pnpm electron:build:win

# macOS
pnpm electron:build:mac
```

Built packages are output to `dist-electron/` (gitignored):
- `Noted-0.1.0.AppImage` — Linux AppImage
- `noted_0.1.0_amd64.deb` — Debian package
- `linux-unpacked/` — Unpacked Linux app

## Optional: Supabase Connection

If you use Supabase connection pooling, set both:

```env
DATABASE_URL="postgresql://...pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://...pooler.supabase.com:5432/postgres"
```

Then run:

```bash
./migrate.sh
```

`migrate.sh` uses `DIRECT_URL` for migrations.

## Makefile Commands

| Command | Description |
|---------|-------------|
| `make install` | Install dependencies |
| `make dev` | Start Next.js dev server |
| `make build` | Build Next.js for production |
| `make start` | Start production server |
| `make electron` | Run Electron app (after dev server) |
| `make electron-build` | Build Electron app |
| `make electron-dev` | Run Next.js + Electron in dev mode |
| `make docker` | Start Docker services |
| `make docker-down` | Stop Docker services |
| `make db` | Open Prisma Studio |
| `make db-migrate` | Apply database migrations |
| `make db-generate` | Generate Prisma client |
| `make lint` | Run ESLint |
| `make clean` | Clean build artifacts |
| `make push` | Push to GitHub |
| `make commit MSG='message'` | Commit and push changes |
| `make run` | Run Docker + dev server |

## API Endpoints

All data endpoints require authentication and filter by the logged-in user.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/users` | Register user |
| `GET/POST` | `/api/notes` | List or create notes |
| `GET` | `/api/notes/important` | List important notes |
| `GET` | `/api/notes/urgent` | List urgent notes |
| `GET/PUT` | `/api/notes/favourite` | List/toggle favourites |
| `GET/PUT/DELETE` | `/api/notes/[id]` | Read/update/delete note |
| `GET/POST` | `/api/todos` | List or create todos |
| `GET` | `/api/todos/pending` | List pending todos |
| `GET/PUT/DELETE` | `/api/todos/[id]` | Read/update/delete todo |
| `GET` | `/api/health` | Health check |
| `GET/POST` | `/api/auth/[...nextauth]` | NextAuth handlers |

## Project Structure

```
app/
├── (main)/          # Authenticated routes
│   ├── admin/       # Admin dashboard
│   ├── calendar/    # Calendar view
│   ├── favourite/   # Favourited notes
│   ├── important/   # Important notes
│   ├── markdown/    # Markdown editor
│   ├── notes/       # All notes
│   ├── pending/     # Pending todos
│   ├── reminders/   # Reminders
│   ├── todo/        # Todos
│   └── urgent/      # Urgent notes
├── api/             # API route handlers
├── login/           # Login / sign-up page
├── layout.tsx       # Root layout
└── providers.tsx    # Client providers (Session, Theme, Notes)

components/          # Shared UI components
contexts/            # React Context (NotesProvider)
lib/                 # Auth config, Prisma client, utilities
prisma/              # Schema and migrations
electron/            # Electron main process and preload
dist-electron/       # Built Electron packages (gitignored)
scripts/             # Helper scripts (DB connection test, etc.)
```