import { getWorks } from '@/app/actions/api/get-works'
import {} from '@/components/ui/resizable'
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
  if (!initialWorkInfo) {
    redirect('/')
  }

  return <Panels initialWorkInfo={initialWorkInfo} />
}

export default GraphPage
