import type { Metadata } from 'next'

export const PROJECT_ID = 'diggraph-anime'
export const PROJECT_NAME = 'Diggraph Anime'
export const PROJECT_DESCRIPTION =
  'Explore anime as a graph - search related ones, discover connections.'
export const PROJECT_AUTHOR = ['mst-mkt', 'gotsteven', 'otakota', 'rarandeyo'] as const
export const PROJECT_OWNER = 'mst-mkt'
export const PROJECT_REPOSITORY_URL = `https://github.com/${PROJECT_OWNER}/${PROJECT_ID}`
export const PROJECT_LINKS = {
  github: PROJECT_REPOSITORY_URL,
} as const

export const BASIC_METADATA = {
  title: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
} satisfies Metadata
