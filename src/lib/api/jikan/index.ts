import { JIKAN_API_BASEURL } from '@/constants/jikan'
import createClient from 'openapi-fetch'
import type { paths } from './schema.gen'

export const jikanApiClient = createClient<paths>({
  baseUrl: JIKAN_API_BASEURL,
  fetch: (input: RequestInfo, init: RequestInit = {}) => {
    return fetch(input, {
      cache: 'force-cache',
      ...init,
      next: {
        revalidate: 60 * 60 * 24 * 7,
        ...init.next,
      },
    })
  },
})
