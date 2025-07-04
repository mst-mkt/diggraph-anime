import { getRelatedWorks } from '@/app/actions/api/get-related-works'
import { getWork } from '@/app/actions/api/get-work'
import { getRelatedWorksForVisitor } from '@/app/actions/api/visitor/get-related-works'
import { getWorkForVisitor } from '@/app/actions/api/visitor/get-work'
import { getGraph, getGraphs } from '@/app/actions/db/graph'
import { getSession } from '@/lib/auth/session'
import { isErr, ok } from '@/lib/result'
import { redirect } from 'next/navigation'
import type { SearchParams } from 'nuqs/server'
import { type FC, Suspense } from 'react'
import { P, match } from 'ts-pattern'
import { Panels } from './_components/panels.client'
import { WorkTrailer } from './_components/trailer/work-trailer'
import { loadSearchParams } from './search-params'

interface GraphPageProps {
  searchParams: Promise<SearchParams>
}

const GraphPage: FC<GraphPageProps> = async ({ searchParams }) => {
  const {
    root: rootWorkId,
    current: currentWorkId,
    visitor,
    id,
  } = await loadSearchParams(searchParams)
  const session = await getSession()

  if (session === null && !visitor) redirect('/signin')

  const savedGraphsResult = await match(visitor)
    .with(true, () => ok([]))
    .with(false, () => getGraphs())
    .exhaustive()

  if (rootWorkId === null && id === null) {
    redirect('/')
  }

  if (id !== null) {
    const graphResult = await getGraph(id)

    if (isErr(graphResult)) {
      redirect('/')
    }

    return (
      <div className="h-full">
        <Panels savedGraphsResult={savedGraphsResult} {...graphResult.value.graph} />
        <Suspense>
          <WorkTrailer currentWorkId={currentWorkId ?? 0} />
        </Suspense>
      </div>
    )
  }

  const initialWork = await match(visitor)
    .with(true, () => getWorkForVisitor(rootWorkId ?? 2277))
    .with(false, () => getWork(rootWorkId ?? 2277))
    .exhaustive()

  if (initialWork === null) {
    redirect('/')
  }

  const initialRelatedWorks = await match([initialWork.mal_anime_id, visitor])
    .with(['', P._], () => [])
    .with([P._, true], () => getRelatedWorksForVisitor(Number.parseInt(initialWork.mal_anime_id)))
    .with([P._, false], () => getRelatedWorks(Number.parseInt(initialWork.mal_anime_id)))
    .exhaustive()

  return (
    <div className="h-full">
      <Panels
        work={initialWork}
        relatedWorks={initialRelatedWorks}
        savedGraphsResult={savedGraphsResult}
      />
      <Suspense>
        <WorkTrailer currentWorkId={currentWorkId ?? initialWork.id} />
      </Suspense>
    </div>
  )
}

export default GraphPage
