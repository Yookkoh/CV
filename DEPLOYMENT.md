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

## Netlify
1) Push the repo to GitHub.
2) Netlify: "Add new site" -> "Import an existing project" -> pick the GitHub repo.
3) Build settings are in `netlify.toml`:
- build command: `npm run build:netlify` (runs `prisma migrate deploy` + build)
- publish dir: `.next`
4) Set environment variables in Netlify:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production site URL)
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH` (bcrypt hash; no escaping needed in Netlify UI)

If your database is brand new (no tables yet), the Netlify build will run `prisma migrate deploy` to create the schema.
If Netlify build fails with a Prisma "outdated Prisma Client" message, ensure your build runs `prisma generate` (this repo's Netlify build does).

Note: `public/uploads` is not a durable storage target on Netlify. Use S3/R2 for uploads if you need persistence.

## Post-Deploy Checklist
- Verify admin login works
- Verify uploads work
- Verify OG tags + SEO
- Verify mobile dock behavior
