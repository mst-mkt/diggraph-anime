import { sql } from 'drizzle-orm'
import { sqliteTable } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('user', (d) => ({
  id: d
    .text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.text('name').notNull(),
  email: d.text('email').unique().notNull(),
  emailVerified: d.integer('emailVerified', { mode: 'boolean' }).default(false),
  image: d.text('image'),
  createdAt: d
    .integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: d
    .integer('updatedAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(current_timestamp)`),
}))

export const accounts = sqliteTable('account', (d) => ({
  id: d.text('id').primaryKey(),
  userId: d
    .text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  providerId: d.text('providerId').notNull(),
  accountId: d.text('accountId').notNull(),
  refreshToken: d.text('refreshToken'),
  refreshTokenExpiresAt: d.integer('refreshTokenExpiresAt', { mode: 'timestamp_ms' }),
  accessToken: d.text('accessToken'),
  accessTokenExpiresAt: d.integer('accessTokenExpiresAt'),
  scope: d.text('scope'),
  idToken: d.text('idToken'),
  createdAt: d
    .integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: d
    .integer('updatedAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(current_timestamp)`),
}))

export const sessions = sqliteTable('session', (d) => ({
  id: d.text('id').primaryKey(),
  token: d.text('token').notNull(),
  userId: d
    .text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: d.integer('expiresAt', { mode: 'timestamp_ms' }).notNull(),
  ipAddress: d.text('ipAddress'),
  userAgent: d.text('userAgent'),
  createdAt: d
    .integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: d
    .integer('updatedAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(current_timestamp)`),
}))

export const verifications = sqliteTable('verification', (d) => ({
  id: d.text('id').primaryKey(),
  identifier: d.text('identifier').notNull(),
  value: d.text('value').notNull(),
  expiresAt: d.integer('expiresAt', { mode: 'timestamp_ms' }).notNull(),
  createdAt: d
    .integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: d
    .integer('updatedAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(current_timestamp)`),
}))
