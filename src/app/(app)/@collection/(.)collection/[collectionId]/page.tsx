import type { FC } from 'react'
import { CollectionDialog } from './_components/collection-dialog'

type CollectionPageProps = {
  params: Promise<{ collectionId: string }>
}

const CollectionPage: FC<CollectionPageProps> = async ({ params }) => {
  const { collectionId } = await params

  return <CollectionDialog collectionId={collectionId} />
}

export default CollectionPage
