import { createLoader, parseAsInteger } from 'nuqs/server'

export const graphSearchParams = {
  root: parseAsInteger,
}

export const loadSearchParams = createLoader(graphSearchParams)
