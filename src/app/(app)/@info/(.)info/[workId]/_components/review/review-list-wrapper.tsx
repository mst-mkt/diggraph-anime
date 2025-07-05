import { getWorkReviews } from '@/app/actions/api/get-work-reviews'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { CloudAlertIcon, MessageCircleHeartIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { Skeleton } from '../../../../../../../components/ui/skeleton'
import { ReviewList } from './review-list.client'

type ReviewListWrapperProps = {
  workId: Work['id']
}

export const ReviewListWrapper: FC<ReviewListWrapperProps> = async ({ workId }) => {
  const reviewResult = await getWorkReviews(workId)

  if (reviewResult === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 p-16">
        <CloudAlertIcon size={40} className="text-diggraph-accent" />
        <p>レビューの取得に失敗しました</p>
      </div>
    )
  }

  if (reviewResult.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 p-16">
        <OrigamiIcon size={40} className="text-diggraph-accent" />
        <p>レビューが見当たりません</p>
      </div>
    )
  }

  return (
    <>
      <h3 className="flex items-center gap-x-2 font-bold text-lg">
        <MessageCircleHeartIcon size={24} className="text-diggraph-accent" />
        <span>レビュー</span>
      </h3>
      <ReviewList workId={workId} initialData={reviewResult.data} />
    </>
  )
}

export const ReviewListSkeleton = () => (
  <>
    <h3 className="flex items-center gap-x-2 font-bold text-lg">
      <MessageCircleHeartIcon size={24} className="text-diggraph-accent" />
      <span>レビュー</span>
    </h3>
    <div className="flex flex-col gap-y-12">
      {[...Array(3)].map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: index of static array
        <div key={`skeleton-${index}`} className="flex gap-x-4">
          <div className="sticky top-20">
            <Skeleton className="aspect-square h-10 w-10 rounded-full" />
          </div>
          <div className="flex w-full flex-col gap-y-4">
            <div className="flex w-full items-center justify-between gap-x-2">
              <Skeleton className="h-[1lh] w-20" />
              <Skeleton className="hidden h-[1lh] w-16 text-sm md:block" />
            </div>
            <div className="flex w-full flex-col gap-y-2">
              {[...Array(5)].map((_, line) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: index of static array
                <Skeleton key={`skeleton-${index}-${line}`} className="h-[1lh] w-full text-sm" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
)
