import { config } from 'dotenv'
import type { Config } from 'drizzle-kit'

config({ path: '.env.local' })

const { DATABASE_URL, DATABASE_AUTH_TOKEN } = process.env

if (DATABASE_URL === undefined) {
  throw new Error('You must set the DATABASE_URL environment variables.')
}

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  },
} satisfies Config
