import { type InferOutput, boolean, integer, number, object, pipe, string } from 'valibot'
import { channelSchema } from '../common'
import { episodeSchema } from '../episodes'
import { workSchema } from '../works'

export const programSchema = object({
  id: pipe(number(), integer()),
  started_at: string(),
  is_rebroadcast: boolean(),
  channel: channelSchema,
  work: workSchema,
  episode: episodeSchema,
})

export type Program = InferOutput<typeof programSchema>
