import { Badge } from '@/components/ui/badge'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { cn } from '@/lib/classnames'
import type { WorkWithThumbnail } from '@/lib/images/valid-thumbnail'
import { LibraryBigIcon, SproutIcon } from 'lucide-react'
import { type FC, useState, useTransition } from 'react'
import { WorkThumbnail } from './work-thumbnail'

type RelatedWorksProps = {
  relatedWorks: WorkWithThumbnail[]
  expand: (annictId: Work['id'], malId: number) => Promise<void>
}

export const RelatedWorks: FC<RelatedWorksProps> = ({ relatedWorks, expand }) => {
  const [selectedWork, setSelectedWorkState] = useState<WorkWithThumbnail | null>(null)
  const [pending, startTransition] = useTransition()

  const handleSelectWork = (work: WorkWithThumbnail) => {
    setSelectedWorkState(work)
    startTransition(async () => {
      const malId = Number.parseInt(work.mal_anime_id)
      if (Number.isNaN(malId)) return
      await expand(work.id, malId)
      setSelectedWorkState(null)
    })
  }

  return (
    <div className="flex flex-col gap-y-4">
      <hgroup className="flex items-center gap-x-2">
        <LibraryBigIcon size={24} className="text-diggraph-accent" />
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
      {relatedWorks.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-y-2 py-16">
          <SproutIcon size={36} className="text-diggraph-accent" />
          <p className="text-muted-foreground">関連作品が見つかりませんでした</p>
        </div>
      )}
    </div>
  )
}
