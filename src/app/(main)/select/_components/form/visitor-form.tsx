import { LockIcon } from 'lucide-react'
import { SeasonSelect } from './season-select'
import { SortSelect } from './sort-select'

export const VisitorForm = () => (
  <div className="flex flex-col gap-y-6">
    <div className="flex h-9 w-full items-center gap-x-2 truncate rounded-md border border-input px-3 py-1 text-sm opacity-50 shadow-xs md:text-sm dark:bg-input/30">
      <LockIcon size={14} className="shrink-0" />
      <span>作品の検索や条件の指定にはログインが必要です</span>
    </div>
    <div className="flex flex-wrap gap-4 sm:flex-wrap sm:gap-4 md:flex-nowrap md:justify-start">
      <div className="w-full sm:w-auto md:w-auto">
        <SortSelect disabled={true} />
      </div>
      <div className="w-full sm:w-auto md:w-auto">
        <SeasonSelect disabled={true} />
      </div>
    </div>
  </div>
)
