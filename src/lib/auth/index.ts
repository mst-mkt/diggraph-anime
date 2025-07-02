import { dbClient } from '@/db/client'
import { accounts, sessions, users, verifications } from '@/db/schema'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { genericOAuth } from 'better-auth/plugins/generic-oauth'
import { ANNICT_CLIENT_ID, ANNICT_CLIENT_SECRET } from '../env-variables'

export const auth = betterAuth({
  database: drizzleAdapter(dbClient, {
    provider: 'sqlite',
    schema: {
      user: users,
      account: accounts,
      session: sessions,
      verification: verifications,
    },
  }),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['annict'],
    },
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: 'annict',
          clientId: ANNICT_CLIENT_ID,
          clientSecret: ANNICT_CLIENT_SECRET,
          authorizationUrl: 'https://api.annict.com/oauth/authorize',
          tokenUrl: 'https://api.annict.com/oauth/token',
          userInfoUrl: 'https://api.annict.com/v1/me',
          mapProfileToUser: (profile) => ({
            name: profile.name,
            email: profile.email,
            image: profile.avatar_url,
          }),
          scopes: ['read'],
        },
      ],
    }),
  ],
})
