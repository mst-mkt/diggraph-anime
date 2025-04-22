'use server'

import { signIn } from '@/lib/auth'
import type { ProviderId } from 'next-auth/providers'

export const signInAction = async (provider: ProviderId) => {
  return await signIn(provider)
}
