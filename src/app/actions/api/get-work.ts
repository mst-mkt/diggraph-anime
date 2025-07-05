'use server'

import { annictApiClient } from '@/lib/api/annict-rest'
import { getValidWorkImage } from '@/lib/images/valid-thumbnail'
import { isErr } from '@/lib/result'

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

export const getWorksByIds = async (ids: number[]) => {
  const works = await annictApiClient.getWorks({
    query: { filter_ids: ids, per_page: Math.min(ids.length, 50) },
  })

  if (isErr(works)) {
    console.error(`Failed to fetch works ${works.error}`)
    return []
  }

  return await Promise.all(
    works.value.works.map(async (work) => ({
      ...work,
      thumbnail: await getValidWorkImage(work),
    })),
  )
}
