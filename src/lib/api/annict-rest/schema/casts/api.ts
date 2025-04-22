import { array, integer, maxValue, minValue, number, object, optional, pipe } from 'valibot'
import { castSchema } from '.'
import { commaSeparatedString, orderPicklist, paginationInfoSchema } from '../common'
import { workSchema } from '../works'

export const getCastsQuerySchema = object({
  filter_ids: optional(commaSeparatedString(castSchema.entries.id)),
  filter_work_id: optional(workSchema.entries.id),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(orderPicklist),
  sort_sort_number: optional(orderPicklist),
})

export const getCastsResponseSchema = object({
  casts: array(castSchema),
  ...paginationInfoSchema.entries,
})
