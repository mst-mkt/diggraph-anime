'use server'

import { annictApiClient } from '@/lib/api/annict-rest'

export const getWorkCasts = async (id: number) => {
  const workCasts = await annictApiClient.getCasts({ query: { filter_work_id: id } })

  if (!workCasts.isOk) {
    console.error(workCasts.error)
    return []
  }

  return workCasts.value.casts
}
