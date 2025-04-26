import { Badge } from '@/components/ui/badge'
import type { WorkWithThumbnail } from '@/lib/image'
import { ClapperboardIcon, EyeIcon } from 'lucide-react'
import type { FC } from 'react'
import { WorkThumbnail } from './work-thumbnail'

type WorkInfoProps = {
  work: WorkWithThumbnail
}

export const WorkInfo: FC<WorkInfoProps> = ({ work }) => (
  <div className="flex items-center gap-8">
    <WorkThumbnail
      work={work}
      className="@xl:aspect-video aspect-square h-40 shrink-0 rounded-lg border shadow-md"
    />
    <div className="flex min-w-0 grow flex-col gap-y-4">
      <h2 className="line-clamp-2 font-bold text-xl">{work.title}</h2>
      <div className="flex items-center gap-x-2">
        <Badge>{work.media_text}</Badge>
        {work.season_name_text && <Badge>{work.season_name_text}</Badge>}
      </div>
      <div className="flex gap-x-6">
        <div className="flex items-center gap-x-2 text-sm">
          <EyeIcon size={18} className="shrink-0 text-muted-foreground" />
          <span className="font-bold">{work.watchers_count}</span>
          <span className="@2xl/dialog:inline hidden text-muted-foreground text-xs">
            人が視聴中
          </span>
        </div>
        <div className="flex items-center gap-x-2 text-sm">
          <ClapperboardIcon size={18} className="shrink-0 text-muted-foreground" />
          <span className="font-bold">{work.episodes_count}</span>
          <span className="@2xl/dialog:inline hidden text-muted-foreground text-xs">
            エピソード
          </span>
        </div>
      </div>
    </div>
  </div>
)
