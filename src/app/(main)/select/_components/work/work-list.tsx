import type { SearchOrder, SearchSort } from '@/app/(main)/select/search-params'
import { getMyWorks, searchWorks } from '@/app/actions/api/get-select-works'
import { Skeleton } from '@/components/ui/skeleton'
import { getCurrentSeason } from '@/utils/get-season'
import { CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'
import { WorkCard } from './work-card'

type SearchWorksProps = {
  q?: string
  t?: 'search' | 'current_season' | 'watched'
  sort?: SearchSort
  order?: SearchOrder
  season?: string
}

export const WorkList: FC<SearchWorksProps> = async ({ q, t, sort, order, season }) => {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const filterSeason = t === 'current_season' ? getCurrentSeason() : season

  const fetchWorks = async () => {
    if (t === 'search' || t === 'current_season') {
      return await searchWorks({
        q,
        sort,
        order,
        season: filterSeason,
      })
    }

    if (t === 'watched') {
      return await getMyWorks('watched', {
        q,
        sort,
        order,
        season: filterSeason,
      })
    }

    return null
  }

  const result = await fetchWorks()
  if (result === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon size={40} className="text-diggraph-accent" />
        <p>作品の検索に失敗しました</p>
      </div>
    )
  }

  if (result.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <OrigamiIcon size={40} className="text-diggraph-accent" />
        <p>作品の検索結果が見当たりませんでした</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {result.data.map((work) => (
        <div key={work.id} className="h-full w-full">
          <WorkCard work={work} />
        </div>
      ))}
    </div>
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
