'use client'

import type { SearchOrder, SearchSort } from '@/app/(main)/select/search-params'
import { getWorks } from '@/app/actions/api/get-search-works'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { WorkWithThumbnail } from '@/lib/images/valid-thumbnail'
import { CloudAlertIcon, Loader2Icon } from 'lucide-react'
import type { FC } from 'react'
import { WorkCard } from './work-card'

type WorkListProps = {
  initialData: WorkWithThumbnail[]
  tab: 'search' | 'current_season' | 'watched'
  search: {
    query: string
    sort: SearchSort
    order: SearchOrder
    season?: string
  }
}

export const WorkList: FC<WorkListProps> = ({ initialData, search, tab }) => {
  const { data, hasMore, error, isLoading, triggerRef } = useInfiniteScroll<WorkWithThumbnail>({
    initialData,
    fetchData: (page) => getWorks(tab, search, page),
  })

  if (error instanceof Error) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon size={40} className="text-diggraph-accent" />
        <p>作品の検索に失敗しました</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {data.map((work) => (
          <div key={work.id} className="h-full w-full">
            <WorkCard work={work} />
          </div>
        ))}
      </div>
      {hasMore && (
        <div ref={triggerRef} className="flex justify-center py-4">
          {isLoading && (
            <div className="flex items-center">
              <Loader2Icon className="animate-spin text-diggraph-accent" size={30} />
            </div>
          )}
        </div>
      )}
    </>
  )
}
