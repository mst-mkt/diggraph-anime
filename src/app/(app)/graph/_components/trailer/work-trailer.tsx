import { getWorkTrailer } from '@/app/actions/api/get-work-trailer'
import { annictToMal } from '@/lib/anime-id'
import { cn } from '@/lib/classnames'
import type { FC } from 'react'

type WorkTrailerProps = {
  currentWorkId: number
  className?: string
}

export const WorkTrailer: FC<WorkTrailerProps> = async ({ currentWorkId, className }) => {
  const malId = annictToMal(currentWorkId)
  const currentWorkTrailer = malId === undefined ? null : await getWorkTrailer(malId)

  if (!currentWorkTrailer?.embed_url) {
    return null
  }

  const trailerUrl = `${currentWorkTrailer?.embed_url}&autoplay=1&mute=1`
  return (
    <div className={cn(className)}>{trailerUrl && <iframe src={trailerUrl} title="trailer" />}</div>
  )
}
