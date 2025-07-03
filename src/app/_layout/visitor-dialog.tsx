'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { signIn } from '@/lib/auth/client'
import {
  GlobeLockIcon,
  HeartPlusIcon,
  InfoIcon,
  LogInIcon,
  NotebookIcon,
  SaveIcon,
  SearchIcon,
} from 'lucide-react'
import { parseAsBoolean, useQueryState } from 'nuqs'

export const VisitorDialog = () => {
  const [isVisitor] = useQueryState('visitor', {
    ...parseAsBoolean,
    defaultValue: false,
  })

  if (!isVisitor) return null

  const handleSignIn = () => {
    const currentLocation = window.location
    const locationTo = new URL(currentLocation.href)
    locationTo.searchParams.delete('visitor')
    signIn.social({ provider: 'annict', callbackURL: locationTo.toString() })
  }

  return (
    <Dialog>
      <DialogTrigger className="flex cursor-pointer items-center justify-center gap-x-2 rounded-full bg-diggraph-accent-700/50 p-2 text-sm shadow-xs saturate-200 transition-colors hover:bg-diggraph-accent-700/60 md:px-3">
        <GlobeLockIcon size={20} className="text-white" />
        <span className="hidden text-white md:inline">ゲストで閲覧中</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            <GlobeLockIcon size={24} className="text-diggraph-accent" />
            ゲストで閲覧中
          </DialogTitle>
        </DialogHeader>
        <p>Annictのアカウントでログインすることで、様々な機能が使えるようになります</p>
        <ul className="flex flex-col gap-y-4 rounded-lg border-2 border-border bg-muted p-4 text-sm">
          <li className="flex items-center gap-x-2">
            <SearchIcon size={20} className="text-diggraph-accent" />
            <span>作品の検索や絞りこみ</span>
          </li>
          <li className="flex items-center gap-x-2">
            <NotebookIcon size={20} className="text-diggraph-accent" />
            <span>作品の詳細な情報やレビューの閲覧</span>
          </li>
          <li className="flex items-center gap-x-2">
            <HeartPlusIcon size={20} className="text-diggraph-accent" />
            <span>気になった作品をお気に入りに追加</span>
          </li>
          <li className="flex items-center gap-x-2">
            <SaveIcon size={20} className="text-diggraph-accent" />
            <span>作成したグラフの保存と共有</span>
          </li>
        </ul>
        <Button className="cursor-pointer" onClick={handleSignIn}>
          <LogInIcon />
          <span>Annictでログイン</span>
        </Button>
        <p className="text-muted-foreground text-xs">
          <InfoIcon size={12} className="inline" /> AnnictはDiggraph
          Animeとは別のサービスです。連携することで、AnnictのAPIを使ってアニメの作品情報などを取得できます。
        </p>
      </DialogContent>
    </Dialog>
  )
}
