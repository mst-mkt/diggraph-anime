import {
  type InferOutput,
  integer,
  minValue,
  nullable,
  number,
  object,
  pipe,
  string,
} from 'valibot'
import { ratingPicklist } from '../common'
import type { User } from '../users'
import type { Work } from '../works'

export const reviewSchema = object({
  id: pipe(number(), integer()),
  title: nullable(string()),
  body: string(),
  rating_animation_state: nullable(ratingPicklist),
  rating_music_state: nullable(ratingPicklist),
  rating_story_state: nullable(ratingPicklist),
  rating_character_state: nullable(ratingPicklist),
  rating_overall_state: nullable(ratingPicklist),
  likes_count: pipe(number(), integer(), minValue(0)),
  impressions_count: pipe(number(), integer(), minValue(0)),
  created_at: string(),
  modified_at: nullable(string()),
})

export type Review = InferOutput<typeof reviewSchema>
export type ReviewWithInfo = Review & {
  user: User
  work: Work
}
