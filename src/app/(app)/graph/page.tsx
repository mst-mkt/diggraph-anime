import { getRelatedWorks } from '@/app/actions/api/get-related-works'
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

  const initialWorkInfo = await getWorks(rootWorkId)
  if (initialWorkInfo === null) {
    redirect('/')
  }

  const relatedWorkInfo = await getRelatedWorks(rootWorkId)

  return <Panels initialWorkInfo={initialWorkInfo} relatedWorkInfo={relatedWorkInfo} />
}

export default GraphPage
