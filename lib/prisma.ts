import { PrismaClient } from '../prisma/app/generated/prisma-client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Strip sslmode from the URL so pg doesn't parse it and emit a deprecation warning.
// SSL is configured explicitly via the ssl object instead.
function stripSslMode(url: string): string {
  const u = new URL(url);
  u.searchParams.delete('sslmode');
  return u.toString();
}

// Singleton pattern — prevents exhausting DB connections in Next.js dev (hot reload)
const globalForPrisma = globalThis as unknown as {
  pool: Pool;
  prisma: PrismaClient;
};

const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString: stripSslMode(process.env.DATABASE_URL!),
    ssl: { rejectUnauthorized: true },
  });
const adapter = new PrismaPg(pool);
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.pool = pool;
  globalForPrisma.prisma = prisma;
}