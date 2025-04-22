import { PROJECT_ID } from './project'

export const THEME_STORAGE_KEY = `${PROJECT_ID}:theme`
export const THEME = ['light', 'dark'] as const
export type Theme = (typeof THEME)[number]
