'use server'

import type { SearchOrder, SearchSort } from '@/app/(main)/select/search-params'
import { annictApiClient } from '@/lib/api/annict-rest'
import type { Status } from '@/lib/api/annict-rest/schema/common'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { auth } from '@/lib/auth'
import { type WorkWithThumbnail, getValidWorkImage } from '@/lib/images/valid-thumbnail'
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
  await auth()

  const worksResult = await annictApiClient.getWorks({
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
  const worksWithThumbnail = await worksResult.value.works.reduce(
    async (acc: Promise<WorkWithThumbnail[]>, work: Work) => {
      const works = await acc
      const thumbnail = await getValidWorkImage(work)
      return [...works, { ...work, thumbnail }]
    },
    Promise.resolve([]),
  )

  return { data: worksWithThumbnail, next_page: worksResult.value.next_page }
}

const getMyWorks = async (
  status: Status,
  search: {
    query?: string
    sort?: 'id' | 'season' | 'watchers'
    order?: 'asc' | 'desc'
    season?: string
  } = {},
  page = 1,
) => {
  await auth()

  const worksResult = await annictApiClient.getMyWorks({
    query: {
      filter_title: search.query || undefined,
      filter_season: search.season || undefined,
      filter_status: status,
      sort_id: search.sort === 'id' ? search.order : undefined,
      sort_season: search.sort === 'season' ? search.order : 'desc',
      sort_watchers_count: search.sort === 'watchers' ? search.order : undefined,
      per_page: 20,
      page,
    },
  })

  if (isErr(worksResult)) {
    console.error(`Failed to get my works (status:${status}):`, worksResult.error)
    return null
  }

  const myWorksWithThumbnail = await worksResult.value.works.reduce(
    async (acc: Promise<WorkWithThumbnail[]>, work: Work) => {
      const works = await acc
      const thumbnail = await getValidWorkImage(work)
      return [...works, { ...work, thumbnail }]
    },
    Promise.resolve([]),
  )

  return { data: myWorksWithThumbnail, next_page: worksResult.value.next_page }
}

export const getWorks = async (
  tab: 'search' | 'current_season' | 'watched',
  search: {
    query: string
    sort: SearchSort
    order: SearchOrder
    season?: string
  },
  page = 1,
) => {
  const workResult = await match(tab)
    .with('watched', () => getMyWorks('watched', search, page))
    .with('search', () => searchWorks(search, page))
    .with('current_season', () => searchWorks({ ...search, season: getCurrentSeason() }, page))
    .exhaustive()

  return workResult
}
