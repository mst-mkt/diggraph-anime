import { P, match } from 'ts-pattern'
import type { introspection_types } from '../../lib/api/annict-graphql/schema.gen.d'

export const SESONS = ['spring', 'summer', 'autumn', 'winter', 'all'] as const
export type Season = (typeof SESONS)[number]
export const isSeason = (value: unknown): value is Season => SESONS.includes(value as Season)

export const SEASON_TEXT = (season: string) => {
  const [seasonYear, seasonName] = season.split('-')

  if (!isSeason(seasonName)) {
    return `${seasonYear}年`
  }

  return `${seasonYear}年${SEASON_NAME_TEXT(seasonName)}`
}

export const SEASON_NAME_TEXT = (
  season: Season | introspection_types['SeasonName']['enumValues'],
) => {
  return match(season)
    .with(P.union('SPRING', 'spring'), () => '春')
    .with(P.union('SUMMER', 'summer'), () => '夏')
    .with(P.union('AUTUMN', 'autumn'), () => '秋')
    .with(P.union('WINTER', 'winter'), () => '冬')
    .with('all', () => '全て')
    .exhaustive()
}
