'use client'

import type { SearchOrder, SearchSort } from '@/app/(main)/select/search-params'
import { getSearchMyWorks, getSearchWorks } from '@/app/actions/api/get-search-works'
import { Skeleton } from '@/components/ui/skeleton'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { WorkWithThumbnail } from '@/lib/images/valid-thumbnail'
import { CloudAlertIcon, Loader2Icon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { WorkCard } from './work-card'

type WorkListClientProps = {
  initialData: WorkWithThumbnail[]
  initialHasMore: boolean
  q?: string
  t?: 'search' | 'current_season' | 'watched'
  sort?: SearchSort
  order?: SearchOrder
  filterSeason?: string
}

export const WorkListClient: FC<WorkListClientProps> = ({
  initialData,
  initialHasMore,
  q,
  t,
  sort,
  order,
  filterSeason,
}) => {
  const fetchData = async (page: number) => {
    if (t === 'search' || t === 'current_season') {
      return await getSearchWorks(
        {
          q,
          sort,
          order,
          season: filterSeason,
        },
        page,
      )
    }

    if (t === 'watched') {
      return await getSearchMyWorks(
        'watched',
        {
          q,
          sort,
          order,
          season: filterSeason,
        },
        page,
      )
    }

    return null
  }

  const { works, hasMore, isPending, error, loadingRef } = useInfiniteScroll({
    initialData,
    initialHasMore,
    fetchData,
  })

  if (error) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon size={40} className="text-diggraph-accent" />
        <p>作品の読み込みに失敗しました</p>
      </div>
    )
  }

  if (works.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon size={40} className="text-diggraph-accent" />
        <p>作品の検索結果が見当たりませんでした</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {works.map((work) => (
          <div key={work.id} className="h-full w-full">
            <WorkCard work={work} />
          </div>
        ))}
      </div>

      {/* Sentinel element for infinite scroll */}
      {hasMore && (
        <div ref={loadingRef} className="flex justify-center py-4">
          {isPending && (
            <div className="flex items-center">
              <Loader2Icon className="animate-spin text-diggraph-accent" size={30} />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export const WorkListClientSkeleton = () => (
  <div className="flex flex-col gap-4">
    {[...Array(8)].map((_, index) => (
      <div
        // biome-ignore lint/suspicious/noArrayIndexKey: index of static array
        key={index}
        className="flex h-full w-full flex-col items-center gap-3 rounded-xl border border-border p-2 shadow-xs sm:flex-row"
      >
        <Skeleton className="aspect-video w-full shrink-0 sm:h-full sm:w-52" />
        <div className="flex h-full w-full flex-col gap-y-1 py-3">
          <Skeleton className="h-[1lh] w-2/3" />
          <Skeleton className="h-[1lh] w-2/5 text-sm" />
          <Skeleton className="h-[1lh] w-1/2 text-xs" />
        </div>
      </div>
    ))}
  </div>
)
