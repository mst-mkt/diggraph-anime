import { type FC, Suspense } from 'react'
import { CollectionList } from './_components/collection-list-wrapper'

type CollectionPageProps = {
  params: Promise<{ collectionId: string }>
}

const CollectionPage: FC<CollectionPageProps> = async ({ params }) => {
  const { collectionId } = await params

  return (
    <Suspense>
      <CollectionList collectionId={collectionId} />
    </Suspense>
  )
}

export default CollectionPage
