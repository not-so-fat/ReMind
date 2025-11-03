import { PrismaClient } from '../generated/prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Check if DATABASE_URL is set (support both DATABASE_URL and POSTGRES_PRISMA_URL)
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL or POSTGRES_PRISMA_URL environment variable is not set');
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

