# Architecture — MY CV APP

## Overview
Single Next.js application that contains:
- Public multipage CV website
- Private admin interface
- Database + API routes/server actions for content management

## Suggested Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Prisma ORM
- PostgreSQL (Neon/Supabase)
- Media storage: S3 or Cloudflare R2
- Auth: NextAuth (credentials/email) or Clerk

## Rendering Strategy
- Public pages: Server Components (SSR) for SEO and speed.
- Admin pages: Client components where needed for forms, uploads, drag/drop reorder.

## Data Access
- Use a dedicated `db` module for Prisma client initialization.
- Prefer server actions or API routes for admin mutations.
- Public pages use read-only queries.

## Media Upload Strategy
- Use signed uploads to S3/R2 (recommended).
- Store resulting URL + metadata in `MediaAsset`.
- Ensure admin-only ability to upload/change media.

## Animations
- Layout wrappers:
  - `AnimatedBackground`
  - `PageTransition` using Framer Motion
- Use `prefers-reduced-motion` to reduce/disable animations.

## Folder Structure (suggested)
apps/web:
- app/(public)/...
- app/admin/...
- app/api/...
- components/ui (GlassCard, DockNav, etc.)
- lib (auth, db, upload helpers)
- styles (globals)

packages/db:
- prisma/schema.prisma
- prisma/migrations
- seed script

## Deployment
- Vercel for Next.js
- Postgres hosted (Neon/Supabase)
- Storage (R2/S3)
- Domain + SSL

