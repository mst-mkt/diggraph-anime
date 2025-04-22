import { type InferOutput, integer, number, object, pipe, string } from 'valibot'

export const seriesSchema = object({
  id: pipe(number(), integer()),
  name: string(),
  name_ro: string(),
  name_en: string(),
})

export type Series = InferOutput<typeof seriesSchema>
