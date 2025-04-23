'use server'

import { malToAnnict } from '@/lib/anime-id'
import { annictApiClient } from '@/lib/api/annict-rest'
import { jikanApiClient } from '@/lib/api/jikan'
import { auth } from '@/lib/auth'

export const getRelatedWorks = async (malId: number) => {
  await auth()
  const { data, error } = await jikanApiClient.GET('/anime/{id}/recommendations', {
    params: { path: { id: malId } },
  })

  if (data === undefined) {
    console.error(`Failed to fetch related works for ID ${malId}:`, error)
    return []
  }

  const relatedMalWorks = data.data?.map((work) => work.entry).filter((work) => work !== undefined)

  if (relatedMalWorks === undefined || relatedMalWorks.length === 0) {
    return []
  }

  const relatedMalIds = relatedMalWorks
    .map(({ mal_id }) => mal_id)
    .filter((malId) => malId !== undefined)
    .slice(0, 8)
  const relatedAnnictIds = relatedMalIds
    .map((malId) => malToAnnict(malId))
    .filter((annictId) => annictId !== undefined)
    .filter((work) => work !== undefined)

  const relatedAnnictWorks = await annictApiClient.getWorks({
    query: { filter_ids: relatedAnnictIds, page: 1 },
  })

  if (!relatedAnnictWorks.isOk) {
    console.error(
      `Failed to fetch works for IDs ${relatedAnnictIds.join(',')}:`,
      relatedAnnictWorks.error,
    )
    return []
  }

  return relatedAnnictWorks.value.works
}
