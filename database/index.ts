import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'
import { env } from '@/config/env'

const databaseUrl = env.DATABASE_URL

let db: any;

if (!databaseUrl) {
  console.warn('DATABASE_URL is missing. Using mock database fallback.');
  // Mock db object to prevent crashes on export
  db = {
    query: {},
    insert: () => ({ values: () => {} }),
    select: () => ({ from: () => ({ where: () => {} }) }),
    update: () => ({ set: () => ({ where: () => {} }) }),
    delete: () => ({ where: () => {} }),
  };
} else {
  const queryClient = postgres(databaseUrl)
  db = drizzle({ client: queryClient, schema })
}

export { db }
