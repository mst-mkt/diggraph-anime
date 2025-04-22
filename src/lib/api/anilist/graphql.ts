import { initGraphQLTada } from 'gql.tada'
import type { introspection } from './schema.gen'

export const graphql = initGraphQLTada<{
  introspection: introspection
}>()
