import {
  type InferOutput,
  integer,
  minValue,
  nullable,
  number,
  object,
  pipe,
  string,
  transform,
  union,
} from 'valibot'
import { prefectureSchema } from '../common'

export const personSchema = object({
  id: pipe(number(), integer()),
  name: string(),
  name_kana: string(),
  name_en: string(),
  nickname: string(),
  nickname_en: string(),
  gender_text: string(),
  url: string(),
  url_en: string(),
  wikipedia_url: string(),
  wikipedia_url_en: string(),
  twitter_username: string(),
  twitter_username_en: string(),
  birthday: string(),
  blood_type: string(),
  height: union([
    // basically number, blank string when null
    pipe(
      string(),
      transform(() => null),
    ),
    number(),
  ]),
  favorite_people_count: pipe(number(), integer(), minValue(0)),
  casts_count: pipe(number(), integer(), minValue(0)),
  staffs_count: pipe(number(), integer(), minValue(0)),
})

export type Person = InferOutput<typeof personSchema>

export const personWithPrefectureSchema = object({
  ...personSchema.entries,
  prefecture: nullable(prefectureSchema),
})

export type PersonWithPrefecture = InferOutput<typeof personWithPrefectureSchema>
