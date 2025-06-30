import { auth } from '@/lib/auth'
import { getCurrentSeason } from '@/utils/get-season'
import { SearchIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import type { SearchParams } from 'nuqs/server'
import { type FC, Suspense } from 'react'
import { P, match } from 'ts-pattern'
import { PROJECT_NAME } from '../../../constants/project'
import { SearchInput } from './_components/form/search-input'
import { SearchTabs } from './_components/form/search-tab'
import { SeasonSelect } from './_components/form/season-select'
import { SortSelect } from './_components/form/sort-select'
import { WorkListInitialData } from './_components/work/work-list-initial-data'
import { WorkListClientSkeleton } from './_components/work/work-list.client'
import { loadSearchParams } from './search-params'

type SearchPageProps = {
  searchParams: Promise<SearchParams>
}

export const generateMetadata = async ({ searchParams }: SearchPageProps) => {
  const { q: query } = await loadSearchParams(searchParams)

  return {
    title: `検索 ${query === null ? '' : `"${query}" `}| ${PROJECT_NAME}`,
    description: `アニメ作品検索結果 "${query}"`,
  }
}

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const { q: query, t: tab, sort, order, season } = await loadSearchParams(searchParams)
  const session = await auth()

  if (session === null) redirect('/signin')

  const filterSeason = match([tab, season])
    .with(['current_season', P._], () => getCurrentSeason())
    .with([P._, 'all'], () => undefined)
    .with([P._, P.not('all')], ([_, season]) => `${season.year}-${season.season}`)
    .exhaustive()

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-x-2 font-bold text-lg">
          <SearchIcon size={24} className="text-diggraph-accent" />
          作品を選択
        </h1>
        <SearchTabs />
      </div>
      <div className="flex flex-col gap-y-6">
        <SearchInput />
        <div className="flex flex-wrap gap-4 sm:flex-wrap sm:gap-4 md:flex-nowrap md:justify-start">
          <div className="w-full sm:w-auto md:w-auto">
            <SortSelect />
          </div>
          <div className="w-full sm:w-auto md:w-auto">
            <SeasonSelect />
          </div>
        </div>
      </div>
      <Suspense fallback={<WorkListClientSkeleton />}>
        <WorkListInitialData
          key={`${tab}-${query || ''}-${sort || ''}-${order || ''}-${filterSeason || ''}`}
          search={{
            t: tab,
            q: query,
            sort,
            order,
            season: filterSeason,
          }}
        />
      </Suspense>
    </div>
  )
}

export default SearchPage
