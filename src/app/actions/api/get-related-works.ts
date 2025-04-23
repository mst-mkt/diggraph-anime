import { annictToMal, malToAnnict } from '@/lib/anime-id'
import { annictApiClient } from '@/lib/api/annict-rest'
import { jikanApiClient } from '@/lib/api/jikan'

export const getRelatedWorks = async (id: number) => {
  const malId = annictToMal(id)
  if (!malId) {
    console.error(`Failed to convert annict ID to MAL ID: ${id}`)
    return null
  }
  const { data } = await jikanApiClient.GET('/anime/{id}/recommendations', {
    params: {
      path: {
        id: malId,
      },
    },
  })
  const malRelatedWorks = data?.data

  const relatedIds = malRelatedWorks
    ?.map((work) => work.entry?.mal_id && malToAnnict(work.entry?.mal_id))
    .filter((work) => work !== undefined)

  const annictRelatedWorks = await annictApiClient.getWorks({
    query: {
      filter_ids: relatedIds,
      page: 1,
      per_page: 5,
    },
  })
  if (!annictRelatedWorks.isOk) {
    console.error(`Failed to fetch related works for ID ${id}:`, annictRelatedWorks.error)
    return null
  }
  const works = annictRelatedWorks.value.works
  return works ?? null
}
