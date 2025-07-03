'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useMobile } from '@/hooks/useMobile'
import { useWorkGraph } from '@/hooks/useWorkGraph'
import type { WorkWithThumbnail } from '@/lib/images/valid-thumbnail'
import { useQueryState } from 'nuqs'
import type { FC } from 'react'
import { graphSearchParams } from '../search-params'
import { RelatedWorks } from './anime/related-works'
import { WorkInfo } from './anime/work-info'
import { Sidebar } from './bar/sidebar'
import { WorkGraph } from './graph/graph'

type PanelProps = {
  initialWork: WorkWithThumbnail
  initialRelatedWorks: WorkWithThumbnail[]
}

export const Panels: FC<PanelProps> = ({ initialWork, initialRelatedWorks }) => {
  const isMobile = useMobile()
  const [isVisitor] = useQueryState('visitor', {
    ...graphSearchParams.visitor,
    defaultValue: false,
  })
  const { selectedWork, selectedWorkRelatedWorks, expand, save, graph } = useWorkGraph(
    initialWork,
    initialRelatedWorks,
  )

  return (
    <div className="flex h-full w-full">
      {!(isMobile || isVisitor) && <Sidebar save={save} rootTitle={initialWork.title} />}
      <ResizablePanelGroup direction={isMobile ? 'vertical' : 'horizontal'}>
        <ResizablePanel minSize={50}>
          <WorkGraph
            selectedWorkId={selectedWork.id}
            nodes={graph.nodes}
            links={graph.links}
            expand={expand}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="@container/panel">
          <div className="scrollbar-thin flex h-full min-w-0 flex-col gap-y-8 overflow-y-scroll p-4 sm:min-w-80 sm:pb-64">
            <WorkInfo work={selectedWork} isVisitor={isVisitor} />
            <RelatedWorks relatedWorks={selectedWorkRelatedWorks} expand={expand} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
