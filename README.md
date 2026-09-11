# Center Pizza - Fullstack Web Application

A modern full-stack web ordering system for Center Pizza featuring a responsive React frontend powered by Vite and Tailwind CSS, coupled with an Express.js REST API backend.

## Architecture

- **`frontend/`**: React 18, Vite, Tailwind CSS, Lucide icons.
- **`backend/`**: Express.js REST API, JSON database catalog, order processing.
- **Root**: Configured with `npm workspaces` for single-command installation and running.

## Getting Started

### 1. Install Dependencies
Run from the root directory:
```bash
npm install
```
This automatically installs dependencies for both `frontend` and `backend`.

### 2. Run in Development Mode
To start both the Backend (port 3000) and Frontend (port 5173) concurrently:
```bash
npm run dev
```

You can also run them separately:
- **Frontend only**: `npm run dev:frontend` (http://localhost:5173)
- **Backend only**: `npm run dev:backend` (http://localhost:3000)

### 3. Build for Production
```bash
npm run build
```

## API Endpoints

- `GET  /api/health` - Check API liveness & uptime
- `GET  /api/menu` - Fetch menu items (supports query filters `?category=...&popular=true&search=...`)
- `GET  /api/cities` - Fetch serviceable cities and branch locations
- `POST /api/orders` - Submit a new food order
