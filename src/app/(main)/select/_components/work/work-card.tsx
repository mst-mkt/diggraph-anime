import { WorkThumbnail } from '@/app/(app)/graph/_components/anime/work-thumbnail'
import type { WorkWithThumbnail } from '@/app/actions/api/get-select-works'

import { Badge } from '@/components/ui/badge'
import { BinocularsIcon, MessageCircleHeartIcon } from 'lucide-react'
import Link from 'next/link'

import type React from 'react'

type WorkCardProps = {
  work: WorkWithThumbnail
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  return (
    <div className="flex flex-col gap-3">
      <Link href={`/graph?root=${work.id}`}>
        <div key={work.id} className="h-full rounded-md border transition-colors hover:bg-muted">
          <div className="flex h-full flex-col sm:flex-row">
            <div className="w-full p-1.5 sm:h-full sm:w-52">
              <WorkThumbnail
                className="aspect-16/9 h-full w-full rounded-none object-cover"
                work={work}
              />
            </div>
            <div className="flex flex-1 p-3">
              <div className="flex flex-col gap-2">
                <div className="line-clamp-2 pt-2 font-semibold text-base">{work.title}</div>

                <div className="flex flex-wrap items-center gap-1">
                  {work.media_text && <Badge>{work.media_text}</Badge>}
                  {work.season_name_text && <Badge>{work.season_name_text}</Badge>}
                </div>

                <div className=" flex items-center gap-3 text-muted-foreground text-xs">
                  {work.watchers_count !== undefined && (
                    <div className="flex items-center gap-1">
                      <BinocularsIcon size={14} />
                      {work.watchers_count}
                    </div>
                  )}
                  {work.reviews_count !== undefined && (
                    <div className="flex items-center gap-1">
                      <MessageCircleHeartIcon size={14} />
                      {work.reviews_count}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default WorkCard
