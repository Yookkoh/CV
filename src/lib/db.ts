import { PrismaClient } from "@prisma/client";

// Netlify DB extensions (ex: Neon) may inject `NETLIFY_DATABASE_URL` instead of
// the conventional `DATABASE_URL`. Prisma expects `DATABASE_URL`, so alias it.
if (!process.env.DATABASE_URL) {
  const netlifyDbUrl =
    process.env.NETLIFY_DATABASE_URL ||
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.NETLIFY_DATABASE_URL_UNPOOLED;

  if (netlifyDbUrl) process.env.DATABASE_URL = netlifyDbUrl;
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
