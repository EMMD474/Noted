# Noted

Noted is a full-stack notes and task app built with Next.js App Router, NextAuth, Prisma, PostgreSQL, and Material UI.

## Features

- Email/password authentication with NextAuth
- Google sign-in
- Notes with `normal`, `important`, and `urgent` priority levels
- Favourite notes
- Todos with pending and completed states
- Calendar, markdown, reminders, and filtered category views
- Admin dashboard for viewing users and workspace stats

## Tech Stack

- Next.js `16.1.2`
- React `19.2.3`
- NextAuth `4.24.13`
- Prisma `7.x`
- PostgreSQL
- Material UI `7.x`

## Requirements

- Node.js `20+`
- `pnpm`
- PostgreSQL running locally or remotely

## Environment Variables

Create `.env.local` for auth values and `.env` for database values if needed.

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/noted"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
PRISMA_CLIENT_ENGINE_TYPE=library
ADMIN_EMAILS="admin@example.com"
```

Notes:

- `ADMIN_EMAILS` is optional. If set, any matching email is treated as admin.
- A user can also be made admin by setting `auth_user.role = 'ADMIN'` in the database.
- For Google OAuth, add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI in Google Cloud.
- Add `http://localhost:3000` as an authorized JavaScript origin in Google Cloud.

## Local Setup

1. Install dependencies.

```bash
pnpm install
```

2. Start PostgreSQL.

```bash
docker compose up -d
```

3. Apply migrations.

```bash
pnpm prisma migrate deploy
```

4. Start the app.

```bash
pnpm dev
```

The helper script below starts Docker and the dev server:

```bash
./run.sh
```

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

## Scripts

- `pnpm dev` - start the local dev server
- `pnpm build` - build the production app
- `pnpm start` - run the production server
- `pnpm lint` - run ESLint
- `pnpm test:db` - test database connectivity
- `./run.sh` - start Docker and the dev server
- `./stop.sh` - stop Docker services

## API Routes

| Method | Route | Description |
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

```text
app/         Next.js routes and API handlers
components/  Shared UI components
contexts/    React state providers
lib/         Auth, Prisma, and server utilities
prisma/      Schema, client config, and migrations
public/      Static assets
```
