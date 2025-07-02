'use server'

import { annictApiClient } from '@/lib/api/annict-rest'
import { getValidWorkImage } from '@/lib/images/valid-thumbnail'

export const getWork = async (id: number) => {
  const workResult = await annictApiClient.getWorks({
    query: { filter_ids: [id], per_page: 1 },
  })

  if (!workResult.isOk) {
    console.error(`Failed to fetch work (id:${id}):`, workResult.error)
    return null
  }

  const [work] = workResult.value.works

  if (work === undefined) {
    console.error(`No work found for id: ${id}`)
    return null
  }

  const workWithThumbnail = {
    ...work,
    thumbnail: await getValidWorkImage(work),
  }

  return workWithThumbnail
}
