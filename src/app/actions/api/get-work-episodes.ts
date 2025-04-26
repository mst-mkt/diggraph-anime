'use server'

import { annictApiClient } from '@/lib/api/annict-rest'
import { auth } from '@/lib/auth'

export const getWorkEpisodes = async (id: number) => {
  await auth()

  const workEpisodes = await annictApiClient.getEpisodes({
    query: { filter_work_id: id, page: 1, sort_sort_number: 'asc' },
  })

  if (!workEpisodes.isOk) {
    console.error(`Failed to fetch episodes for work (id:${id}):`, workEpisodes.error)
    return []
  }

  return workEpisodes.value.episodes
}
