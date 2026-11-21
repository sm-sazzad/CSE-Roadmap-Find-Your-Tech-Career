# AGENTS.md — CSE Roadmap

Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4. Deployed on Vercel.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — production build (includes TypeScript typecheck; `tsc` has no separate script)
- `npm run start` — production server
- `npm run lint` — ESLint (eslint-config-next)
- `npm run check:links` — verifies every resource URL in `src/data/roadmap.json`; requires internet

There is **no test script** and no test framework installed. Verify via `npm run build` + `npm run lint`.

## Path alias

`@/*` maps to `./src/*` (tsconfig `paths`).

## Data layer

Roadmap content lives in JSON, not code:

- `src/data/sector.json` — sector list (slug, name, description, icon)
- `src/data/roadmap.json` — English roadmap content (used by `scripts/check-links.mjs`)
- `src/data/roadmap.bn.json` — Bengali variant (i18n)
- `src/types/roadmap.ts` — TypeScript types for the data shape
- `src/lib/roadmap.ts` — data loading helpers

Adding a sector: add an entry to `sector.json` + `roadmap.json` (and `roadmap.bn.json` for Bengali), then create `src/app/sector/[slug]/page.tsx` if a custom page is needed. Route `/sector/[slug]` is dynamic and generated from sector slugs.

## Authentication

`better-auth` + `@better-auth/mongo-adapter`, configured in `src/lib/auth.ts` (reads `MONGODB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_*`, `GITHUB_*`). Auth API routes live at `src/app/api/auth/[...all]/route.ts`; UI pages under `src/app/(auth)/`.

**`.env` is gitignored but exists locally with real secrets** (DB credentials, OAuth secrets, mail credentials). Never commit it. Dev requires it populated — `src/lib/auth.ts` throws at import if `MONGODB_URL` or `BETTER_AUTH_SECRET` is missing.

**`src/proxy.ts` is NOT Next.js middleware** — it is not imported anywhere and its `matcher` config does nothing. It defines an auth guard (`/login` redirect) but is not wired into the request lifecycle. If you intend route protection, create `src/middleware.ts` or wire it in.

## i18n

`src/lib/i18n.tsx`, `src/lib/localize.ts`, and `src/components/LanguageToggle.tsx` handle English/Bengali switching. Roadmap text is served from `roadmap.json` vs `roadmap.bn.json`.

## Toolchain quirks

- `next.config.ts` enables `reactCompiler: true` (React Compiler) — `babel-plugin-react-compiler` is a devDependency.
- ESLint config (`eslint.config.mjs`) extends `eslint-config-next` core-web-vitals + typescript rules.
- Build artifacts: `.next/`, `out/` — gitignored; never commit.
- Tailwind v4 via `@tailwindcss/postcss` (`postcss.config.mjs`).

## Deployment

Vercel project configured in `.vercel/project.json` (project `cse`). Live demo: https://cse-roadmap-by-sazzad.vercel.app/

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
