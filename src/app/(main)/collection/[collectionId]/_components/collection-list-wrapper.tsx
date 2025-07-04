import { getWorksByIds } from '@/app/actions/api/get-work'
import { getCollection } from '@/app/actions/db/collection'
import { getSession } from '@/lib/auth/session'
import { isErr } from '@/lib/result'
import { ListIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import type { FC } from 'react'
import { WorkCard } from './work-card'

type CollectionListProps = {
  collectionId: string
}

export const CollectionList: FC<CollectionListProps> = async ({ collectionId }) => {
  const session = await getSession()
  if (session === null) redirect('/signin')

  const collectionResult = await getCollection(collectionId)

  if (isErr(collectionResult)) {
    return (
      <div className="flex items-center justify-center p-16 text-diggraph-accent">
        <span>コレクションの取得に失敗しました: {collectionResult.error}</span>
      </div>
    )
  }

  const collection = collectionResult.value
  const works = await getWorksByIds(collectionResult.value.items.map((item) => item.annictId))

  return (
    <div className="flex flex-col gap-4">
      <h1 className="flex items-center gap-2 font-bold text-lg">
        <ListIcon className="text-diggraph-accent" size={24} />
        コレクション「{collectionResult.value.name}」
      </h1>
      {collection.description !== null && collection.description !== '' && (
        <div className="rounded-lg bg-muted px-3 py-2 text-sm">{collection.description}</div>
      )}
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  )
}
