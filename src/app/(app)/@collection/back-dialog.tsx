'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ListIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { FC, ReactNode } from 'react'

type BackDialogProps = {
  children?: ReactNode
  title?: string
}

export const BackDialog: FC<BackDialogProps> = (props) => {
  const router = useRouter()

  return (
    <Dialog open={true} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="!w-[92svw] !max-w-[800px] !max-h-[90svh] @container/dialog grid-rows-[auto_1fr] gap-y-8 overflow-hidden">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-x-2">
            <ListIcon className="text-diggraph-accent" />
            <span>{props.title}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="scrollbar-thin flex h-full min-h-0 w-full flex-col gap-y-4 overflow-x-hidden overflow-y-scroll">
          {props.children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
