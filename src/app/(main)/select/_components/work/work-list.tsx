import type { SearchOrder, SearchSort } from '@/app/(main)/select/search-params'
import { getSearchByTab } from '@/app/actions/api/get-search-works'
import { getCurrentSeason } from '@/utils/get-season'
import { CloudAlertIcon } from 'lucide-react'
import type { FC } from 'react'
import { WorkListClient } from './work-list.client'

type SearchWorksProps = {
  q?: string
  t?: 'search' | 'current_season' | 'watched'
  sort?: SearchSort
  order?: SearchOrder
  season?: string
}

export const WorkList: FC<SearchWorksProps> = async ({ q, t, sort, order, season }) => {
  const filterSeason = t === 'current_season' ? getCurrentSeason() : season

  const result = await getSearchByTab(
    {
      t,
      q,
      sort,
      order,
      season: filterSeason,
    },
    1,
  )

  if (result === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 py-16">
        <CloudAlertIcon size={40} className="text-diggraph-accent" />
        <p>作品の検索に失敗しました</p>
      </div>
    )
  }

  return (
    <WorkListClient
      key={`${t}-${q || ''}-${sort || ''}-${order || ''}-${filterSeason || ''}`}
      initialData={result.data}
      search={{
        t,
        q,
        sort,
        order,
        season: filterSeason,
      }}
    />
  )
}
