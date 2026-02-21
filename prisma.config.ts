// prisma.config.ts
import { defineConfig, env } from '@prisma/config';
import 'dotenv/config'; // Required to load your .env file

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});