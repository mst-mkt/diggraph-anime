import {
  array,
  boolean,
  integer,
  maxValue,
  minValue,
  number,
  object,
  optional,
  pipe,
} from 'valibot'
import { reviewSchema } from '.'
import { commaSeparatedString, orderPicklist, paginationInfoSchema } from '../common'
import { userSchema } from '../users'
import { workSchema } from '../works'

export const getReviewsQuerySchema = object({
  filter_ids: optional(commaSeparatedString(reviewSchema.entries.id)),
  filter_work_id: optional(workSchema.entries.id),
  filter_has_review_body: optional(boolean()),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(orderPicklist),
  sort_likes_count: optional(orderPicklist),
})

export const getReviewsResponseSchema = object({
  reviews: array(
    object({
      ...reviewSchema.entries,
      user: userSchema,
      work: workSchema,
    }),
  ),
  ...paginationInfoSchema.entries,
})

export const createReviewsQuerySchema = object({
  work_id: workSchema.entries.id,
  body: reviewSchema.entries.body,
  rating_animation_state: optional(reviewSchema.entries.rating_animation_state),
  rating_music_state: optional(reviewSchema.entries.rating_music_state),
  rating_story_state: optional(reviewSchema.entries.rating_story_state),
  rating_character_state: optional(reviewSchema.entries.rating_character_state),
  rating_overall_state: optional(reviewSchema.entries.rating_overall_state),
  share_twitter: optional(boolean()),
  share_facebook: optional(boolean()),
})

export const createReviewsResponseSchema = object({
  ...reviewSchema.entries,
  user: userSchema,
  work: workSchema,
})

export const updateReviewsQuerySchema = object({
  body: reviewSchema.entries.body,
  rating_animation_state: optional(reviewSchema.entries.rating_animation_state),
  rating_music_state: optional(reviewSchema.entries.rating_music_state),
  rating_story_state: optional(reviewSchema.entries.rating_story_state),
  rating_character_state: optional(reviewSchema.entries.rating_character_state),
  rating_overall_state: optional(reviewSchema.entries.rating_overall_state),
  share_twitter: optional(boolean()),
  share_facebook: optional(boolean()),
})

export const updateReviewsResponseSchema = object({
  ...reviewSchema.entries,
  user: userSchema,
  work: workSchema,
})
