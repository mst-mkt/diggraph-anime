import { type InferOutput, integer, number, object, pipe, string } from 'valibot'
import type { Organization } from '../organizations'
import type { Person } from '../people'
import type { Work } from '../works'

export const staffSchema = object({
  id: pipe(number(), integer()),
  name: string(),
  name_en: string(),
  role_text: string(),
  role_other: string(),
  role_other_en: string(),
  sort_number: number(),
})

export type Staff = InferOutput<typeof staffSchema>
export type StaffWithInfo = Staff & {
  work: Work
  person?: Person
  organization?: Organization
}
