// lib/env.ts
import "dotenv/config"; // Important for Prisma 7

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  DATABASE_URL: getEnv("DATABASE_URL"),
  SUPABASE_URL: getEnv("NEXT_PUBLIC_SUPABASE_URL"),
  SUPABASE_KEY: getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  // Add other variables here...
};