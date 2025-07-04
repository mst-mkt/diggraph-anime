import type { Graph } from '@/app/actions/db/graph'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { savedGraphs } from '@/db/schema'
import { type Result, isOk } from '@/lib/result'
import type { InferSelectModel } from 'drizzle-orm'
import { Undo2Icon } from 'lucide-react'
import Link from 'next/link'
import { useQueryState } from 'nuqs'
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
    if (isOk(result)) setGraphs((prev) => [result.value, ...prev])
    return result
  }

  return (
    <div className="flex h-full w-12 flex-col items-stretch gap-y-1 border-border border-r p-1">
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <Button variant="ghost" className="aspect-square h-auto cursor-pointer items-center" asChild>
            <Link href="/select">
              <Undo2Icon className="!h-5 !w-5 text-foreground" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">作品選択に戻る</TooltipContent>
      </Tooltip>
      <Separator />
      <SaveDialog save={saveGraph} rootTitle={rootTitle} />
      {isOk(savedGraphsResult) && (
        <SavedListDialog savedGraphs={graphs} onGraphChange={onGraphChange} />
      )}
    </div>
  )
}
