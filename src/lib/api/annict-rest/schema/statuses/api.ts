import { object } from 'valibot'
import { statusPicklist } from '../common'
import { workSchema } from '../works'

export const createStatusesQuerySchema = object({
  work_id: workSchema.entries.id,
  kind: statusPicklist,
})
