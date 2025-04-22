import 'server-only'
import NextAuth from 'next-auth'
import { AnnictProvider } from './provider'
import 'next-auth/jwt'
import { ANNICT_CLIENT_ID, ANNICT_CLIENT_SECRET, AUTH_SECRET, BASE_URL } from '../env-variables'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: AUTH_SECRET,
  providers: [
    AnnictProvider({
      redirectUri: `${BASE_URL}/api/auth/callback/annict`,
      clientId: ANNICT_CLIENT_ID,
      clientSecret: ANNICT_CLIENT_SECRET,
      scope: ['read'],
    }),
  ],
  callbacks: {
    jwt: ({ token, account }) => {
      if (account?.access_token !== undefined) {
        token.accessToken = account.access_token
      }

      return token
    },
    session: ({ session, token }) => {
      if (token.accessToken !== undefined) {
        session.accessToken = token.accessToken
      }

      return session
    },
  },
})

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}
