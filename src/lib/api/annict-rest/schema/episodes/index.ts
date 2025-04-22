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
import { workSchema } from '../works'

export const episodeSchema = object({
  id: pipe(number(), integer()),
  number: nullable(number()),
  number_text: string(),
  sort_number: number(),
  title: nullable(string()),
  records_count: pipe(number(), minValue(0)),
  record_comments_count: pipe(number(), minValue(0)),
})

export type Episode = InferOutput<typeof episodeSchema>

export const episodeWithInfoSchema = object({
  ...episodeSchema.entries,
  work: workSchema,
  prev_episode: nullable(episodeSchema),
  next_episode: nullable(episodeSchema),
})

export type EpisodeWithInfo = InferOutput<typeof episodeWithInfoSchema>
