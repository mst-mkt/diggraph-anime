import { array, integer, maxValue, minValue, number, object, optional, pipe } from 'valibot'
import { orderPicklist, paginationInfoSchema } from '../common'
import { userSchema } from '../users'

export const getFollowersQuerySchema = object({
  filter_user_id: optional(userSchema.entries.id),
  filter_username: optional(userSchema.entries.username),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(orderPicklist),
})

export const getFollowersResponseSchema = object({
  users: array(userSchema),
  ...paginationInfoSchema.entries,
})
