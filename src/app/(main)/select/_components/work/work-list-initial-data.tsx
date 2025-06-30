import type { SearchOrder, SearchSort } from '@/app/(main)/select/search-params'
import { fetchWorksByTab } from '@/app/actions/api/get-search-works'
import type { FC } from 'react'
import { WorkListClient } from './work-list.client'

type WorkListInitialDataProps = {
  search: {
    t?: 'search' | 'current_season' | 'watched'
    q?: string
    sort?: SearchSort
    order?: SearchOrder
    season?: string
  }
}

export const WorkListInitialData: FC<WorkListInitialDataProps> = async ({ search }) => {
  const result = await fetchWorksByTab(search, 1)

  return <WorkListClient initialData={result?.data ?? null} search={search} />
}
