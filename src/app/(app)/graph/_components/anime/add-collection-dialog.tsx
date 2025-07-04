import { type Collection, addCollectionItem } from '@/app/actions/db/collection'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { WorkWithThumbnail } from '@/lib/images/valid-thumbnail'
import { isErr } from '@/lib/result'
import { BookmarkPlusIcon, CheckCircle2Icon, CloudAlertIcon, OrigamiIcon } from 'lucide-react'
import type { Dispatch, FC, SetStateAction } from 'react'
import { toast } from 'sonner'
import { CollectionThumbnail } from '../collection/thumbnail'

type AddCreationsDialogProps = {
  work: WorkWithThumbnail
  collections: Collection[] | undefined
  setCollections: Dispatch<SetStateAction<Collection[] | undefined>>
}

export const AddCreationsDialog: FC<AddCreationsDialogProps> = ({
  work,
  collections,
  setCollections,
}) => {
  const handleAddCollection = async (collectionId: string) => {
    const result = await addCollectionItem(collectionId, work.id, work.thumbnail)
    if (isErr(result)) {
      toast.error(`コレクションへの追加に失敗しました: ${result.error}`)
    } else {
      toast.success('コレクションに追加しました')

      setCollections((prev) => {
        if (prev === undefined) return undefined
        return prev.map((collection) =>
          collection.id === collectionId
            ? { ...collection, items: [...collection.items, result.value] }
            : collection,
        )
      })
    }
  }

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <DialogTrigger asChild={true}>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <BookmarkPlusIcon />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">コレクションに追加</TooltipContent>
      </Tooltip>
      <DialogContent className="scrollbar-thin max-h-[92svh] gap-y-8 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            <BookmarkPlusIcon className="text-diggraph-accent" />
            コレクションに追加
          </DialogTitle>
          <DialogDescription>作品を追加するコレクションを選択してください。</DialogDescription>
        </DialogHeader>
        {collections === undefined ? (
          <div className="flex items-center justify-center p-16 text-diggraph-accent">
            <CloudAlertIcon size={32} />
            <span>コレクションの取得に失敗しました。</span>
          </div>
        ) : collections.length === 0 ? (
          <div className="flex items-center justify-center p-16 text-diggraph-accent">
            <OrigamiIcon size={32} />
            <span>コレクションがありません。</span>
          </div>
        ) : (
          <div className="flex flex-col gap-y-4">
            {collections.map((collection) => (
              <Button
                key={collection.id}
                variant="outline"
                onClick={() => handleAddCollection(collection.id)}
                disabled={collection.items.map((item) => item.annictId).includes(work.id)}
                className="!p-2 !pr-4 h-fit cursor-pointer justify-start gap-x-4 rounded-xl disabled:opacity-100"
              >
                <CollectionThumbnail collection={collection} />
                <div className="flex grow flex-col items-start gap-y-1">
                  <p className="font-bold">{collection.name}</p>
                  <p className="text-muted-foreground text-sm">{collection.description}</p>
                </div>
                {collection.items.map((item) => item.annictId).includes(work.id) && (
                  <CheckCircle2Icon className="!h-6 !w-6 text-diggraph-accent" />
                )}
              </Button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
