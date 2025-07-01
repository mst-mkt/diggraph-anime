import type { SearchOrder, SearchSort } from '@/app/(main)/select/search-params'
import { getWorks } from '@/app/actions/api/get-search-works'
import { Skeleton } from '@/components/ui/skeleton'
import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { WorkList } from './work-list.client'

type WorkListWrapperProps = {
  tab: 'search' | 'current_season' | 'watched'
  query: string
  sort: SearchSort
  order: SearchOrder
  season?: string
}

export const WorkListWrapper: FC<WorkListWrapperProps> = async ({ tab, ...search }) => {
  const workResult = await getWorks(tab, search)

  if (workResult === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon size={40} className="text-diggraph-accent" />
        <p>作品の検索に失敗しました</p>
      </div>
    )
  }

  if (workResult.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon size={40} className="text-diggraph-accent" />
        <p>作品の検索結果が見当たりませんでした</p>
      </div>
    )
  }

  return (
    <WorkList
      key={`${tab}-${search.query}-${search.sort}-${search.order}-${search.season}`}
      initialData={workResult.data}
      tab={tab}
      search={search}
    />
  )
}

export const WorkListSkeleton = () => (
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
