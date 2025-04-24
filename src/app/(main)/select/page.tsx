import { SearchForms } from './_components/searchForms'
import { SearchWorks } from './_components/searchWorks'

type SearchParamsProps = {
  searchParams: {
    q?: string
  }
}

export default function Page({ searchParams }: SearchParamsProps) {
  const q = searchParams.q ?? ''

  return (
    <div>
      <SearchForms />
      <SearchWorks query={q} />
    </div>
  )
}
