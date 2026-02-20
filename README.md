# 📝 Noted

A modern, full-stack note-taking and task management application built with **Next.js 16**, **Prisma 7**, and **PostgreSQL**.

---

## ✨ Features

- 📑 **Notes Management** - Create and organize notes with priority levels: `Normal`, `Important`, and `Urgent`.
- ⭐ **Favourite Notes** - Easily toggle and view your most important notes in a dedicated section.
- ✅ **Smart Todos** - Track your tasks with completion status and priority settings.
- 🔐 **Dual Authentication** - Secure access via **Credentials** (Email/Password) or **Google OAuth**.
- 🩺 **Health Monitoring** - Integrated system health checks for database connectivity.
- 🎨 **Premium UI** - A sleek, responsive interface built with **Material UI 7** and polished with **Sonner** notifications.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.1.2](https://nextjs.org/) (App Router)
- **Library**: [React 19.2.3](https://react.dev/)
- **Styling**: [Material UI (MUI) 7](https://mui.com/)
- **Database**: [PostgreSQL 16](https://www.postgresql.org/) (via Docker)
- **ORM**: [Prisma 7.2.0](https://www.prisma.io/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/) (JWT-based)
- **Toast**: [Sonner](https://sonner.stephanmaximilian.me/)

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js**: 18.0.0 or higher
- **pnpm**: Recommended package manager
- **Docker**: For running PostgreSQL locally

### 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd Noted
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://postgres:ep543@localhost:5432/noted"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID="your-google-id"
   GOOGLE_CLIENT_SECRET="your-google-secret"
   ```

4. **Start the Infrastructure**
   ```bash
   ./run.sh
   # This starts Docker, applies migrations, and runs the dev server
   ```

---

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router (Routes & Layouts)
│   ├── (main)/           # Authenticated application views
│   ├── api/              # Backend API endpoints
│   └── login/            # Authentication pages
├── components/           # Reusable UI components
├── contexts/             # State management (NotesProvider)
├── lib/                  # Auth configuration and Prisma client
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/users` | Register a new user |
| `GET/POST` | `/api/notes` | List or create notes |
| `GET/PUT` | `/api/notes/favourite` | Toggle/View favourite notes |
| `GET/PUT/DELETE` | `/api/notes/[id]` | Perform operations on a specific note |
| `GET/POST` | `/api/todos` | List or create tasks |
| `GET/PUT/DELETE` | `/api/todos/[id]` | Perform operations on a specific task |
| `GET` | `/api/health` | Check database connection status |

---

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint checks
- `pnpm test:db` - Verify database connectivity

---

## 🐳 Database Management

- `docker compose up -d` - Start the database container
- `npx prisma migrate dev` - Apply migrations and update types
- `npx prisma studio` - Open the visual database editor

---

## 📄 License

This project is licensed under the **MIT License**.
