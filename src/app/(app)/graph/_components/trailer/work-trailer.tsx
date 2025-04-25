import { getWorkTrailer } from '@/app/actions/api/get-work-trailer'
import { annictToMal } from '@/lib/anime-id'
import type { FC } from 'react'

type WorkTrailerProps = {
  currentWorkId: number
}

export const WorkTrailer: FC<WorkTrailerProps> = async ({ currentWorkId }) => {
  const malId = annictToMal(currentWorkId)
  if (malId === undefined) return

  const currentWorkTrailer = await getWorkTrailer(malId)

  if (!currentWorkTrailer?.embed_url) {
    return null
  }

  const trailerUrl = `${currentWorkTrailer.embed_url}&autoplay=1&mute=1`

  return (
    <div className="fixed right-4 bottom-4 z-50 aspect-video w-80 rounded bg-background p-2 shadow-lg">
      <iframe src={trailerUrl} title="trailer" />
    </div>
  )
}
