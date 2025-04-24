import { annictApiClient } from '@/lib/api/annict-rest'
import type { FC } from 'react'

type SearchWorksProps = {
  query: string
}
export const SearchWorks: FC<SearchWorksProps> = async ({ query }) => {
  const works = await annictApiClient.getWorks({
    query: {
      sort_watchers_count: 'desc',
      filter_title: query || undefined,
    },
  })
  console.log(works)
  if (!works.isOk) {
    return <div>エラーが発生しました</div>
  }

  return (
    <div>
      {works.value.works.map((work) => (
        <div key={work.id}>{work.title}</div>
      ))}
    </div>
  )
}
