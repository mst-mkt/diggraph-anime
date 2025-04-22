import {
  type BaseIssue,
  type BaseSchema,
  type InferOutput,
  array,
  custom,
  nullable,
  number,
  object,
  picklist,
  pipe,
  string,
  transform,
} from 'valibot'

export const mediaPicklist = picklist(['tv', 'ova', 'movie', 'web', 'other'])
export type Media = InferOutput<typeof mediaPicklist>
export const mediaTextPicklist = picklist(['TV', 'OVA', '映画', 'Web', 'その他'])
export type MediaText = InferOutput<typeof mediaTextPicklist>

export const orderPicklist = picklist(['asc', 'desc'])
export type Order = InferOutput<typeof orderPicklist>

export const statusPicklist = picklist([
  'no_select',
  'wanna_watch',
  'watching',
  'watched',
  'on_hold',
  'stop_watching',
])
export type Status = InferOutput<typeof statusPicklist>
export const ratingPicklist = picklist(['bad', 'average', 'good', 'great'])
export type Rating = InferOutput<typeof ratingPicklist>
export const actionPicklist = picklist([
  'create_record',
  'create_review',
  'create_multiple_records',
  'create_status',
])
export type Action = InferOutput<typeof actionPicklist>

export const numericString = custom<'' | `${number}`>(
  (value) => value === '' || !Number.isNaN(Number.parseInt(`${value}`, 10)),
)

export const commaSeparatedString = <
  ItemSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
  itemSchema: ItemSchema,
) =>
  pipe(
    array(itemSchema),
    transform((value) => value.join(',')),
  )

export const paginationInfoSchema = object({
  total_count: number(),
  next_page: nullable(number()),
  prev_page: nullable(number()),
})

export const prefectureSchema = object({
  id: number(),
  name: string(),
})

export const channelSchema = object({
  id: number(),
  name: string(),
})
