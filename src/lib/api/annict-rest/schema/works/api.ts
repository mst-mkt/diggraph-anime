import { array, integer, maxValue, minValue, number, object, optional, pipe } from 'valibot'
import { workSchema } from '.'
import {
  commaSeparatedString,
  orderPicklist,
  paginationInfoSchema,
  statusPicklist,
} from '../common'

export const getWorksQuerySchema = object({
  filter_ids: optional(commaSeparatedString(workSchema.entries.id)),
  filter_season: optional(workSchema.entries.season_name),
  filter_title: optional(workSchema.entries.title),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(orderPicklist),
  sort_season: optional(orderPicklist),
  sort_watchers_count: optional(orderPicklist),
})

export const getWorksResponseSchema = object({
  works: array(workSchema),
  ...paginationInfoSchema.entries,
})

export const getMyWorksQuerySchema = object({
  ...getWorksQuerySchema.entries,
  filter_status: optional(statusPicklist),
})

export const getMyWorksResponseSchema = object({
  works: array(
    object({
      ...workSchema.entries,
      status: object({
        kind: statusPicklist,
      }),
    }),
  ),
  ...paginationInfoSchema.entries,
})
