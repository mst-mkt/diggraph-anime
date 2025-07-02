import type { Work } from '@/lib/api/annict-rest/schema/works'
import type { VisGraphRef } from '@unovis/react'
import type { GraphInputLink } from '@unovis/ts'
import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useRef } from 'react'
import type { WorkLink, WorkNode } from './useWorkGraph'

export const useGraphControls = (links: WorkLink[], selectedWorkId: Work['id']) => {
  const graphRef = useRef<VisGraphRef<WorkNode, GraphInputLink>>(null)
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
  }, [getConnectedNodeIds, selectedWorkId])

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

  return {
    graphRef,
    handlers: {
      onFocusSelected,
      onFocusStart,
      onFitAll,
      onZoomIn,
      onZoomOut,
    },
  }
}
