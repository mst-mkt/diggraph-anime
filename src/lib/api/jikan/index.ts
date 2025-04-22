import { JIKAN_API_BASEURL } from '@/constants/jikan'
import createClient from 'openapi-fetch'
import type { paths } from './schema.gen'

export const jikanApiClient = createClient<paths>({
  baseUrl: JIKAN_API_BASEURL,
})
