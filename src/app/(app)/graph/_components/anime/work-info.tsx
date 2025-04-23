import { Badge } from '@/components/ui/badge'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { BinocularsIcon, MessageCircleHeartIcon } from 'lucide-react'
import type { FC } from 'react'
import { WorkThumbnail } from './work-thumbnail'

type WorkInfoProps = {
  work: Work
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
    {/* {relatedWorks.length > 0 && (
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-bold">関連作品</h3>
        <ul className="flex flex-col gap-1">
          {relatedWorks.map((relatedWork) => (
            <li key={relatedWork.id} className="text-sm">
              <span className="font-medium">{relatedWork.title}</span>
              <span className="ml-2 text-muted-foreground text-xs">
                ({relatedWork.media_text}
                {relatedWork.season_name_text ? `, ${relatedWork.season_name_text}` : ''})
              </span>
            </li>
          ))}
        </ul>
      </div>
    )} */}
  </div>
)
