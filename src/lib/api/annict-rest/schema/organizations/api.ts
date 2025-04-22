import { array, integer, maxValue, minValue, number, object, optional, pipe } from 'valibot'
import { organizationSchema } from '.'
import { commaSeparatedString, orderPicklist, paginationInfoSchema } from '../common'

export const getOrganizationsQuerySchema = object({
  filter_ids: optional(commaSeparatedString(organizationSchema.entries.id)),
  filter_name: optional(organizationSchema.entries.name),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(orderPicklist),
})

export const getOrganizationsResponseSchema = object({
  organizations: array(organizationSchema),
  ...paginationInfoSchema.entries,
})
