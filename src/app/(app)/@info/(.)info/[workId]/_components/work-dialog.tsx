import { getWorks } from '@/app/actions/api/get-works'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { CloudMoonRainIcon } from 'lucide-react'
import { type FC, Suspense } from 'react'
import { BackDialog } from '../../../back-dialog'
import { CastList, CastListSkeleton } from './cast-list'
import { EpisodeList, EpisodeListSkeleton } from './episode-list'
import { WorkInfo } from './work-info'

type WorkDialogProps = {
  workId: Work['id']
}

export const WorkDialog: FC<WorkDialogProps> = async ({ workId }) => {
  const work = await getWorks(workId)

  return (
    <BackDialog title={work === null ? '作品情報' : `「${work.title}」`}>
      {work === null ? (
        <div className="flex flex-col items-center justify-center gap-y-8 p-16">
          <CloudMoonRainIcon size={36} className="text-diggraph-accent" />
          <p className="text-muted-foreground">作品情報が見つかりませんでした</p>
        </div>
      ) : (
        <div className="flex flex-col gap-y-8">
          <WorkInfo work={work} />
          <Suspense fallback={<EpisodeListSkeleton episodeCount={work.episodes_count} />}>
            <EpisodeList workId={work.id} />
          </Suspense>
          <Suspense fallback={<CastListSkeleton />}>
            <CastList workId={work.id} />
          </Suspense>
        </div>
      )}
    </BackDialog>
  )
}
