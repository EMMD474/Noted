# Noted

A full-stack note-taking and task management application built with Next.js, Prisma, and PostgreSQL.

## Features

- **Notes** - Create, edit, and organize notes with importance levels (normal, important, urgent)
- **Todos** - Manage tasks with completion tracking and priority settings
- **Authentication** - Secure JWT-based auth with NextAuth credentials provider
- **Responsive UI** - Material-UI components with custom theming

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Database**: PostgreSQL 16 (via Docker)
- **ORM**: Prisma 7
- **Authentication**: NextAuth with JWT sessions
- **UI**: Material-UI (MUI) 7

## Prerequisites

- Node.js 18+
- pnpm
- Docker & Docker Compose

## Quick Start

1. **Clone and install dependencies**
   ```bash
   git clone <repo-url>
   cd Noted
   pnpm install
   ```

2. **Configure environment**

   Create a `.env` file with your database connection:
   ```env
   DATABASE_URL="postgresql://postgres:ep543@localhost:5432/noted"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Start the database and server**
   ```bash
   ./run.sh
   ```

   Or manually:
   ```bash
   docker compose up -d          # Start PostgreSQL
   npx prisma migrate dev        # Apply migrations
   pnpm dev                      # Start dev server
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── (main)/                  # Authenticated routes (notes, todo, calendar)
├── api/                     # API route handlers
│   ├── auth/[...nextauth]/  # NextAuth endpoints
│   ├── notes/               # Notes CRUD
│   ├── todos/               # Todos CRUD
│   └── users/               # User registration
├── login/                   # Login/signup page
└── providers.tsx            # Client providers wrapper

components/                  # Reusable React components
contexts/                    # React Context (NotesProvider)
lib/                         # Utilities (auth config, Prisma client, theme)
prisma/                      # Schema and migrations
```

## API Endpoints

All data endpoints require authentication and filter by logged-in user.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | User registration |
| GET/POST | `/api/notes` | List/create notes |
| GET/PUT/DELETE | `/api/notes/[id]` | Single note operations |
| GET/POST | `/api/todos` | List/create todos |
| GET/PUT/DELETE | `/api/todos/[id]` | Single todo operations |

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Database Commands

```bash
docker compose up -d           # Start PostgreSQL container
npx prisma migrate dev         # Apply migrations (development)
npx prisma migrate deploy      # Apply migrations (production)
npx prisma generate            # Regenerate Prisma client
npx prisma studio              # Open database GUI
```

## License

MIT
