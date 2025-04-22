import {
  array,
  integer,
  maxValue,
  minValue,
  nullable,
  number,
  object,
  optional,
  pipe,
} from 'valibot'
import { characterSchema } from '.'
import { commaSeparatedString, orderPicklist, paginationInfoSchema } from '../common'
import { seriesSchema } from '../series'

export const getCharactersQuerySchema = object({
  filter_ids: optional(commaSeparatedString(characterSchema.entries.id)),
  filter_name: optional(characterSchema.entries.name),
  page: optional(pipe(number(), integer(), minValue(1))),
  per_page: optional(pipe(number(), integer(), minValue(1), maxValue(50))),
  sort_id: optional(orderPicklist),
})

export const getCharactersResponseSchema = object({
  characters: array(
    object({
      ...characterSchema.entries,
      series: nullable(seriesSchema),
    }),
  ),
  ...paginationInfoSchema.entries,
})
