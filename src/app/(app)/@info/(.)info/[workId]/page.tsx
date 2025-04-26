import { WorkThumbnail } from '@/app/(app)/graph/_components/anime/work-thumbnail'
import { getWorkInfo } from '@/app/actions/api/get-work-info'
import { Badge } from '@/components/ui/badge'
import { ClapperboardIcon, EyeIcon, MessageCircleHeartIcon } from 'lucide-react'
import type { FC } from 'react'
import { BackDialog } from '../../back-dialog'
import { CastList } from './_components/cast-list'
import { EpisodeList } from './_components/episode-list'

type TrackModalProps = {
  params: Promise<{ workId: string }>
}

const TrackModal: FC<TrackModalProps> = async ({ params }) => {
  const { workId } = await params
  const work = await getWorkInfo(Number.parseInt(workId))
  if (work === null) {
    return (
      <BackDialog title="詳細情報">
        <p className="text-center text-muted-foreground text-sm">情報が見つかりませんでした</p>
      </BackDialog>
    )
  }
  return (
    <BackDialog title="詳細情報">
      <div className="flex flex-col gap-y-8 px-6 py-4">
        <div className="flex flex-row items-start gap-8">
          <WorkThumbnail work={work} className="aspect-square w-40 rounded-lg border shadow-md" />
          <div className="flex flex-1 flex-col gap-y-3">
            <h2 className="line-clamp-2 font-bold text-xl">{work.title}</h2>
            <div className="flex items-center gap-x-2">
              <Badge>{work.media_text}</Badge>
              {work.season_name_text && <Badge>{work.season_name_text}</Badge>}
            </div>
            <div className="flex items-center gap-x-2 pt-2 text-sm">
              <ClapperboardIcon size={18} className="text-muted-foreground" />
              <span className="text-muted-foreground text-xs">全</span>
              <span className="font-bold">{work.episodes_count}</span>
              <span className="text-muted-foreground text-xs">エピソード</span>
            </div>
            <div className="flex gap-x-6 pt-2">
              <div className="flex items-center gap-x-1 text-sm">
                <EyeIcon size={18} className="text-muted-foreground" />
                <span className="font-bold">{work.watchers_count}</span>
                <span className="text-muted-foreground text-xs">人が視聴中</span>
              </div>
              <div className="flex items-center gap-x-1 text-sm">
                <MessageCircleHeartIcon size={18} className="text-muted-foreground" />
                <span className="font-bold">{work.reviews_count}</span>
                <span className="text-muted-foreground text-xs">件のレビュー</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-2 border-muted" />

        <EpisodeList episodes={work.episodes} initialVisibleCount={16} />
        <CastList casts={work.casts} />
      </div>
    </BackDialog>
  )
}

export default TrackModal
