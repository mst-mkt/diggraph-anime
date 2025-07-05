import { getWorksByIds } from '@/app/actions/api/get-work'
import { getCollection } from '@/app/actions/db/collection'
import { getSession } from '@/lib/auth/session'
import { isErr } from '@/lib/result'
import { redirect } from 'next/navigation'
import type { FC } from 'react'
import { BackDialog } from '../../../back-dialog'
import { WorkCard } from './work-card'

type CollectionDialogProps = {
  collectionId: string
}

export const CollectionDialog: FC<CollectionDialogProps> = async ({ collectionId }) => {
  const session = await getSession()
  if (session === null) redirect('/signin')

  const collectionResult = await getCollection(collectionId)

  if (isErr(collectionResult)) {
    return (
      <BackDialog title="コレクションの取得に失敗">
        <div className="flex items-center justify-center p-16 text-diggraph-accent">
          <span>コレクションの取得に失敗しました: {collectionResult.error}</span>
        </div>
      </BackDialog>
    )
  }

  const collection = collectionResult.value

  if (collection.items.length === 0) {
    return (
      <BackDialog title={`コレクション「${collectionResult.value.name}」`}>
        <div className="flex items-center justify-center p-16 text-diggraph-accent">
          <span>このコレクションには作品が登録されていません。</span>
        </div>
      </BackDialog>
    )
  }

  const works = await getWorksByIds(collectionResult.value.items.map((item) => item.annictId))

  return (
    <BackDialog title={`コレクション「${collectionResult.value.name}」`}>
      {collection.description !== null && collection.description !== '' && (
        <div className="rounded-lg bg-muted px-3 py-2 text-sm">{collection.description}</div>
      )}
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </BackDialog>
  )
}
