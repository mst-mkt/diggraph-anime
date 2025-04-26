import { WorkThumbnail } from '@/app/(app)/graph/_components/anime/work-thumbnail'
import type { WorkWithThumbnail } from '@/app/actions/api/works'

import { Badge } from '@/components/ui/badge'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
        <Card key={work.id} className="h-full transition-colors hover:bg-muted">
          <div className="flex h-full">
            <div className="relative w-28 flex-shrink-0 overflow-hidden">
              <WorkThumbnail
                work={work}
                className="aspect-16/9 h-full w-full rounded-none object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <CardHeader className="p-3 pb-0">
                <CardTitle className="line-clamp-2 text-base">{work.title}</CardTitle>
                <div className="mt-1 flex flex-wrap items-center gap-1">
                  {work.media_text && <Badge>{work.media_text}</Badge>}
                  {work.season_name_text && <Badge>{work.season_name_text}</Badge>}
                </div>
              </CardHeader>
              <CardFooter className="mt-auto p-3 pt-2">
                <div className="flex items-center gap-x-3 text-xs">
                  {work.watchers_count !== undefined && (
                    <div className="flex items-center gap-x-1 text-muted-foreground">
                      <BinocularsIcon size={14} />
                      <span>{work.watchers_count}</span>
                    </div>
                  )}
                  {work.reviews_count !== undefined && (
                    <div className="flex items-center gap-x-1 text-muted-foreground">
                      <MessageCircleHeartIcon size={14} />
                      <span>{work.reviews_count}</span>
                    </div>
                  )}
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  )
}

export default WorkCard
