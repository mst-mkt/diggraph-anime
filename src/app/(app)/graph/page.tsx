import { getRelatedWorks } from '@/app/actions/api/get-related-works'
import { getWorks } from '@/app/actions/api/get-works'
import { redirect } from 'next/navigation'
import type { SearchParams } from 'nuqs/server'
import { type FC, Suspense } from 'react'
import { Panels } from './_components/panels.client'
import { WorkTrailer } from './_components/trailer/work-trailer'
import { loadSearchParams } from './search-params'

interface GraphPageProps {
  searchParams: Promise<SearchParams>
}

const GraphPage: FC<GraphPageProps> = async ({ searchParams }) => {
  const { root: rootWorkId, current: currentWorkId } = await loadSearchParams(searchParams)

  if (rootWorkId === null) {
    redirect('/')
  }

  if (currentWorkId === null) {
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

  return (
    <div>
      <Panels initialWork={initialWork} initialRelatedWorks={initialRelatedWorks} />
      <Suspense>
        <WorkTrailer currentWorkId={currentWorkId} />
      </Suspense>
    </div>
  )
}

export default GraphPage
