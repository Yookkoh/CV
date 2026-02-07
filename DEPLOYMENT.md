# Deployment — MY CV APP

## Local Setup (planned)
1) Install dependencies:
- pnpm install (or npm/yarn)

2) Create `.env`:
- DATABASE_URL=...
- NEXTAUTH_SECRET=...
- NEXTAUTH_URL=http://localhost:3000
- ADMIN_EMAIL=...
- ADMIN_PASSWORD_HASH=... (bcrypt hash; escape `$` as `\$` in `.env*` files)
- STORAGE_* vars for S3/R2 (if used)

3) Prisma:
- prisma migrate dev
- prisma db seed

4) Run:
- next dev

## Production
- Host on Vercel
- Database on Neon or Supabase
- Media storage on Cloudflare R2 or AWS S3

## Post-Deploy Checklist
- Verify admin login works
- Verify uploads work
- Verify OG tags + SEO
- Verify mobile dock behavior
