import type { WorkLink, WorkNode as WorkNodeType } from '@/hooks/useWorkGraph'
import { annictToMal } from '@/lib/anime-id'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { VisGraph, VisSingleContainer } from '@unovis/react'
import { Graph, GraphLayoutType, type GraphNode } from '@unovis/ts'
import type { FC } from 'react'
import {} from 'ts-pattern'
import { WorkNode } from './node'

type GraphProps = {
  nodes: WorkNodeType[]
  links: WorkLink[]
  expand: (annictId: Work['id'], malId: number) => Promise<void>
}

export const WorkGraph: FC<GraphProps> = ({ nodes, links, expand }) => (
  <VisSingleContainer
    data={{
      nodes,
      links,
    }}
    className="h-full w-full overflow-hidden"
  >
    <VisGraph
      layoutType={GraphLayoutType.Force}
      forceLayoutSettings={{
        forceXStrength: 0.2,
        forceYStrength: 0.2,
        charge: -7000,
      }}
      zoomScaleExtent={[0.01, 5]}
      nodeSize={64}
      nodeShape={WorkNode}
      events={{
        [Graph.selectors.node]: {
          click: async (node: GraphNode) => {
            const annictId = Number.parseInt(`${node.id}`)
            const malId = annictToMal(annictId)
            if (malId === undefined) return
            await expand(annictId, malId)
          },
        },
      }}
    />
  </VisSingleContainer>
)
