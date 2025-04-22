import { array, integer, maxValue, minValue, number, object, optional, pipe, string } from 'valibot'
import { userSchema } from '.'
import { commaSeparatedString, orderPicklist, paginationInfoSchema } from '../common'

export const getUsersQuerySchema = object({
  filter_ids: optional(commaSeparatedString(userSchema.entries.id)),
  filter_usernames: optional(commaSeparatedString(userSchema.entries.username)),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(orderPicklist),
})

export const getUsersResponseSchema = object({
  users: array(userSchema),
  ...paginationInfoSchema.entries,
})

export const getMeResponseSchema = object({
  ...userSchema.entries,
  email: string(),
  notifications_count: pipe(number(), integer(), minValue(0)),
})
