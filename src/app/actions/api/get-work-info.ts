'use server'

import { annictApiClient } from '@/lib/api/annict-rest'
import { auth } from '@/lib/auth'
import { getValidWorkImage } from '@/lib/image'

export const getWorkInfo = async (id: number) => {
  await auth()

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

  const workEpisodes = await annictApiClient.getEpisodes({
    query: { filter_work_id: id, page: 1, sort_sort_number: 'asc' },
  })

  if (!workEpisodes.isOk) {
    console.error(`Failed to fetch episodes for work (id:${id}):`, workEpisodes.error)
    return null
  }

  const episodes = workEpisodes.value.episodes

  const workCasts = await annictApiClient.getCasts({ query: { filter_work_id: id } })

  if (!workCasts.isOk) {
    console.error(workCasts.error)
    return null
  }

  const casts = workCasts.value.casts

  const workReviews = await annictApiClient.getReviews({
    query: { filter_work_id: id, page: 1, sort_likes_count: 'desc' },
  })

  if (!workReviews.isOk) {
    console.error(workReviews.error)
    return null
  }

  const reviews = workReviews.value.reviews

  const workWithMoreInfo = {
    ...work,
    episodes,
    casts,
    reviews,
    thumbnail: await getValidWorkImage(work),
  }

  return workWithMoreInfo
}
