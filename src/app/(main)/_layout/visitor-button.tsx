'use client'

import { GlobeLockIcon } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { searchSearchParams } from '../select/search-params'

export const VisitorButton = () => {
  const [isVisitor] = useQueryState('visitor', {
    ...searchSearchParams.visitor,
    defaultValue: false,
  })

  if (!isVisitor) return null

  return (
    <button
      type="button"
      className="flex items-center justify-center gap-x-2 rounded-full bg-diggraph-accent-700/50 p-2 text-sm shadow-xs saturate-200 md:px-3"
    >
      <GlobeLockIcon size={20} className="text-white" />
      <span className="hidden text-white md:inline">ゲストで閲覧中</span>
    </button>
  )
}
