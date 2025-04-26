'use server'

import { annictApiClient } from '@/lib/api/annict-rest'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { auth } from '@/lib/auth'

export const getWorkReviews = async (workId: Work['id'], page = 1) => {
  await auth()

  const reviewsResult = await annictApiClient.getReviews({
    query: {
      filter_work_id: workId,
      filter_has_review_body: true,
      sort_likes_count: 'desc',
      per_page: 20,
      page,
    },
  })

  if (!reviewsResult.isOk) {
    console.error(`Failed to fetch reviews of work (${workId}):`, reviewsResult.error)
    return null
  }

  return reviewsResult.value.reviews
}
