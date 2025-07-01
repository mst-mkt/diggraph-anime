import 'server-only'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'
import { AnnictProvider } from './provider'
import 'next-auth/jwt'
import { dbClient } from '@/db/client'
import { ANNICT_CLIENT_ID, ANNICT_CLIENT_SECRET, AUTH_SECRET, BASE_URL } from '../env-variables'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: AUTH_SECRET,
  adapter: DrizzleAdapter(dbClient),
  providers: [
    AnnictProvider({
      redirectUri: `${BASE_URL}/api/auth/callback/annict`,
      clientId: ANNICT_CLIENT_ID,
      clientSecret: ANNICT_CLIENT_SECRET,
      scope: ['read'],
    }),
  ],
})
