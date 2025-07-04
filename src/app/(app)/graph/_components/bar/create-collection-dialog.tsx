import { type Collection, createCollection } from '@/app/actions/db/collection'
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
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { collections } from '@/db/schema'
import { isErr } from '@/lib/result'
import { CheckIcon, ListPlusIcon, Loader2Icon, PlusIcon } from 'lucide-react'
import {} from 'nuqs'
import { type Dispatch, type FC, type SetStateAction, useState, useTransition } from 'react'
import { toast } from 'sonner'

type CreateCollectionDialogProps = {
  setCollections: Dispatch<SetStateAction<Collection[] | undefined>>
}

export const CreateCollectionDialog: FC<CreateCollectionDialogProps> = ({ setCollections }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [savedData, setSavedData] = useState<typeof collections.$inferSelect>()
  const [isPending, startTransition] = useTransition()

  const handleCreateCollection = () => {
    startTransition(async () => {
      const collection = await createCollection(name, description)
      if (isErr(collection)) {
        toast.error(`コレクションの作成に失敗しました: ${collection.error}`)
      } else {
        toast.success('コレクションを作成しました')
        setSavedData(collection.value)

        const collectionWithItems = {
          ...collection.value,
          items: [],
        }
        setCollections((prev) => {
          if (prev === undefined) return [collectionWithItems]
          return [collectionWithItems, ...prev]
        })
      }
    })
  }

  const handleCloseDialog = (open: boolean) => {
    if (open) return
    setName('')
    setDescription('')
    setSavedData(undefined)
  }

  return (
    <Dialog onOpenChange={handleCloseDialog}>
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <DialogTrigger asChild={true}>
            <Button variant="ghost" className="aspect-square h-auto cursor-pointer items-center">
              <ListPlusIcon className="!h-5 !w-5 text-foreground" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="right">コレクションを作成する</TooltipContent>
      </Tooltip>
      <DialogContent className="gap-y-8">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            <ListPlusIcon className="text-diggraph-accent" />
            コレクションを作成する
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <Label className="flex flex-col items-start gap-y-2">
            名前
            <Input
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="コレクションの名前を入力"
              disabled={savedData !== undefined}
            />
          </Label>
          <Label className="flex flex-col items-start gap-y-2">
            説明
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              placeholder="コレクションの説明を入力"
              disabled={savedData !== undefined}
            />
          </Label>
        </div>
        <Button
          className="cursor-pointer"
          onClick={handleCreateCollection}
          disabled={isPending || savedData !== undefined || name.trim() === ''}
        >
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : savedData !== undefined ? (
            <CheckIcon />
          ) : (
            <PlusIcon />
          )}
          作成{savedData !== undefined && '済み'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
