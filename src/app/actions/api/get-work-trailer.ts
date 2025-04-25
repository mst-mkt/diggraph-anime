'use server'

import { jikanApiClient } from '@/lib/api/jikan'

export const getWorkTrailer = async (malId: number) => {
  const { data, error } = await jikanApiClient.GET('/anime/{id}', {
    params: { path: { id: malId } },
  })
  if (data === undefined) {
    console.error(`Failed to fetch trailer for ID ${malId}:`, error)
    return null
  }
  const trailer = data.data?.trailer
  if (trailer === undefined) {
    console.error(`No trailer found for ID ${malId}`)
    return null
  }
  return trailer
}
