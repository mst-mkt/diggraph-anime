import { getWorkTrailer } from '@/app/actions/api/get-work-trailer'
import { annictToMal } from '@/lib/anime-id'
import type { FC } from 'react'
import { Trailer } from './trailer.client'

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

  return <Trailer url={trailerUrl} />
}
