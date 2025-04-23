'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { type FC, useState } from 'react'
import { RelatedWorks } from './anime/related-works'
import { WorkInfo } from './anime/work-info'

type PanelProps = {
  initialWork: Work
  initialRelatedWorks: Work[]
}

export const Panels: FC<PanelProps> = ({ initialWork, initialRelatedWorks }) => {
  const [selectedWork] = useState(initialWork)
  const [relatedWorks] = useState(initialRelatedWorks)

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={50}>graph</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="@container/panel">
        <div className="flex min-w-80 flex-col gap-y-8 p-4">
          <WorkInfo work={selectedWork} />
          <RelatedWorks relatedWorks={relatedWorks} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
