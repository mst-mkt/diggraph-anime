'use server'

import { dbClient } from '@/db/client'
import { savedGraphs } from '@/db/schema'
import type { WorkLink } from '@/hooks/useWorkGraph'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { getSession } from '@/lib/auth/session'
import type { WorkWithThumbnail } from '@/lib/images/valid-thumbnail'
import { err, ok } from '@/lib/result'
import { and, desc, eq, or } from 'drizzle-orm'

export type Graph = {
  works: Record<string, WorkWithThumbnail>
  links: WorkLink[]
  selectedWorkId: Work['id']
  expandedWorkIds: Work['id'][]
  rootWorkId: Work['id']
  thumbnail: string | null
}

export const createGraph = async (graph: Graph, title: string, publicGraph = false) => {
  const session = await getSession()

  if (session === null) {
    return err('Unauthorized')
  }

  try {
    const [savedGraph] = await dbClient
      .insert(savedGraphs)
      .values({
        graph,
        userId: session.user.id,
        title,
        public: publicGraph,
      })
      .returning()

    return ok(savedGraph)
  } catch (error) {
    console.error('Failed to save graph:', error)
    return err('Failed to save graph')
  }
}

export const getGraph = async (id: string) => {
  const session = await getSession()

  if (session === null) {
    return err('Unauthorized')
  }

  const [graph] = await dbClient
    .select()
    .from(savedGraphs)
    .where(
      and(
        eq(savedGraphs.id, id),
        or(eq(savedGraphs.userId, session.user.id), eq(savedGraphs.public, true)),
      ),
    )

  if (graph === undefined) {
    return err('Graph not found')
  }

  return ok(graph)
}

export const getGraphs = async () => {
  const session = await getSession()

  if (session === null) {
    return err('Unauthorized')
  }

  const graphs = await dbClient
    .select()
    .from(savedGraphs)
    .where(eq(savedGraphs.userId, session.user.id))
    .orderBy(desc(savedGraphs.createdAt))

  return ok(graphs)
}
