import { createLoader, parseAsInteger } from 'nuqs/server'

export const graphSearchParams = {
  root: parseAsInteger,
  current: parseAsInteger.withOptions({ shallow: false }),
}

export const loadSearchParams = createLoader(graphSearchParams)
