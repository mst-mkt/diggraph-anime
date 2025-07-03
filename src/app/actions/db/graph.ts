'use server'

import { dbClient } from '@/db/client'
import { savedGraphs } from '@/db/schema'
import type { WorkLink } from '@/hooks/useWorkGraph'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { getSession } from '@/lib/auth/session'
import type { WorkWithThumbnail } from '@/lib/images/valid-thumbnail'
import { err, ok } from '@/lib/result'

export type Graph = {
  works: Record<string, WorkWithThumbnail>
  links: WorkLink[]
  selectedWorkId: Work['id']
  expandedWorkIds: Work['id'][]
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
