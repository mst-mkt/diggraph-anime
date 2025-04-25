import { getRelatedWorks } from '@/app/actions/api/get-related-works'
import { getWorkTrailer } from '@/app/actions/api/get-work-trailer'
import { getWorks } from '@/app/actions/api/get-works'
import { redirect } from 'next/navigation'
import type { SearchParams } from 'nuqs/server'
import type { FC } from 'react'
import { Panels } from './_components/panels.client'
import { loadSearchParams } from './search-params'

interface GraphPageProps {
  searchParams: Promise<SearchParams>
}

const GraphPage: FC<GraphPageProps> = async ({ searchParams }) => {
  const { root: rootWorkId } = await loadSearchParams(searchParams)

  if (rootWorkId === null) {
    redirect('/')
  }

  const initialWork = await getWorks(rootWorkId)

  if (initialWork === null) {
    redirect('/')
  }

  const initialRelatedWorks =
    initialWork.mal_anime_id === ''
      ? []
      : await getRelatedWorks(Number.parseInt(initialWork.mal_anime_id))

  const initialWorkTrailer =
    initialWork.mal_anime_id === ''
      ? null
      : await getWorkTrailer(Number.parseInt(initialWork.mal_anime_id))

  return <Panels initialWork={initialWork} initialRelatedWorks={initialRelatedWorks} />
}

export default GraphPage
