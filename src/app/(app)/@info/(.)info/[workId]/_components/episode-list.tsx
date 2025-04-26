'use client'

import { Badge } from '@/components/ui/badge'
import type { EpisodeWithInfo } from '@/lib/api/annict-rest/schema/episodes'
import { type FC, useState } from 'react'

type EpisodeListProps = {
  episodes: EpisodeWithInfo[]
  initialVisibleCount: number
}

export const EpisodeList: FC<EpisodeListProps> = ({ episodes, initialVisibleCount }) => {
  const [expanded, setExpanded] = useState(false)
  const threshold = initialVisibleCount
  const hasMore = episodes.length > threshold

  const visibleEpisodes = expanded || !hasMore ? episodes : episodes.slice(0, threshold)

  return (
    <div>
      <h3 className="mb-2 font-bold">エピソード一覧</h3>
      {visibleEpisodes.map((episode) => (
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
            <div className="h-[1px] bg-muted" />
          </div>
        </hgroup>
      ))}
      {hasMore && (
        <button
          type="button"
          className="mt-2 cursor-pointer text-sm hover:underline"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? '表示を閉じる' : 'すべて表示'}
        </button>
      )}
    </div>
  )
}
