import { type InferOutput, integer, number, object, pipe, string } from 'valibot'
import type { Series } from '../series'

export const characterSchema = object({
  id: pipe(number(), integer()),
  name: string(),
  name_kana: string(),
  name_en: string(),
  nickname: string(),
  nickname_en: string(),
  birthday: string(),
  birthday_en: string(),
  age: string(),
  age_en: string(),
  blood_type: string(),
  blood_type_en: string(),
  height: string(),
  height_en: string(),
  weight: string(),
  weight_en: string(),
  nationality: string(),
  nationality_en: string(),
  occupation: string(),
  occupation_en: string(),
  description: string(),
  description_en: string(),
  description_source: string(),
  description_source_en: string(),
  favorite_characters_count: pipe(number(), integer()),
})

export type Character = InferOutput<typeof characterSchema>
export type CharacterWithSeries = Character & {
  series: Series | null
}
