import type { Graph } from '@/app/actions/db/graph'
import { sql } from 'drizzle-orm'
import { sqliteTable } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const users = sqliteTable('user', (d) => ({
  id: d
    .text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
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
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => new Date()),
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
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => new Date()),
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
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => new Date()),
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

export const savedGraphs = sqliteTable('saved_graph', (d) => ({
  id: d
    .text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  graph: d.text('graph', { mode: 'json' }).$type<Graph>().notNull(),
  userId: d
    .text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: d.text('title').notNull(),
  public: d.integer('public', { mode: 'boolean' }).notNull().default(false),
  createdAt: d
    .integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: d
    .integer('updatedAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => new Date()),
}))

export const collections = sqliteTable('collection', (d) => ({
  id: d
    .text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: d
    .text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: d.text('name').notNull(),
  description: d.text('description'),
  createdAt: d
    .integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: d
    .integer('updatedAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => new Date()),
}))

export const collectionItems = sqliteTable('collection_item', (d) => ({
  id: d
    .text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  collectionId: d
    .text('collectionId')
    .notNull()
    .references(() => collections.id, { onDelete: 'cascade' }),
  annictId: d.integer('annictId').notNull(),
  thumbnail: d.text('thumbnail').notNull(),
}))
