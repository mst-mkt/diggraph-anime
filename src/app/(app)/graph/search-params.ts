import { createLoader, parseAsBoolean, parseAsInteger } from 'nuqs/server'

export const graphSearchParams = {
  root: parseAsInteger,
  current: parseAsInteger.withOptions({ shallow: false }),
  visitor: parseAsBoolean.withDefault(false),
}

export const loadSearchParams = createLoader(graphSearchParams)
