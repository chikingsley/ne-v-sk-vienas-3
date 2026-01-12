# AGENTS.md

This file provides context for AI agents working on the Nešvęsk vienas codebase.

## Project Overview

Holiday hosting/guest matching platform for Lithuania. Connects hosts with guests for Christmas (Dec 24-26) and New Year's Eve (Dec 31) celebrations.

* *Tech Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Convex (real-time database), Clerk (auth), Sentry (errors), PostHog (analytics)

## Quick Start

```bash
bun install          # Install dependencies
bun dev              # Start Next.js + Convex dev servers (port 7777)

```text

## Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server (Next.js on port 7777 + Convex) |
| `bun build` | Production build |
| `bun lint` | Run Ultracite/Biome linter + TypeScript check |
| `bun lint:fix` | Auto-fix lint issues |
| `bun typecheck` | Run TypeScript type checking |
| `bun test` | Run Vitest tests (watch mode) |
| `bun test:once` | Run tests once without watch |

## Project Structure

```text
app/                    # Next.js App Router
  (landing)/           # Public landing page
  (dashboard)/         # Authenticated pages (browse, messages, profile, settings)
  (legal)/             # Terms, privacy, cookies pages
  api/                 # API routes
components/            # React components
  ui/                  # shadcn/ui base components
convex/                # Convex backend
  schema.ts            # Database schema (source of truth for data model)
  * .ts                 # Queries, mutations, actions
  * .test.ts            # Backend tests (use convex-test)
hooks/                 # Custom React hooks
lib/                   # Utilities (i18n, types, helpers)
contexts/              # React contexts
emails/                # React Email templates

```text

## Coding Conventions

### Bun over Node.js

- Use `bun` instead of `node`, `npm`, or `yarn`
- Bun automatically loads `.env` files - don't use dotenv

### TypeScript

- Strict mode enabled (`strict: true` in tsconfig)
- Use proper typing, avoid `any`
- Prefer type inference where obvious

### Linting & Formatting

- Biome via Ultracite handles both linting and formatting
- Pre-commit hooks run automatically (Husky + lint-staged)
- Run `bun lint:fix` to auto-fix issues

### Component Patterns

- Use shadcn/ui components from `components/ui/`
- Follow existing component structure in `components/`
- Use Tailwind CSS for styling

### Convex Backend

- Schema defined in `convex/schema.ts`
- Queries are read-only, mutations modify data
- Actions can have side effects (API calls, etc.)
- Use `convex-test` for backend tests with edge-runtime

## Testing

Tests use Vitest with `convex-test` for the Convex edge-runtime environment:

```bash
bun test              # Watch mode
bun test:once         # Single run

```text

Test files are in `convex/*.test.ts`. Example:

```typescript
import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

test("example", async () => {
  const t = convexTest(schema);
  const result = await t.query(api.profiles.listProfiles, {});
  expect(result).toEqual([]);
});

```text

## Environment Variables

Required env vars are documented in `env.example`. Key ones:

- `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `MAILEROO_API_KEY` - Email provider API key

Convex-specific env vars are set in Convex Dashboard, not `.env.local`.

## i18n

The app supports 4 languages: Lithuanian, English, Ukrainian, Russian.
- Translations are in `lib/i18n.ts`
- Use the translation function, don't hardcode strings

## Data Model

The database schema is in `convex/schema.ts`. Key tables:
- `users` - Linked to Clerk via `clerkId`
- `profiles` - User profiles with role (host/guest/both), preferences
- `conversations` - Chat threads between users
- `messages` - Individual messages in conversations
- `invitations` - Connection requests between users
- `userConsents` - GDPR consent records

## Key Workflows

### User Flow

1. Sign up via Clerk magic link
2. Complete onboarding (multi-step profile wizard)
3. Browse hosts/guests by city, date, language
4. Send/receive invitations
5. Chat when connected

### Auth

- Clerk handles authentication
- Clerk webhooks sync user data to Convex (`convex/http.ts`)
- User deletion cascades through all related data

## Gotchas

1. **Convex is real-time**: Queries auto-update when data changes
2. **Don't use `node:fs`**: Use Bun.file or Bun APIs
3. **Port 7777**: Dev server runs on port 7777, not 3000
4. **Pre-commit hooks**: Biome formatting runs automatically on commit
5. **TypeScript strict**: The codebase uses strict TypeScript - don't use `any`
