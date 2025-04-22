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
import { recordSchema } from '.'
import { commaSeparatedString, orderPicklist, paginationInfoSchema } from '../common'
import { episodeSchema } from '../episodes'
import { userSchema } from '../users'
import { workSchema } from '../works'

export const getRecordsQuerySchema = object({
  filter_ids: optional(commaSeparatedString(recordSchema.entries.id)),
  filter_episode_id: optional(episodeSchema.entries.id),
  filter_has_record_comment: optional(boolean()),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_like_count: optional(orderPicklist),
})

export const getRecordsResponseSchema = object({
  records: array(
    object({
      ...recordSchema.entries,
      user: userSchema,
      work: workSchema,
      episode: episodeSchema,
    }),
  ),
  ...paginationInfoSchema.entries,
})

export const createRecordQuerySchema = object({
  episode_id: episodeSchema.entries.id,
  comment: optional(recordSchema.entries.comment),
  rating_state: optional(recordSchema.entries.rating_state),
  share_twitter: optional(boolean()),
  share_facebook: optional(boolean()),
})

export const createRecordResponseSchema = object({
  ...recordSchema.entries,
  user: userSchema,
  work: workSchema,
  episode: episodeSchema,
})

export const updateRecordQuerySchema = object({
  comment: optional(recordSchema.entries.comment),
  rating_state: optional(recordSchema.entries.rating_state),
  share_twitter: optional(boolean()),
  share_facebook: optional(boolean()),
})

export const updateRecordResponseSchema = object({
  ...recordSchema.entries,
  user: userSchema,
  work: workSchema,
  episode: episodeSchema,
})
