import { getSession } from '@/lib/auth/session'
import { SearchIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import type { SearchParams } from 'nuqs/server'
import { type FC, Suspense } from 'react'
import { PROJECT_NAME } from '../../../constants/project'
import { SearchInput } from './_components/form/search-input'
import { SearchTabs } from './_components/form/search-tab'
import { SeasonSelect } from './_components/form/season-select'
import { SortSelect } from './_components/form/sort-select'
import { WorkListSkeleton, WorkListWrapper } from './_components/work/work-list-wrapper'
import { loadSearchParams } from './search-params'

type SearchPageProps = {
  searchParams: Promise<SearchParams>
}

export const generateMetadata = async ({ searchParams }: SearchPageProps) => {
  const { q: query } = await loadSearchParams(searchParams)

  return {
    title: `検索 ${query === '' ? '' : `"${query}" `}| ${PROJECT_NAME}`,
    description: `アニメ作品検索結果 "${query}"`,
  }
}

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const { q: query, t: tab, sort, order, season } = await loadSearchParams(searchParams)
  const session = await getSession()

  if (session === null) redirect('/signin')

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
      <Suspense fallback={<WorkListSkeleton />}>
        <WorkListWrapper
          tab={tab}
          query={query}
          sort={sort}
          order={order}
          season={season === 'all' ? undefined : `${season.year}-${season.season}`}
        />
      </Suspense>
    </div>
  )
}

export default SearchPage
