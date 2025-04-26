import { getWorks } from '@/app/actions/api/get-works'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { type FC, Suspense } from 'react'
import { BackDialog } from '../../../back-dialog'
import { CastList } from './cast-list'
import { EpisodeList } from './episode-list'
import { WorkInfo } from './work-info'

type WorkDialogProps = {
  workId: Work['id']
}

export const WorkDialog: FC<WorkDialogProps> = async ({ workId }) => {
  const work = await getWorks(workId)

  return (
    <BackDialog title={work === null ? '作品情報' : `「${work.title}」`}>
      {work === null ? (
        <div>No work found.</div>
      ) : (
        <div className="flex flex-col gap-y-8">
          <WorkInfo work={work} />
          <Suspense>
            <EpisodeList workId={work.id} />
          </Suspense>
          <Suspense>
            <CastList workId={work.id} />
          </Suspense>
        </div>
      )}
    </BackDialog>
  )
}
