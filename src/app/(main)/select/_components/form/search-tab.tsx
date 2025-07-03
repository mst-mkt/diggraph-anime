'use client'

import { cn } from '@/lib/classnames'
import { useQueryState } from 'nuqs'
import { useTransition } from 'react'
import { searchSearchParams } from '../../search-params'

export const SearchTabs = () => {
  const [isPending, startTransition] = useTransition()
  const [tab, setTab] = useQueryState('t', {
    ...searchSearchParams.t,
    defaultValue: 'search',
    history: 'push',
    startTransition,
  })
  const [isVisitor] = useQueryState('visitor', {
    ...searchSearchParams.visitor,
    defaultValue: false,
  })

  return (
    <div className="scrollbar-thin flex w-fit max-w-full scroll-p-1 self-start overflow-x-auto rounded-lg bg-muted p-1 ring-2 ring-muted">
      <button
        type="button"
        onClick={() => setTab('search')}
        className={cn(
          'w-fit cursor-pointer break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
          tab === 'search' &&
            'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
          tab === 'search' && isPending && 'animate-pulse',
        )}
      >
        検索
      </button>
      <button
        type="button"
        onClick={() => setTab('current_season')}
        className={cn(
          'w-fit cursor-pointer break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
          tab === 'current_season' &&
            'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
          tab === 'current_season' && isPending && 'animate-pulse',
        )}
      >
        放送中
      </button>
      {!isVisitor && (
        <button
          type="button"
          onClick={() => setTab('watched')}
          className={cn(
            'w-fit cursor-pointer break-keep rounded-md px-3 py-2 font-bold text-muted-foreground text-sm transition-colors hover:text-foreground-300',
            tab === 'watched' &&
              'cursor-default bg-background text-foreground shadow-xs hover:text-foreground',
            tab === 'watched' && isPending && 'animate-pulse',
          )}
        >
          視聴済
        </button>
      )}
    </div>
  )
}
