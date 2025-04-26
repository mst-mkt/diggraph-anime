import { getWorkTrailer } from '@/app/actions/api/get-work-trailer'
import { annictToMal } from '@/lib/anime-id'
import { cn } from '@/lib/classnames'
import type { FC } from 'react'

type WorkTrailerProps = {
  currentWorkId: number
}

export const WorkTrailer: FC<WorkTrailerProps> = async ({ currentWorkId }) => {
  const trailerUrl = await (async () => {
    const malId = annictToMal(currentWorkId)
    if (malId === undefined) return

    const currentWorkTrailer = await getWorkTrailer(malId)

    if (currentWorkTrailer?.embed_url === undefined || currentWorkTrailer.embed_url === null) {
      return
    }

    const url = new URL(currentWorkTrailer.embed_url)
    url.searchParams.set('autoplay', '1')
    return url.toString()
  })()

  return (
    <div
      className={cn(
        'fixed right-4 bottom-4 w-80 rounded-lg bg-background p-2 shadow-[0_0_4px] shadow-foreground/24 transition-opacity',
        trailerUrl === undefined && 'pointer-events-none opacity-0',
      )}
    >
      <iframe
        src={trailerUrl ?? 'https://www.youtube.com/embed'}
        title="trailer"
        className="rounded-md"
      />
    </div>
  )
}
