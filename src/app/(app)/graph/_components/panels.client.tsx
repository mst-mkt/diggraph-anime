'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { type FC, useState } from 'react'
import { WorkInfo } from './anime/work-info'

type PanelProps = {
  initialWorkInfo: Work
  relatedWorkInfo: Work[] | null
}

export const Panels: FC<PanelProps> = ({ initialWorkInfo, relatedWorkInfo }) => {
  const [selectedWork] = useState(initialWorkInfo)

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={50}>graph</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="@container/panel">
        <WorkInfo work={selectedWork} relatedWork={relatedWorkInfo} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
