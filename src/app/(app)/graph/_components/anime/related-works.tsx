import { getRelatedWorks } from '@/app/actions/api/get-related-works'
import { Badge } from '@/components/ui/badge'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { cn } from '@/lib/classnames'
import { TvIcon } from 'lucide-react'
import { type Dispatch, type FC, type SetStateAction, useState, useTransition } from 'react'
import { WorkThumbnail } from './work-thumbnail'

type RelatedWorksProps = {
  relatedWorks: Work[]
  setSelectedWork: Dispatch<SetStateAction<Work>>
  setRelatedWorks: Dispatch<SetStateAction<Work[]>>
}

export const RelatedWorks: FC<RelatedWorksProps> = ({
  relatedWorks,
  setSelectedWork,
  setRelatedWorks,
}) => {
  const [selectedWork, setSelectedWorkState] = useState<Work | null>(null)
  const [pending, startTransition] = useTransition()
  const handleSelectWork = (work: Work) => {
    setSelectedWorkState(work)
    startTransition(async () => {
      const relatedWorks =
        work.mal_anime_id === '' ? [] : await getRelatedWorks(Number.parseInt(work.mal_anime_id))
      setSelectedWork(work)
      setRelatedWorks(relatedWorks)
      setSelectedWorkState(null)
    })
  }

  return (
    <div className="flex flex-col gap-y-4">
      <hgroup className="flex items-center gap-x-2">
        <TvIcon size={24} className="text-diggraph-accent" />
        <h3 className="font-bold text-lg">関連作品</h3>
      </hgroup>
      <div className="grid @lg/panel:grid-cols-3 grid-cols-2 gap-x-4 gap-y-8">
        {relatedWorks.map((relatedWork) => (
          <button
            type="button"
            onClick={() => handleSelectWork(relatedWork)}
            key={relatedWork.id}
            className={cn(
              'group flex h-fit cursor-pointer flex-col gap-y-2 rounded-lg text-left transition-colors',
              pending && relatedWork.id === selectedWork?.id && 'animate-pulse',
            )}
          >
            <WorkThumbnail work={relatedWork} className="aspect-video rounded-md" />
            <p className="line-clamp-2 font-bold text-xs transition-colors group-hover:text-diggraph-accent">
              {relatedWork.title}
            </p>
            <div className="flex items-center gap-x-2">
              <Badge variant="secondary">{relatedWork.media_text}</Badge>
              {relatedWork.season_name_text && (
                <Badge variant="secondary">{relatedWork.season_name_text}</Badge>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
