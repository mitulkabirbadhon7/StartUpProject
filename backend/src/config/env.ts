import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { z } from 'zod';

const envCandidates = [
  path.resolve(process.cwd(), 'backend/.env'),
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '../../.env'),
];

for (const p of envCandidates) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
    break;
  }
}

// Fallback to standard dotenv.config() if candidates weren't matched
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000').transform((v) => parseInt(v, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  DATABASE_URL: z.string().default('postgresql://neondb_owner:mock_password@ep-frosty-bird-65937549.eu-central-1.aws.neon.tech/neondb?sslmode=require'),
  JWT_SECRET: z.string().default('super-secret-european-bistro-jwt-key-2026'),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000').transform((v) => parseInt(v, 10)),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100').transform((v) => parseInt(v, 10)),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment configuration:');
  console.error(JSON.stringify(_env.error.format(), null, 2));
  process.exit(1);
}

export const env = _env.data;
