'use client'

import type { Collection } from '@/app/actions/db/collection'
import type { Graph } from '@/app/actions/db/graph'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import type { savedGraphs } from '@/db/schema'
import { useMobile } from '@/hooks/useMobile'
import { useWorkGraph } from '@/hooks/useWorkGraph'
import type { WorkWithThumbnail } from '@/lib/images/valid-thumbnail'
import { type Result, isOk } from '@/lib/result'
import type { InferSelectModel } from 'drizzle-orm'
import { useQueryState } from 'nuqs'
import { type FC, useState } from 'react'
import { graphSearchParams } from '../search-params'
import { RelatedWorks } from './anime/related-works'
import { WorkInfo } from './anime/work-info'
import { Sidebar } from './bar/sidebar'
import { WorkGraph } from './graph/graph'

type DefaultPanelProps = {
  work: WorkWithThumbnail
  relatedWorks: WorkWithThumbnail[]
}

type PanelProps = (DefaultPanelProps | Graph) & {
  savedGraphsResult: Result<InferSelectModel<typeof savedGraphs>[], string>
  collectionsResult: Result<Collection[], string>
}

export const Panels: FC<PanelProps> = ({
  savedGraphsResult,
  collectionsResult,
  ...initialdata
}) => {
  const [collections, setCollections] = useState<Collection[] | undefined>(
    isOk(collectionsResult) ? collectionsResult.value : undefined,
  )
  const isMobile = useMobile()
  const [isVisitor] = useQueryState('visitor', {
    ...graphSearchParams.visitor,
    defaultValue: false,
  })
  const { selectedWork, selectedWorkRelatedWorks, rootWork, expand, save, graph, setGraph, count } =
    useWorkGraph(initialdata)

  return (
    <div className="flex h-full w-full">
      {!(isMobile || isVisitor) && (
        <Sidebar
          save={save}
          rootTitle={rootWork.title}
          savedGraphsResult={savedGraphsResult}
          collections={collections}
          onGraphChange={setGraph}
        />
      )}
      <ResizablePanelGroup direction={isMobile ? 'vertical' : 'horizontal'}>
        <ResizablePanel minSize={50}>
          <WorkGraph
            selectedWorkId={selectedWork.id}
            nodes={graph.nodes}
            links={graph.links}
            expand={expand}
            count={count}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="@container/panel">
          <div className="scrollbar-thin flex h-full min-w-0 flex-col gap-y-8 overflow-y-scroll p-4 sm:min-w-80 sm:pb-64">
            <WorkInfo
              work={selectedWork}
              isVisitor={isVisitor}
              collections={collections}
              setCollections={setCollections}
            />
            <RelatedWorks relatedWorks={selectedWorkRelatedWorks} expand={expand} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
