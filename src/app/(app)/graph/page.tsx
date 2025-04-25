import { getRelatedWorks } from '@/app/actions/api/get-related-works'
import { getWorkTrailer } from '@/app/actions/api/get-work-trailer'
import { getWorks } from '@/app/actions/api/get-works'
import { redirect } from 'next/navigation'
import type { SearchParams } from 'nuqs/server'
import type { FC } from 'react'
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
  const currentWork = await getWorks(currentWorkId)

  if (initialWork === null) {
    redirect('/')
  }

  if (currentWork === null) {
    console.error(`No work found for ID ${currentWorkId}`)
    redirect('/')
  }

  const initialRelatedWorks =
    initialWork.mal_anime_id === ''
      ? []
      : await getRelatedWorks(Number.parseInt(initialWork.mal_anime_id))

  const currentWorkTrailer =
    currentWork.mal_anime_id === ''
      ? null
      : await getWorkTrailer(Number.parseInt(currentWork.mal_anime_id))

  return (
    <div>
      <Panels initialWork={initialWork} initialRelatedWorks={initialRelatedWorks} />
      <WorkTrailer
        currentWorkTrailer={currentWorkTrailer}
        className="fixed right-4 bottom-4 z-50 aspect-video w-80 rounded bg-background p-2 shadow-lg"
      />
    </div>
  )
}

export default GraphPage
