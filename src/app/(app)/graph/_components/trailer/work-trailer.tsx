import type { components } from '@/lib/api/jikan/schema.gen'
import { cn } from '@/lib/classnames'
import type { FC } from 'react'

type WorkTrailerProps = {
  currentWorkTrailer: components['schemas']['trailer_base'] | null
  className?: string
}

export const WorkTrailer: FC<WorkTrailerProps> = ({ currentWorkTrailer, className }) => {
  const trailerUrl = `${currentWorkTrailer?.embed_url}&autoplay=1&mute=1`
  return (
    <div className={cn(className)}>{trailerUrl && <iframe src={trailerUrl} title="trailer" />}</div>
  )
}
