import type { SearchOrder, SearchSort } from '@/app/(main)/select/search-params'
import { searchWorks } from '@/app/actions/api/works'
import type { FC } from 'react'
import WorkCard from './work-card'

type SearchWorksProps = {
  q?: string
  t?: 'no_select' | 'current_season' | 'watched'
  sort?: SearchSort
  order?: SearchOrder
  season?: string
}

export const WorkList: FC<SearchWorksProps> = async ({ q, t, sort, order, season }) => {
  const works = await searchWorks({
    q,
    t,
    sort,
    order,
    season,
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
