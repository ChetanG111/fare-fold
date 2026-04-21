import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'
import { env } from '@/config/env'

const databaseUrl = env.DATABASE_URL

let db: any;

if (!databaseUrl) {
  console.warn('DATABASE_URL is missing. Using mock database fallback.')
  // Export a proxy as a mock DB to prevent crashes
  const mockDb = new Proxy({}, {
    get: (target, prop) => {
      return () => ({
        where: () => ({
          orderBy: () => ({
            limit: () => [],
          }),
        }),
        insert: () => ({
          values: () => [],
        }),
      })
    }
  })
  // @ts-ignore
  db = mockDb as any
} else {
  const queryClient = postgres(databaseUrl)
  db = drizzle({ client: queryClient, schema })
  console.log('✅ Database connected successfully to Neon')
}

export { db }
