'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { type FC, useState } from 'react'
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
        <WorkInfo work={selectedWork} relatedWorks={relatedWorks} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
