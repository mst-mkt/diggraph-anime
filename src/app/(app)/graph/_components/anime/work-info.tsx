import { Badge } from '@/components/ui/badge'
import type { WorkWithThumbnail } from '@/lib/image'
import { BinocularsIcon, MessageCircleHeartIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { WorkThumbnail } from './work-thumbnail'

type WorkInfoProps = {
  work: WorkWithThumbnail
}

export const WorkInfo: FC<WorkInfoProps> = ({ work }) => (
  <div className="flex flex-col gap-y-8">
    <div className="flex @md/panel:flex-row flex-col gap-8">
      <WorkThumbnail
        work={work}
        className="@md/panel:aspect-square aspect-video @md/panel:w-48 w-full shrink-0"
      />
      <div className="flex grow flex-col justify-center gap-y-1">
        <h2 className="line-clamp-2 font-bold text-lg">{work.title}</h2>
        <div className="flex items-center gap-x-1">
          <Badge>{work.media_text}</Badge>
          {work.season_name_text !== undefined && work.season_name_text !== '' && (
            <Badge>{work.season_name_text}</Badge>
          )}
        </div>
        <div className="flex items-center gap-x-4 py-4">
          <div className="flex items-center gap-x-2 text-sm">
            <BinocularsIcon size={20} className="text-muted-foreground" />
            <span>{work.watchers_count}</span>
            <span className="@lg/panel:inline hidden text-muted-foreground text-xs">
              人が視聴中
            </span>
          </div>
          <div className="flex items-center gap-x-2 text-sm">
            <MessageCircleHeartIcon size={20} className="text-muted-foreground" />
            <span>{work.reviews_count}</span>
            <span className="@lg/panel:inline hidden text-muted-foreground text-xs">
              件のレビュー
            </span>
          </div>
        </div>
      </div>
    </div>
    <Link
      href={`/info/${work.id}`}
      className="text-muted-foreground text-sm hover:text-diggraph-accent"
    >
      詳細情報
    </Link>
  </div>
)
