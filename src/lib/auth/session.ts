import 'server-only'
import { headers } from 'next/headers'
import { auth } from '.'

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}
