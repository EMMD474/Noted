# Noted

Noted is a full-stack note-taking and task management application built with Next.js (App Router), Prisma, and PostgreSQL. It also works as a standalone desktop app via Electron.

## Features

- Email/password authentication with NextAuth
- Google sign-in
- Notes with `normal`, `important`, and `urgent` priority levels
- Favourite notes
- Todos with completion tracking
- Calendar view (FullCalendar)
- Reminders
- Markdown editor
- Admin dashboard
- Health endpoint for DB status
- **Desktop app** (Electron) for offline-capable experience

## Tech Stack

- Next.js `16.1.2`
- React `19.2.3`
- NextAuth `4.24.13`
- Prisma `7.x`
- PostgreSQL
- Material UI `7.x`
- FullCalendar `6.x`
- Sonner (toast notifications)
- Electron `35.x`

## Requirements

- Node.js `20+`
- `pnpm`
- PostgreSQL running locally or remotely

## Environment Variables

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

Notes:

- `ADMIN_EMAILS` is optional. If set, any matching email is treated as admin.
- A user can also be made admin by setting `auth_user.role = 'ADMIN'` in the database.
- For Google OAuth, add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI in Google Cloud.
- Add `http://localhost:3000` as an authorized JavaScript origin in Google Cloud.

3. Start PostgreSQL:

```bash
make docker
# or: docker compose up -d
```

4. Apply migrations.

```bash
make db-migrate
# or: npx prisma migrate dev
```

5. Start the app.

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

## Google Sign-In Note

This project forces IPv4 for the Google provider in NextAuth because some environments time out on Google OAuth requests when Node tries IPv6 first. That workaround lives in `lib/auth-options.ts`.

If Google sign-in still fails:

1. Confirm the redirect URI and origin in Google Cloud match `http://localhost:3000`.
2. Restart the dev server after changing auth config or env vars.
3. Check the server logs for `SIGNIN_OAUTH_ERROR`.

## Admin Access

Admins can access `/admin` to view:

- total users
- verified accounts
- notes and todo counts
- recent signups
- most active users
- all user records with role and content totals

The admin users API is available at `/api/admin/users`.

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
| `POST` | `/api/users` | Register a user |
| `GET/POST` | `/api/notes` | List or create notes |
| `GET` | `/api/notes/important` | List important notes |
| `GET` | `/api/notes/urgent` | List urgent notes |
| `GET` | `/api/notes/favourite` | List favourite notes |
| `GET/PUT/DELETE` | `/api/notes/[id]` | Read, update, or delete a note |
| `GET/POST` | `/api/todos` | List or create todos |
| `GET` | `/api/todos/pending` | List pending todos |
| `GET/PUT/DELETE` | `/api/todos/[id]` | Read, update, or delete a todo |
| `GET` | `/api/admin/users` | Admin dashboard data |
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
