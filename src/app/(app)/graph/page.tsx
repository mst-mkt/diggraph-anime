import { getRelatedWorks } from '@/app/actions/api/get-related-works'
import { getWork } from '@/app/actions/api/get-work'
import { auth } from '@/lib/auth'
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
  const session = await auth()

  if (session === null) redirect('/signin')

  if (rootWorkId === null) {
    redirect('/')
  }

  const initialWork = await getWork(rootWorkId)

  if (initialWork === null) {
    redirect('/')
  }

  const initialRelatedWorks =
    initialWork.mal_anime_id === ''
      ? []
      : await getRelatedWorks(Number.parseInt(initialWork.mal_anime_id))

  return (
    <div className="h-full">
      <Panels initialWork={initialWork} initialRelatedWorks={initialRelatedWorks} />
      <Suspense>
        <WorkTrailer currentWorkId={currentWorkId ?? initialWork.id} />
      </Suspense>
    </div>
  )
}

export default GraphPage
