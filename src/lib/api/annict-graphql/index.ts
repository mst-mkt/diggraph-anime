import { ANNICT_API_BASEURL } from '@/constants/annict'
import { auth } from '@/lib/auth'
import { getAccessToken } from '@/lib/auth/accessToken'
import { createClient, fetchExchange } from '@urql/core'

export const annictGraphqlClient = createClient({
  url: `${ANNICT_API_BASEURL}/graphql`,
  fetch: async (url, fetchOptions = {}) => {
    await auth()
    const accessToken = await getAccessToken()

    if (accessToken === null) {
      throw new Error('No token found')
    }

    return fetch(url, {
      cache: 'force-cache',
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: 3600,
        ...fetchOptions.next,
      },
    })
  },
  exchanges: [fetchExchange],
})
