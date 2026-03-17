# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### `artifacts/layered-studio` — Layered Studio Portfolio Website

Premium web design & development agency portfolio. React + Vite frontend at `/`.

**Sections:**
- Hero: Bold full-screen headline with animated entrance
- Capabilities: 3 glassmorphism cards
- Process: SVG curved snake path drawn on scroll (reverses on scroll up), step milestones activate as path reaches them
- Work: Auto-scrolling horizontal carousel (cursor-independent marquee)
- Pricing: 3 tiers (Starter ₹30k–35k, Professional ₹55k–60k, Premium ₹70k+)
- Testimonials: Auto-scrolling horizontal marquee
- Contact: Full form + date/time scheduler
- Footer

**Key features:**
- Custom CSS cursor (dot + lagging ring)
- Scroll-based SVG path animation (GSAP-style using native scroll events)
- Cursor: none on body, custom cursor elements
- Framer Motion not used (kept minimal/native for performance)

**Libraries:** lucide-react, gsap, @studio-freight/lenis, framer-motion, @emailjs/browser

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   ├── layered-studio/     # Portfolio website (main artifact at /)
│   └── mockup-sandbox/     # Design sandbox
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck`.
- **`emitDeclarationOnly`** — only emit `.d.ts` files during typecheck.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes in `src/routes/`.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

### `lib/api-spec` (`@workspace/api-spec`)

OpenAPI 3.1 spec and Orval config. Run codegen: `pnpm --filter @workspace/api-spec run codegen`
