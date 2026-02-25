# Noted

Noted is a full-stack notes and todo application built with Next.js (App Router), Prisma, and PostgreSQL.

## Features

- Notes with importance levels (`normal`, `important`, `urgent`)
- Favourite notes
- Todos with completion tracking
- Auth with credentials and NextAuth
- Health endpoint for DB status

## Tech Stack

- Next.js `16.1.2`
- React `19.2.3`
- Prisma `7.x`
- PostgreSQL `16` (local Docker)
- Material UI `7.x`
- NextAuth `4.x`

## Prerequisites

- Node.js `20+`
- `pnpm`
- Docker (for local PostgreSQL)

## Getting Started (Local PostgreSQL)

1. Install dependencies:

```bash
pnpm install
```

2. Create `.env` in the project root (or copy from `.env.copy`) and set:

```env
DATABASE_URL="postgresql://postgres:ep543@localhost:5432/noted"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
PRISMA_CLIENT_ENGINE_TYPE=library
```

3. Start PostgreSQL:

```bash
docker compose up -d
```

4. Run migrations:

```bash
npx prisma migrate dev
```

5. Start the app:

```bash
pnpm dev
```

You can also use:

```bash
./run.sh
```

`run.sh` starts Docker and `pnpm dev`.

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

## API Endpoints

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

## Useful Scripts

- `pnpm dev` - Start local dev server
- `pnpm build` - Build production bundle
- `pnpm start` - Run production server
- `pnpm lint` - Run ESLint
- `pnpm test:db` - Check DB connectivity
- `./run.sh` - Start Docker + dev server
- `./stop.sh` - Stop Docker services

## Project Structure

```bash
app/            # Next.js routes and API handlers
components/     # Shared UI components
contexts/       # React context state
lib/            # Auth, Prisma, utilities
prisma/         # Schema and migrations
public/         # Static assets
```
