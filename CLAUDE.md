# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Noted is a full-stack note-taking and task management application with a React frontend and Django REST API backend.

## Commands

### Frontend (from `/frontend`)
```bash
npm run dev      # Start Vite dev server on port 5173
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend (from `/backend`)
```bash
python manage.py runserver    # Start Django dev server on port 8000
python manage.py migrate      # Apply database migrations
python manage.py makemigrations api  # Create new migrations after model changes
```

### Running Both Servers
Frontend and backend must run simultaneously during development. Frontend runs on `localhost:5173`, backend on `localhost:8000`.

## Architecture

### Stack
- **Frontend**: React 18 + Vite + Material-UI (MUI)
- **Backend**: Django 5.1 + Django REST Framework + Simple JWT
- **Database**: PostgreSQL (database name: `noted`)

### Directory Structure
```
frontend/src/
├── Pages/           # Route-level components (Notes, Todo, Login, SignUp, Calendar)
├── Components/      # Reusable components
│   ├── AuthProvider.jsx    # Auth context (isLogged, token, refreshToken)
│   └── NotesProvider.jsx   # Notes context (notesUpdated, notes, getNotes)
└── App.jsx          # React Router configuration

backend/
├── api/             # Main Django app (models, views, serializers)
└── backend/         # Django project settings
```

### State Management
Frontend uses React Context API with two providers:
- `AuthProvider` - JWT token management, login state
- `NotesProvider` - Notes data and refresh functions

Access via hooks: `useAuth()`, `useNotes()`

### Authentication Flow
1. JWT tokens obtained from `/api/token/` endpoint
2. Tokens stored in `sessionStorage` (`authToken`, `refresh`)
3. Access token included in `Authorization: Bearer {token}` header
4. Token refresh runs automatically every 5 minutes

### API Endpoints
- `POST /api/token/` - Login (returns access + refresh tokens with username/email)
- `POST /api/token/refresh/` - Refresh access token
- `/users/` - User CRUD (signup via POST)
- `/notes/` - Notes CRUD (filtered by authenticated user)
- `/todos/` - Todos CRUD (filtered by authenticated user)

### Data Models
**Note**: title, content, importance (normal/important/urgent), created_at, user (FK)
**Todo**: title, importance, checked (boolean), created_at, user (FK)

## Backend Dependencies
Django packages required (install via pip):
- django
- djangorestframework
- djangorestframework-simplejwt
- django-cors-headers
- psycopg2-binary (for PostgreSQL)
