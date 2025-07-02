import {} from '@/components/ui/tooltip'
import type { WorkLink, WorkNode as WorkNodeType } from '@/hooks/useWorkGraph'
import { annictToMal } from '@/lib/anime-id'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { VisGraph, type VisGraphRef, VisSingleContainer } from '@unovis/react'
import { Graph, type GraphInputLink, GraphLayoutType, type GraphNode } from '@unovis/ts'
import {} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { type CSSProperties, type FC, useCallback, useMemo, useRef } from 'react'
import { GraphControls } from './graph-controls'
import { WorkNode } from './node'

type GraphProps = {
  selectedWorkId: Work['id']
  nodes: WorkNodeType[]
  links: WorkLink[]
  expand: (annictId: Work['id'], malId: number) => Promise<void>
}

export const WorkGraph: FC<GraphProps> = ({ selectedWorkId, nodes, links, expand }) => {
  const graphRef = useRef<VisGraphRef<WorkNodeType, GraphInputLink>>(null)
  const searchParams = useSearchParams()

  const getConnectedNodeIds = useCallback(
    (nodeId: string): string[] => {
      const connectedIds = new Set<string>([nodeId])

      for (const link of links) {
        if (link.source === nodeId) {
          connectedIds.add(link.target)
        }
      }

      return Array.from(connectedIds)
    },
    [links],
  )

  const startNodeId = useMemo(() => {
    const rootId = searchParams.get('root')
    return rootId ? rootId.toString() : null
  }, [searchParams])

  const onFocusSelected = useCallback(() => {
    if (graphRef.current?.component) {
      graphRef.current.component.fitView(500, getConnectedNodeIds(selectedWorkId.toString()))
    }
  }, [selectedWorkId, getConnectedNodeIds])

  const onFocusStart = useCallback(() => {
    if (graphRef.current?.component && startNodeId) {
      graphRef.current.component.fitView(500, getConnectedNodeIds(startNodeId))
    }
  }, [startNodeId, getConnectedNodeIds])

  const onFitAll = useCallback(() => {
    if (graphRef.current?.component) {
      graphRef.current.component.fitView(500)
    }
  }, [])

  const onZoomIn = useCallback(() => {
    if (graphRef.current?.component) {
      graphRef.current.component.zoomIn()
    }
  }, [])

  const onZoomOut = useCallback(() => {
    if (graphRef.current?.component) {
      graphRef.current.component.zoomOut()
    }
  }, [])

  return (
    <div className="relative h-full w-full">
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
          ref={graphRef}
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
      <GraphControls
        onFocusSelected={onFocusSelected}
        onFocusStart={onFocusStart}
        onFitAll={onFitAll}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
      />
    </div>
  )
}
