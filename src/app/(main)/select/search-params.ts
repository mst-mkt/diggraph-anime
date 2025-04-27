import { createLoader, createParser, parseAsString, parseAsStringLiteral } from 'nuqs/server'
import { isSeason } from '../../../constants/text-season'

export const searchSearchParams = {
  q: parseAsString.withDefault('').withOptions({ shallow: false }),
  t: parseAsStringLiteral(['search', 'current_season', 'watched'])
    .withDefault('search')
    .withOptions({ shallow: false }),
  sort: parseAsStringLiteral(['id', 'season', 'watchers']).withOptions({ shallow: false }),
  order: parseAsStringLiteral(['asc', 'desc']).withDefault('desc').withOptions({ shallow: false }),
  season: createParser({
    parse: (value) => {
      if (value === 'all') return value

      const [year, season] = value.split('-')
      const yearNumber = Number.parseInt(year)

      if (Number.isNaN(yearNumber)) {
        return null
      }

      if (!isSeason(season)) {
        return null
      }

      return { year: yearNumber, season }
    },
    serialize: (value) => (value === 'all' ? value : `${value.year}-${value.season}`),
  })
    .withDefault('all')
    .withOptions({ shallow: false }),
}

export const loadSearchParams = createLoader(searchSearchParams)

export type SearchSort = NonNullable<ReturnType<typeof searchSearchParams.sort.parse>>
export type SearchOrder = typeof searchSearchParams.order.defaultValue
