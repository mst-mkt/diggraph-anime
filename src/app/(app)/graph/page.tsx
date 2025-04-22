import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

const GraphPage = () => (
  <ResizablePanelGroup direction="horizontal" className="h-full">
    <ResizablePanel minSize={50}>graph </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel className="@container/panel">info</ResizablePanel>
  </ResizablePanelGroup>
)

export default GraphPage
