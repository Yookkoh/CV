# MY CV APP

A web-based CV application with:
- A public, multipage CV website (Apple-like, professional, subtle glass UI)
- A private admin backend to update content (profile, about, skills, experience, projects, media)
- Responsive design with a mobile bottom navigation dock
- Subtle background + route transition animations

## Tech Stack (recommended)
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (transitions)
- PostgreSQL + Prisma
- Auth (NextAuth or Clerk)
- Object storage for media (S3 / Cloudflare R2)

## High-Level Pages
Public:
- `/` Home
- `/about`
- `/experience`
- `/skills`
- `/projects`
- `/projects/[slug]`
- `/contact`
Optional: `/resume`

Admin (private):
- `/admin`
- `/admin/profile`
- `/admin/about`
- `/admin/experience`
- `/admin/skills`
- `/admin/projects`
- `/admin/settings`

## Local Development (planned)
1. Install deps
2. Setup `.env`
3. Run migrations + seed
4. Start dev server

Details are in `DEPLOYMENT.md`.

## Docs
- `PRD.md` — product requirements
- `ARCHITECTURE.md` — technical approach
- `DATA_MODEL.md` — database schema draft
- `SECURITY.md` — auth + access rules
- `DEPLOYMENT.md` — how to run and deploy
- `NOTES.md` — design tokens + UX rules

