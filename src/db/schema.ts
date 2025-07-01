import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const exampleTable = sqliteTable('example', {
  bar: text('bar').notNull().default('Hey!'),
})
