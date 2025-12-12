import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import * as path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
});

export default defineConfig({
  dialect: 'postgresql',
  schema: ['./shared/db/tables/index.ts'],
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URI || '',
  },
});
