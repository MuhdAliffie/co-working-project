import { PrismaClient } from '../prisma/app/generated/prisma-client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Singleton pattern — prevents exhausting DB connections in Next.js dev (hot reload)
const globalForPrisma = globalThis as unknown as {
  pool: Pool;
  prisma: PrismaClient;
};

const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true }, // explicit verify-full, suppresses pg SSL deprecation warning
  });
const adapter = new PrismaPg(pool);
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.pool = pool;
  globalForPrisma.prisma = prisma;
}