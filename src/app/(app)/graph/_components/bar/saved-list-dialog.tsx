import type { Graph } from '@/app/actions/db/graph'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { savedGraphs } from '@/db/schema'
import { timeText } from '@/lib/time-text'
import type { InferSelectModel } from 'drizzle-orm'
import { FoldersIcon, ImageOffIcon, LockIcon, OrigamiIcon } from 'lucide-react'
import type { FC } from 'react'

type SavedListDialogProps = {
  savedGraphs: InferSelectModel<typeof savedGraphs>[]
  onGraphChange: (graph: Graph) => void
}

export const SavedListDialog: FC<SavedListDialogProps> = ({ savedGraphs, onGraphChange }) => {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <DialogTrigger asChild={true}>
            <Button variant="ghost" className="aspect-square h-auto cursor-pointer items-center">
              <FoldersIcon className="!h-5 !w-5 text-foreground" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="right">保存されたグラフを表示</TooltipContent>
      </Tooltip>
      <DialogContent className="scrollbar-thin max-h-[92svh] gap-y-8 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            <FoldersIcon className="text-diggraph-accent" />
            保存されたグラフ
          </DialogTitle>
        </DialogHeader>
        {savedGraphs.length === 0 ? (
          <div className="flex flex-col items-center gap-y-2 py-16">
            <OrigamiIcon size={36} className="text-diggraph-accent" />
            <span>グラフは保存されていません</span>
          </div>
        ) : (
          <div className="flex flex-col gap-y-2">
            {savedGraphs.map((graph) => (
              <button
                key={graph.id}
                type="button"
                className="-mx-2 flex items-center gap-x-4 rounded-lg p-2 transition-colors hover:bg-muted"
                onClick={() => onGraphChange(graph.graph)}
                onKeyDown={(e) => e.key === 'Enter' && onGraphChange(graph.graph)}
              >
                <div className="relative h-16 w-16">
                  {graph.graph.thumbnail !== null ? (
                    <img
                      src={graph.graph.thumbnail}
                      alt={graph.title}
                      className="block h-full w-full rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImageOffIcon className="text-muted-foreground" />
                    </div>
                  )}
                  {!graph.public && (
                    <div className="-bottom-1 -right-1 absolute flex h-6 w-6 items-center justify-center rounded-full bg-diggraph-accent-600 text-white">
                      <LockIcon size={14} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start gap-y-1">
                  <h3 className="font-bold">{graph.title}</h3>
                  <time
                    dateTime={graph.createdAt.toDateString()}
                    className="text-muted-foreground text-sm"
                  >
                    {timeText(graph.createdAt)}
                  </time>
                </div>
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
