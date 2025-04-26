import { getWorkEpisodes } from '@/app/actions/api/get-work-episodes'
import { Badge } from '@/components/ui/badge'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { LibraryBigIcon } from 'lucide-react'
import type { FC } from 'react'
import { CollapseList } from './collapse-list'

type EpisodeListProps = {
  workId: Work['id']
}

export const EpisodeList: FC<EpisodeListProps> = async ({ workId }) => {
  const episodes = await getWorkEpisodes(workId)

  if (episodes.length === 0) return null

  return (
    <>
      <h3 className="flex items-center gap-x-2 font-bold text-lg">
        <LibraryBigIcon size={24} className="text-diggraph-accent" />
        <span>エピソード</span>
      </h3>
      <CollapseList thumbnailCount={12} className="flex flex-col gap-y-2">
        {episodes.map((episode) => (
          <hgroup key={episode.id} className="flex items-start gap-x-2">
            <Badge variant="outline" className="sticky top-20 h-fit shrink-0">
              {episode.number_text}
            </Badge>
            <h3 className="w-fit shrink group-hover:underline">
              {episode.title === null ? (
                <span className="text-muted-foreground">タイトル不明</span>
              ) : (
                episode.title
              )}
            </h3>
            <div className="shrink grow self-center">
              <div className="h-px bg-muted" />
            </div>
          </hgroup>
        ))}
      </CollapseList>
    </>
  )
}
