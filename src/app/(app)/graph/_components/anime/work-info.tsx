import { Badge } from '@/components/ui/badge'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { BinocularsIcon, ImageOffIcon, MessageCircleHeartIcon } from 'lucide-react'
import type { FC } from 'react'

type WorkInfoProps = {
  work: Work
  relatedWorks: Work[]
}

export const WorkInfo: FC<WorkInfoProps> = ({ work, relatedWorks }) => {
  const workImage = work.images.facebook.og_image_url

  return (
    <div>
      <div className="flex min-w-48 @[33rem]/panel:flex-row flex-col items-center gap-8 p-4">
        <div className="aspect-square @[33rem]/panel:w-48 w-full shrink-0 overflow-hidden rounded-lg">
          {workImage === undefined ? (
            <ImageOffIcon size={36} className="text-muted-foreground" />
          ) : (
            <img
              src={workImage}
              alt={work.title}
              height={144}
              width={256}
              className="h-full w-full rounded-sm object-cover"
            />
          )}
        </div>
        <div className="flex grow flex-col justify-center gap-y-1">
          <h1 className="line-clamp-2 w-full font-bold text-lg md:text-xl">{work.title}</h1>
          <div className="flex items-center gap-x-1">
            <Badge>{work.media_text}</Badge>
            {work.season_name_text !== undefined && work.season_name_text !== '' && (
              <Badge>{work.season_name_text}</Badge>
            )}
          </div>
          <div className="flex items-center gap-x-2 py-3">
            <div className="contents text-sm">
              <BinocularsIcon size={20} className="text-muted-foreground" />
              <span>{work.watchers_count}</span>
              <span className="text-muted-foreground text-sm">人が視聴中</span>
            </div>
            <div className="contents text-sm">
              <MessageCircleHeartIcon size={20} className="text-muted-foreground" />
              <span>{work.reviews_count}</span>
              <span className="text-muted-foreground text-sm">件のレビュー</span>
            </div>
          </div>
        </div>
      </div>
      {relatedWorks.length > 0 && (
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
      )}
    </div>
  )
}
