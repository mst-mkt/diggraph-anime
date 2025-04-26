import { Badge } from '@/components/ui/badge'
import type { introspection_types } from '@/lib/api/annict-graphql/schema.gen'
import type { Rating } from '@/lib/api/annict-rest/schema/common'
import { cn } from '@/lib/classnames'
import type { ComponentProps, FC } from 'react'
import { P, match } from 'ts-pattern'

type RatingBadgeProps = {
  kind?: 'overall' | 'character' | 'story' | 'animation' | 'music'
  rating: Rating | introspection_types['RatingState']['enumValues'] | null
  showRating?: boolean
  showTitle?: boolean
} & ComponentProps<typeof Badge>

export const RatingBadge: FC<RatingBadgeProps> = ({
  kind = 'overall',
  rating,
  showRating = true,
  showTitle = false,
  ...props
}) =>
  rating === null ? null : (
    <Badge
      variant="secondary"
      {...props}
      className={cn(
        'w-fit shrink-0 grow-0 cursor-default gap-x-1 break-keep px-2 py-1',
        rating.toLowerCase() === 'great' &&
          '!border-diggraph-rating-good/12 bg-diggraph-rating-great-pale/10 text-diggraph-rating-great hover:bg-diggraph-rating-great-pale/16',
        rating.toLowerCase() === 'good' &&
          '!border-diggraph-rating-good/12 bg-diggraph-rating-good-pale/10 text-diggraph-rating-good hover:bg-diggraph-rating-good-pale/16',
        rating.toLowerCase() === 'average' &&
          '!border-diggraph-rating-average/12 bg-diggraph-rating-average-pale/10 text-diggraph-rating-average hover:bg-diggraph-rating-average-pale/16',
        rating.toLowerCase() === 'bad' &&
          '!border-diggraph-rating-bad/12 bg-diggraph-rating-bad-pale/10 text-diggraph-rating-bad hover:bg-diggraph-rating-bad-pale/16',
      )}
    >
      {showTitle && (
        <span className="font-normal opacity-75">
          {match(kind)
            .with('overall', () => '全体')
            .with('character', () => 'キャラクター')
            .with('story', () => 'ストーリー')
            .with('animation', () => '映像')
            .with('music', () => '音楽')
            .exhaustive()}
        </span>
      )}
      {showRating && (
        <span>
          {match(rating)
            .with(P.union('BAD', 'bad'), () => '良くない')
            .with(P.union('AVERAGE', 'average'), () => '普通')
            .with(P.union('GOOD', 'good'), () => '良い')
            .with(P.union('GREAT', 'great'), () => 'とても良い')
            .exhaustive()}
        </span>
      )}
    </Badge>
  )
