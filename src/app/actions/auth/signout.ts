'use server'

import { signOut } from '@/lib/auth'

export const signOutAction = async () => {
  return await signOut()
}
