import { ANILIST_API_BASE_URL } from '@/constants/anilist'
import { createClient, fetchExchange } from '@urql/core'

export const anilistApiClient = createClient({
  url: ANILIST_API_BASE_URL,
  fetch: (url, fetchOptions = {}) => {
    return fetch(url, {
      cache: 'force-cache',
      ...fetchOptions,
      next: {
        revalidate: 3600,
        ...fetchOptions.next,
      },
    })
  },
  exchanges: [fetchExchange],
})
