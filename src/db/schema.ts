import { primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core'
import type { AdapterAccountType } from 'next-auth/adapters'

export const users = sqliteTable('user', (d) => ({
  id: d
    .text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.text('name'),
  email: d.text('email').unique(),
  emailVerified: d.integer('emailVerified', { mode: 'timestamp_ms' }),
  image: d.text('image'),
}))

export const accounts = sqliteTable(
  'account',
  (d) => ({
    userId: d
      .text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: d.text('type').$type<AdapterAccountType>().notNull(),
    provider: d.text('provider').notNull(),
    providerAccountId: d.text('providerAccountId').notNull(),
    refresh_token: d.text('refresh_token'),
    access_token: d.text('access_token'),
    expires_at: d.integer('expires_at'),
    token_type: d.text('token_type'),
    scope: d.text('scope'),
    id_token: d.text('id_token'),
    session_state: d.text('session_state'),
  }),
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ],
)

export const sessions = sqliteTable('session', (d) => ({
  sessionToken: d.text('sessionToken').primaryKey(),
  userId: d
    .text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: d.integer('expires', { mode: 'timestamp_ms' }).notNull(),
}))

export const verificationTokens = sqliteTable(
  'verificationToken',
  (d) => ({
    identifier: d.text('identifier').notNull(),
    token: d.text('token').notNull(),
    expires: d.integer('expires', { mode: 'timestamp_ms' }).notNull(),
  }),
  (verificationToken) => [
    primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  ],
)

export const authenticators = sqliteTable(
  'authenticator',
  (d) => ({
    credentialID: d.text('credentialID').notNull().unique(),
    userId: d
      .text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: d.text('providerAccountId').notNull(),
    credentialPublicKey: d.text('credentialPublicKey').notNull(),
    counter: d.integer('counter').notNull(),
    credentialDeviceType: d.text('credentialDeviceType').notNull(),
    credentialBackedUp: d
      .integer('credentialBackedUp', {
        mode: 'boolean',
      })
      .notNull(),
    transports: d.text('transports'),
  }),
  (authenticator) => [
    primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  ],
)
