import { type InferOutput, integer, number, object, pipe, string } from 'valibot'
import { characterSchema } from '../characters'
import { personSchema } from '../people'
import { workSchema } from '../works'

export const castSchema = object({
  id: pipe(number(), integer()),
  name: string(),
  name_en: string(),
  sort_number: number(),
  work: workSchema,
  character: characterSchema,
  person: personSchema,
})

export type Cast = InferOutput<typeof castSchema>
