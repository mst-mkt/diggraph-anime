import { createLoader, parseAsString } from 'nuqs/server'

export const searchParams = {
  q: parseAsString.withDefault('').withOptions({ shallow: false }),
}

export const loadSearchParams = createLoader(searchParams)
