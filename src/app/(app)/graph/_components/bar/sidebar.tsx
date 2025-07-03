import type { savedGraphs } from '@/db/schema'
import type { Result } from '@/lib/result'
import type { InferInsertModel } from 'drizzle-orm'
import type { FC } from 'react'
import { SaveDialog } from './save-dialog'

type SidebarProps = {
  save: (
    title: string,
    publicGraph?: boolean,
  ) => Promise<Result<InferInsertModel<typeof savedGraphs>, string>>
  rootTitle: string
}

export const Sidebar: FC<SidebarProps> = ({ save, rootTitle }) => (
  <div className="flex h-full w-16 flex-col items-stretch border-border border-r p-2">
    <SaveDialog save={save} rootTitle={rootTitle} />
  </div>
)
