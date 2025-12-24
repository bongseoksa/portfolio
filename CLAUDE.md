# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React 19, TypeScript, and Vite. The site features internationalization (Korean/English), web performance monitoring via Supabase, and a dashboard for viewing web vitals metrics.

**Live site**: https://portfolio-wheat-eight-88.vercel.app/

**Tech stack**: React 19, TypeScript 5.8.3, Vite 7.0.0, Tailwind CSS, shadcn/ui, Supabase, Vercel

**Package manager**: pnpm 10.13.1
**Node version**: v22.18.0

## Development Commands

```bash
# Start development server with HMR
pnpm dev

# Type-check and build for production
pnpm build

# Lint code with ESLint
pnpm lint

# Preview production build locally
pnpm preview
```

## Architecture Overview

### Routing Structure

The application uses React Router with two main routes:
- `/` - Home page ([App.tsx](src/App.tsx)) with sections: Hero, Skills, Career, Projects
- `/dashboard` - Analytics dashboard ([page.tsx](src/app/dashboard/page.tsx)) showing web vitals metrics

### Environment-Based Data Flow

The application has **dual-path architecture** based on environment:

**Local Development** (`VITE_ENV=local`):
- Web vitals → Direct Supabase client ([superbaseClient.ts](src/lib/superbaseClient.ts))
- Uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables
- Direct database calls via [vitals.ts](src/api/vitals.ts)

**Production** (Vercel):
- Web vitals → Vercel serverless API → Supabase
- API endpoint: `/api/vitals` ([api/vitals.ts](api/vitals.ts))
- Uses `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` environment variables
- This routing is controlled by [vitals.ts](src/api/vitals.ts) using `import.meta.env.VITE_ENV`

### Key Directories

- [src/components/](src/components/) - Page sections (Hero, Skills, Career, Projects, Header, Footer)
- [src/components/ui/](src/components/ui/) - shadcn/ui components (54 components installed)
- [src/lib/](src/lib/) - Utilities, i18n setup, Supabase client
- [src/api/](src/api/) - Client-side API helpers for web vitals
- [src/data/](src/data/) - Portfolio content data (skills, experiences, projects)
- [src/types/](src/types/) - TypeScript type definitions
- [src/locales/](src/locales/) - Translation files (ko.json, en.json)
- [api/](api/) - Vercel serverless functions

### Critical Files

- [src/App.tsx](src/App.tsx) - Root component, routing, web vitals initialization
- [src/api/vitals.ts](src/api/vitals.ts) - Environment-based web vitals collection/retrieval
- [api/vitals.ts](api/vitals.ts) - Vercel serverless API for production vitals handling
- [src/lib/i18n.ts](src/lib/i18n.ts) - i18next configuration with browser language detection
- [src/lib/superbaseClient.ts](src/lib/superbaseClient.ts) - Supabase client (note: typo in filename)
- [src/data/portfolio.ts](src/data/portfolio.ts) - Portfolio content data

### Path Aliasing

The project uses `@` as an alias for `src/`:
```typescript
import { supabase } from '@/lib/superbaseClient';
import { Button } from '@/components/ui/button';
```

Configured in [vite.config.ts](vite.config.ts) and [tsconfig.app.json](tsconfig.app.json).

## CI/CD Pipeline

**DO NOT** configure Vercel GitHub integration. Deployment is controlled exclusively by GitHub Actions:

1. **CI** (`.github/workflows/ci.yml`) - Runs on push/PR to master
   - Node 20, pnpm setup
   - Linting and build checks

2. **CD** (`.github/workflows/cd.yml`) - Triggered after CI success
   - Deploys to Vercel using secrets: `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `VERCEL_TOKEN`

## Styling & UI

- **Tailwind CSS** with custom color variables defined in [tailwind.config.ts](tailwind.config.ts)
- **Dark mode** support via `next-themes` (class-based)
- **shadcn/ui** components configured in [components.json](components.json)
- **Code formatting**: Prettier with single quotes, semicolons, 100 char width ([.prettierrc](.prettierrc))

## Important Notes

1. **Typo in filename**: The Supabase client is in `superbaseClient.ts` (not `supabaseClient.ts`)
2. **Environment variables required**:
   - Local: `VITE_ENV=local`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - Production: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (Vercel secrets)
3. **SPA routing**: [vercel.json](vercel.json) rewrites all routes to `/` for client-side routing
4. **i18n**: Default language is Korean, with English support
5. **Web vitals**: Automatically collected on page load via [App.tsx](src/App.tsx)
