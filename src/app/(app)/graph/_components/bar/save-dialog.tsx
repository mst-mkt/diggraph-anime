import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { savedGraphs } from '@/db/schema'
import { type Result, isErr } from '@/lib/result'
import type { InferInsertModel } from 'drizzle-orm'
import { CheckIcon, Loader2Icon, SaveIcon } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { type FC, useMemo, useState, useTransition } from 'react'
import { toast } from 'sonner'

type SaveDialogProps = {
  save: (
    title: string,
    publicGraph?: boolean,
  ) => Promise<Result<InferInsertModel<typeof savedGraphs>, string>>
  rootTitle: string
}

export const SaveDialog: FC<SaveDialogProps> = ({ save, rootTitle }) => {
  const [title, setTitle] = useState(`「${rootTitle}」からのグラフ`)
  const [publicGraph, setPublicGraph] = useState(false)
  const [savedData, setSavedData] = useState<InferInsertModel<typeof savedGraphs>>()
  const [isPending, startTransition] = useTransition()
  const [_, setUrlId] = useQueryState('id', parseAsString)

  const handleSave = () => {
    startTransition(async () => {
      const result = await save(title, publicGraph)

      if (isErr(result)) {
        toast.error(`グラフの保存に失敗しました: ${result.error}`)
      } else {
        toast.success('グラフを保存しました')
        setSavedData(result.value)
        setUrlId(result.value.id ?? null)
      }
    })
  }

  const sharedUrl = useMemo(() => {
    if (savedData === undefined) return undefined
    if (!savedData.public) return undefined

    const baseUrl = window.location.origin
    const graphId = savedData.id
    return `${baseUrl}/graph?id=${graphId}`
  }, [savedData])

  const handleCopyLink = () => {
    if (sharedUrl === undefined) {
      toast.error('共有リンクが生成されていません')
      return
    }

    navigator.clipboard
      .writeText(sharedUrl)
      .then(() => {
        toast.success('リンクをコピーしました')
      })
      .catch((error: Error) => {
        console.error('Failed to copy link:', error)
        toast.error('リンクのコピーに失敗しました')
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button variant="ghost" className="aspect-square h-auto cursor-pointer items-center">
          <SaveIcon className="!h-5 !w-5 text-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-y-8">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            <SaveIcon className="text-diggraph-accent" />
            グラフを保存する
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <Label className="flex flex-col items-start gap-y-2">
            タイトル
            <Input
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              placeholder="グラフのタイトルを入力"
              disabled={isPending || savedData !== undefined}
            />
          </Label>
          <Label className="flex items-center justify-between gap-x-2">
            他のユーザーへ公開する
            <Switch
              checked={publicGraph}
              onCheckedChange={setPublicGraph}
              disabled={isPending || savedData !== undefined}
            />
          </Label>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => handleSave()}
          disabled={title.trim() === '' || isPending || savedData !== undefined}
        >
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : savedData !== undefined ? (
            <CheckIcon />
          ) : (
            <SaveIcon />
          )}
          保存{savedData !== undefined && '済み'}
        </Button>
        {sharedUrl !== undefined && (
          <div className="mt-4 flex flex-col items-start gap-y-2">
            <Label>共有リンク</Label>
            <div className="flex w-full items-center gap-x-2">
              <Input value={sharedUrl} readOnly={true} />
              <Button size="icon" onClick={handleCopyLink} className="cursor-pointer">
                <SaveIcon />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
