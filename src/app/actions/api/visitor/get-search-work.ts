'use server'

import type { SearchOrder, SearchSort } from '@/app/(main)/select/search-params'
import { annictApiClientForVisitor } from '@/lib/api/annict-rest'
import { getValidWorkImage } from '@/lib/images/valid-thumbnail'
import { isErr } from '@/lib/result'
import { getCurrentSeason } from '@/utils/get-season'
import { match } from 'ts-pattern'

const searchWorks = async (
  search: {
    query?: string
    sort?: 'id' | 'season' | 'watchers'
    order?: 'asc' | 'desc'
    season?: string
  },
  page = 1,
) => {
  const worksResult = await annictApiClientForVisitor.getWorks({
    query: {
      filter_title: search.query || undefined,
      filter_season: search.season || undefined,
      sort_id: search.sort === 'id' ? search.order : undefined,
      sort_season: search.sort === 'season' ? search.order : undefined,
      sort_watchers_count: search.sort === 'watchers' ? search.order : undefined,
      per_page: 20,
      page,
    },
  })

  if (isErr(worksResult)) {
    console.error(`Failed to search works (query:${search.query}):`, worksResult.error)
    return null
  }

  const worksWithThumbnail = await Promise.all(
    worksResult.value.works.map(async (work) => {
      const thumbnail = await getValidWorkImage(work)
      return { ...work, thumbnail }
    }),
  )

  return { data: worksWithThumbnail, next_page: worksResult.value.next_page }
}

export const getWorksForVisitor = async (
  tab: 'search' | 'current_season',
  search: {
    query: string
    sort: SearchSort
    order: SearchOrder
    season?: string
  },
  page = 1,
) => {
  const workResult = await match(tab)
    .with('search', () => searchWorks(search, page))
    .with('current_season', () => searchWorks({ ...search, season: getCurrentSeason() }, page))
    .exhaustive()

  return workResult
}
