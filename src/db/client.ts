import { DATABASE_AUTH_TOKEN, DATABASE_URL } from '@/lib/env-variables'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

const turso = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
})

export const dbClient = drizzle(turso)
