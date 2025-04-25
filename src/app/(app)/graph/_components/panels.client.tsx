'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useWorkGraph } from '@/hooks/useWorkGraph'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import type { FC } from 'react'
import { RelatedWorks } from './anime/related-works'
import { WorkInfo } from './anime/work-info'
import { WorkGraph } from './graph/graph'

type PanelProps = {
  initialWork: Work
  initialRelatedWorks: Work[]
}

export const Panels: FC<PanelProps> = ({ initialWork, initialRelatedWorks }) => {
  const { selectedWork, selectedWorkRelatedWorks, expand, graph } = useWorkGraph(
    initialWork,
    initialRelatedWorks,
  )

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={50}>
        <WorkGraph nodes={graph.nodes} links={graph.links} expand={expand} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="@container/panel">
        <div className="flex min-w-80 flex-col gap-y-8 p-4">
          <WorkInfo work={selectedWork} />
          <RelatedWorks relatedWorks={selectedWorkRelatedWorks} expand={expand} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
