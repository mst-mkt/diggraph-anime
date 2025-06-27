import { fetchWorksByTab } from '@/app/actions/api/get-search-works'
import { auth } from '@/lib/auth'
import { getCurrentSeason } from '@/utils/get-season'
import { SearchIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import type { SearchParams } from 'nuqs/server'
import { type FC, Suspense } from 'react'
import { PROJECT_NAME } from '../../../constants/project'
import { SearchInput } from './_components/form/search-input'
import { SearchTabs } from './_components/form/search-tab'
import { SeasonSelect } from './_components/form/season-select'
import { SortSelect } from './_components/form/sort-select'
import { WorkListClient, WorkListClientSkeleton } from './_components/work/work-list.client'
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

  const filterSeason =
    tab === 'current_season'
      ? getCurrentSeason()
      : season === 'all'
        ? undefined
        : `${season.year}-${season.season}`

  const result = await fetchWorksByTab(
    {
      t: tab,
      q: query,
      sort: sort ?? 'watchers',
      order,
      season: filterSeason,
    },
    1,
  )

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
        <WorkListClient
          key={`${tab}-${query || ''}-${sort || ''}-${order || ''}-${filterSeason || ''}`}
          initialData={result?.data ?? null}
          search={{
            t: tab,
            q: query,
            sort: sort ?? 'watchers',
            order,
            season: filterSeason,
          }}
        />
      </Suspense>
    </div>
  )
}

export default SearchPage
