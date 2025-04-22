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
import { activitySchema, baseActivitySchema } from '.'
import { commaSeparatedString, orderPicklist, paginationInfoSchema } from '../common'
import { userSchema } from '../users'

export const getActivitiesQuerySchema = object({
  filter_user_id: optional(userSchema.entries.id),
  filter_username: optional(userSchema.entries.username),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(orderPicklist),
})

export const getActivitiesResponseSchema = object({
  activities: array(activitySchema),
  ...paginationInfoSchema.entries,
})

export const getFollowingActivitiesQuerySchema = object({
  filter_actions: optional(commaSeparatedString(baseActivitySchema.entries.action)),
  filter_muted: optional(boolean()),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(orderPicklist),
})

export const getFollowingActivitiesResponseSchema = object({
  activities: array(activitySchema),
  ...paginationInfoSchema.entries,
})
