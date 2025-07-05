'use client'

import { cn } from '@/lib/classnames'
import { type FC, useState } from 'react'

type TrailerProps = {
  url?: string
}

export const Trailer: FC<TrailerProps> = ({ url }) => {
  const [open, setOpen] = useState(true)

  return (
    <div
      className={cn(
        'fixed right-4 bottom-4 hidden h-50 rounded-lg bg-background p-2 drop-shadow-[0_0_4px] drop-shadow-foreground/24 transition-[opacity,translate] sm:block',
        url === undefined && 'pointer-events-none opacity-0',
        !open && 'translate-x-[calc(100%+1rem)]',
      )}
    >
      <iframe
        src={url ?? 'https://www.youtube.com/embed'}
        title="trailer"
        className="aspect-video h-full rounded-md"
      />
      <button
        type="button"
        className="-left-4 absolute top-4 flex h-16 w-4 cursor-pointer flex-col items-end justify-center gap-x-1 rounded-l-md rounded-bl-md bg-background outline-0"
        onClick={() => setOpen(!open)}
      >
        <span
          className={cn(
            '-rotate-24 block h-1/4 w-[3px] origin-bottom translate-y-[1.5px] rounded-full bg-border',
            !open && '-translate-x-2.5 rotate-24',
          )}
        />
        <span
          className={cn(
            '-translate-y-[1.5px] block h-1/4 w-[3px] origin-top rotate-24 rounded-full bg-border',
            !open && '-rotate-24 -translate-x-2.5',
          )}
        />
      </button>
    </div>
  )
}
