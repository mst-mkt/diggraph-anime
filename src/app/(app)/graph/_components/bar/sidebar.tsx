import type { Graph } from '@/app/actions/db/graph'
import type { savedGraphs } from '@/db/schema'
import { type Result, isOk } from '@/lib/result'
import type { InferSelectModel } from 'drizzle-orm'
import { type FC, useState } from 'react'
import { SaveDialog } from './save-dialog'
import { SavedListDialog } from './saved-list-dialog'

type SidebarProps = {
  save: (
    title: string,
    publicGraph?: boolean,
  ) => Promise<Result<InferSelectModel<typeof savedGraphs>, string>>
  rootTitle: string
  savedGraphsResult: Result<InferSelectModel<typeof savedGraphs>[], string>
  onGraphChange: (graph: Graph) => void
}

export const Sidebar: FC<SidebarProps> = ({
  save,
  rootTitle,
  savedGraphsResult,
  onGraphChange,
}) => {
  const [graphs, setGraphs] = useState(isOk(savedGraphsResult) ? savedGraphsResult.value : [])

  const saveGraph = async (title: string, publicGraph?: boolean) => {
    const result = await save(title, publicGraph)
    if (isOk(result)) setGraphs((prev) => [...prev, result.value])
    return result
  }

  return (
    <div className="flex h-full w-12 flex-col items-stretch gap-y-1 border-border border-r p-1">
      <SaveDialog save={saveGraph} rootTitle={rootTitle} />
      {isOk(savedGraphsResult) && (
        <SavedListDialog savedGraphs={graphs} onGraphChange={onGraphChange} />
      )}
    </div>
  )
}
