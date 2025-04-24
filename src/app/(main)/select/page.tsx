import type { SearchParams } from 'nuqs'
import type { FC } from 'react'
import { SearchForms } from './_components/searchForms'
import { SearchWorks } from './_components/searchWorks'
import { loadSearchParams } from './search-params'

type SelectPageProps = {
  searchParams: Promise<SearchParams>
}

const SelectPage: FC<SelectPageProps> = async ({ searchParams }) => {
  const { q } = await loadSearchParams(searchParams)
  return (
    <div>
      <SearchForms />
      <SearchWorks query={q} />
    </div>
  )
}

export default SelectPage
