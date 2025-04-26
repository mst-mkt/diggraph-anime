'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
      <DialogContent className="!w-[92svw] !max-w-[800px] !max-h-[90svh] @container/dialog grid-rows-[auto_1fr] overflow-hidden">
        <DialogHeader className="text-left">
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        <div className="scrollbar-thin h-full min-h-0 w-full overflow-x-hidden overflow-y-scroll p-2">
          {props.children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
