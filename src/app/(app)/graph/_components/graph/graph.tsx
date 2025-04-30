import type { WorkLink, WorkNode as WorkNodeType } from '@/hooks/useWorkGraph'
import { annictToMal } from '@/lib/anime-id'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { VisGraph, VisSingleContainer } from '@unovis/react'
import { Graph, GraphLayoutType, type GraphNode } from '@unovis/ts'
import type { CSSProperties, FC } from 'react'
import {} from 'ts-pattern'
import { WorkNode } from './node'

type GraphProps = {
  selectedWorkId: Work['id']
  nodes: WorkNodeType[]
  links: WorkLink[]
  expand: (annictId: Work['id'], malId: number) => Promise<void>
}

export const WorkGraph: FC<GraphProps> = ({ selectedWorkId, nodes, links, expand }) => (
  <VisSingleContainer
    data={{
      nodes,
      links,
    }}
    className="h-full w-full overflow-hidden [&>svg]:w-full"
    style={
      {
        '--vis-graph-node-label-background': 'var(--color-muted)',
        '--vis-graph-node-label-text-color': 'var(--color-foreground)',
      } as CSSProperties
    }
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
      linkStroke={({ source }) =>
        (source as WorkNodeType).id === selectedWorkId.toString()
          ? 'var(--color-diggraph-accent-200)'
          : 'var(--color-border)'
      }
      linkCurvature={0.5}
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
