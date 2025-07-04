import { createLoader, parseAsBoolean, parseAsInteger, parseAsString } from 'nuqs/server'

export const graphSearchParams = {
  root: parseAsInteger,
  current: parseAsInteger.withOptions({ shallow: false }),
  visitor: parseAsBoolean.withDefault(false),
  id: parseAsString,
}

export const loadSearchParams = createLoader(graphSearchParams)
