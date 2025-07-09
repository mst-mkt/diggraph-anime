'use client'

import { getWorkReviews } from '@/app/actions/api/get-work-reviews'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Review } from '@/lib/api/annict-rest/schema/reviews'
import type { User } from '@/lib/api/annict-rest/schema/users'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { CloudAlertIcon, Loader2Icon } from 'lucide-react'
import type { FC } from 'react'
import { ReviewItem } from './review-item'

type ReviewWithUserAndWork = Review & { user: User; work: Work }

type ReviewListProps = {
  workId: Work['id']
  initialData: ReviewWithUserAndWork[]
}

export const ReviewList: FC<ReviewListProps> = ({ workId, initialData }) => {
  const { data, hasMore, error, isLoading, triggerRef } = useInfiniteScroll<ReviewWithUserAndWork>({
    initialData,
    fetchData: (page) => getWorkReviews(workId, page),
  })

  return (
    <div className="flex flex-col gap-y-12">
      {data.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
      {error instanceof Error && (
        <div className="flex flex-col items-center gap-y-4 py-16">
          <CloudAlertIcon size={40} className="text-diggraph-accent" />
          <p>レビューの読み込みに失敗しました</p>
        </div>
      )}
      {hasMore && (
        <div ref={triggerRef} className="flex justify-center py-4">
          {isLoading && (
            <div className="flex items-center">
              <Loader2Icon className="animate-spin text-diggraph-accent" size={30} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
