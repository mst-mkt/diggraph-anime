import { ANNICT_TOKEN } from '@/lib/env-variables'
import { ANNICT_API_BASEURL } from '../../../constants/annict'
import { AnnictClient } from './client'
import { AnnictClientForVisitor } from './visitor-client'

export const annictApiClient = new AnnictClient(`${ANNICT_API_BASEURL}/v1`)
export const annictApiClientForVisitor = new AnnictClientForVisitor(
  `${ANNICT_API_BASEURL}/v1`,
  ANNICT_TOKEN,
)
