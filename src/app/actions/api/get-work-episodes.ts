'use server'

import { annictApiClient } from '@/lib/api/annict-rest'

export const getWorkEpisodes = async (id: number) => {
  const workEpisodes = await annictApiClient.getEpisodes({
    query: { filter_work_id: id, page: 1, sort_sort_number: 'asc' },
  })

  if (!workEpisodes.isOk) {
    console.error(`Failed to fetch episodes for work (id:${id}):`, workEpisodes.error)
    return []
  }

  return workEpisodes.value.episodes
}
