import 'server-only'
import { dbClient } from '@/db/client'
import { accounts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '.'

export const getAccessToken = async () => {
  const session = await auth()

  if (session === null || session.user?.id === undefined) {
    return null
  }

  const userId = session.user.id

  const result = await dbClient
    .select({ accessToken: accounts.access_token })
    .from(accounts)
    .where(eq(accounts.userId, userId))
    .limit(1)

  if (result.length === 0) {
    return null
  }

  const { accessToken } = result[0]
  return accessToken
}
