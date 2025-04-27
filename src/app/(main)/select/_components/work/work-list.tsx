import type { SearchOrder, SearchSort } from '@/app/(main)/select/search-params'
import { searchWorks } from '@/app/actions/api/works'
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

  const works = await searchWorks({
    q,
    sort,
    order,
    season: filterSeason,
  })

  if (!works) {
    return <div>エラーが発生しました</div>
  }

  return (
    <div className="flex flex-col gap-4">
      {works.data.map((work) => (
        <div key={work.id} className="h-full w-full">
          <WorkCard work={work} />
        </div>
      ))}
    </div>
  )
}
