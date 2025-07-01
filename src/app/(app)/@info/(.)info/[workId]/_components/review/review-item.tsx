import { Markdown } from '@/components/shared/markdown'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { ReviewWithInfo } from '@/lib/api/annict-rest/schema/reviews'
import { timeText } from '@/lib/time-text'
import type { FC } from 'react'
import { RatingBadge } from './rating-badge'

type ReviewItemProps = {
  review: ReviewWithInfo
}

export const ReviewItem: FC<ReviewItemProps> = ({ review }) => (
  <div className="flex w-full gap-x-4">
    <Avatar className="sticky top-2 h-fit">
      <AvatarImage
        src={review.user.avatar_url}
        alt={`${review.user.name}のアバター`}
        className="aspect-square"
      />
      <AvatarFallback>{review.user.name.slice(0, 1)}</AvatarFallback>
    </Avatar>
    <div className="flex w-full min-w-0 flex-col gap-y-4">
      <div className="flex w-full items-center justify-between gap-x-2">
        <div className="flex max-w-full gap-x-2 truncate">
          <span className="shrink truncate font-bold">{review.user.name}</span>
          <span className="text-muted-foreground">@{review.user.username}</span>
        </div>
        <time
          dateTime={review.created_at}
          className="hidden shrink text-muted-foreground text-sm md:block"
        >
          {timeText(review.created_at)}
        </time>
      </div>
      <div className="flex w-full flex-col gap-y-4">
        <Markdown className="break-all">{review.body}</Markdown>
        <div className="flex flex-wrap gap-2">
          {review.rating_overall_state !== null && (
            <RatingBadge
              rating={review.rating_overall_state}
              kind="overall"
              showRating={true}
              showTitle={true}
            />
          )}
          {review.rating_animation_state !== null && (
            <RatingBadge
              rating={review.rating_animation_state}
              kind="animation"
              showRating={true}
              showTitle={true}
            />
          )}
          {review.rating_character_state !== null && (
            <RatingBadge
              rating={review.rating_character_state}
              kind="character"
              showRating={true}
              showTitle={true}
            />
          )}
          {review.rating_music_state !== null && (
            <RatingBadge
              rating={review.rating_music_state}
              kind="music"
              showRating={true}
              showTitle={true}
            />
          )}
          {review.rating_story_state !== null && (
            <RatingBadge
              rating={review.rating_story_state}
              kind="story"
              showRating={true}
              showTitle={true}
            />
          )}
        </div>
      </div>
    </div>
  </div>
)
