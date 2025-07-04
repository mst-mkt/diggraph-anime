'use server'

import { dbClient } from '@/db/client'
import { collectionItems, collections } from '@/db/schema'
import { getSession } from '@/lib/auth/session'
import { err, ok } from '@/lib/result'
import { desc, eq } from 'drizzle-orm'

export const createCollection = async (name: string, description: string) => {
  const session = await getSession()

  if (session === null) {
    return err('Unauthorized')
  }

  const [collection] = await dbClient
    .insert(collections)
    .values({
      name,
      description,
      userId: session.user.id,
    })
    .returning()

  return ok(collection)
}

export const getCollections = async () => {
  const session = await getSession()

  if (session === null) {
    return err('Unauthorized')
  }

  const collectionsList = await dbClient
    .select()
    .from(collections)
    .leftJoin(collectionItems, eq(collections.id, collectionItems.collectionId))
    .where(eq(collections.userId, session.user.id))
    .orderBy(desc(collections.createdAt))

  const collectionIds = Array.from(new Set(collectionsList.map(({ collection }) => collection.id)))
  const collectionsWithItems = collectionIds
    .map((id) => {
      const { collection } = collectionsList.find((item) => item.collection.id === id) || {}
      if (collection === undefined) return null

      const items = collectionsList
        .filter((item) => item.collection.id === id)
        .map((item) => item.collection_item)

      return {
        ...collection,
        items: items.filter((item) => item !== null),
      }
    })
    .filter((collection) => collection !== null)

  return ok(collectionsWithItems)
}

export type Collection = typeof collections.$inferSelect & {
  items: (typeof collectionItems.$inferSelect)[]
}

export const addCollectionItem = async (
  collectionId: string,
  annictId: number,
  thumbnail: string | null,
) => {
  const session = await getSession()

  if (session === null) {
    return err('Unauthorized')
  }

  const [item] = await dbClient
    .insert(collectionItems)
    .values({
      collectionId,
      annictId,
      thumbnail,
    })
    .returning()

  return ok(item)
}
