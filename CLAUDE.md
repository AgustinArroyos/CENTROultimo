# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # ESLint (max-warnings 0 — must be clean)
```

Docker:
```bash
docker-compose up --build   # Build and run via Nginx on port 80
```

## Architecture

React 18 SPA built with Vite, styled with Tailwind CSS + Flowbite React, routed with React Router v7.

**Entry points:**
- `src/main.jsx` — React root, wraps app in `RouterProvider`
- `src/router/index.jsx` — all route definitions (`/`, `/posts`, `/cursos`, `/inscripcion`, `/nosotros`, `/curso/:id`, …)
- `src/App.jsx` — home page layout, composes section components sequentially

**Key directories:**
- `src/components/` — reusable UI sections (Hero, Navbar, Blog, Footer, etc.); `componentsInscr/` holds enrollment-flow components
- `src/pages/` — full-page components rendered by the router
- `src/services/` — Axios-based API calls; base URL is `https://centroformacion.hopto.org/api`, auth via Bearer token from `VITE_API_TOKEN`
- `src/hooks/` — custom hooks (`useFetchCursos`, `useForm`)
- `src/utils/` — form validation and data helpers

**Styling:** Tailwind utility classes throughout; custom brand palette defined in `tailwind.config.js` (e.g. `brandPrimary: #3C8AEE`). Component-scoped CSS lives in `src/components/styles/` and `src/pages/styles/`.

**Environment:** Requires a `.env` file with `VITE_API_TOKEN` to authenticate against the backend API.
