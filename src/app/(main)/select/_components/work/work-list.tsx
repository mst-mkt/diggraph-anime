import type { SearchOrder, SearchSort } from '@/app/(main)/select/search-params'
import { getMyWorks, searchWorks } from '@/app/actions/api/get-select-works'
import { getCurrentSeason } from '@/utils/get-season'
import type { FC } from 'react'
import WorkCard from './work-card'

type SearchWorksProps = {
  q?: string
  t?: 'search' | 'current_season' | 'watched'
  sort?: SearchSort
  order?: SearchOrder
  season?: string
}

export const WorkList: FC<SearchWorksProps> = async ({ q, t, sort, order, season }) => {
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

  if (!result) {
    return <div>エラーが発生しました</div>
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
