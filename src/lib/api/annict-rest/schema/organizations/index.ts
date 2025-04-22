import { type InferOutput, integer, minValue, number, object, pipe, string } from 'valibot'

export const organizationSchema = object({
  id: pipe(number(), integer()),
  name: string(),
  name_kana: string(),
  name_en: string(),
  url: string(),
  url_en: string(),
  wikipedia_url: string(),
  wikipedia_url_en: string(),
  twitter_username: string(),
  twitter_username_en: string(),
  favorite_organizations_count: pipe(number(), integer(), minValue(0)),
  staffs_count: pipe(number(), integer(), minValue(0)),
})

export type Organization = InferOutput<typeof organizationSchema>
