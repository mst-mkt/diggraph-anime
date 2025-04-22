import { arm } from '@kawaiioverflow/arm'

export const malToAnnict = (malId: number): number | undefined => {
  return arm.find(({ mal_id }) => mal_id === malId)?.annict_id
}

export const malToAnilist = (malId: number): number | undefined => {
  return arm.find(({ mal_id }) => mal_id === malId)?.anilist_id
}

export const annictToMal = (annictId: number): number | undefined => {
  return arm.find(({ annict_id }) => annict_id === annictId)?.mal_id
}

export const annictToAnilist = (annictId: number): number | undefined => {
  return arm.find(({ annict_id }) => annict_id === annictId)?.anilist_id
}

export const anilistToMal = (anilistId: number): number | undefined => {
  return arm.find(({ anilist_id }) => anilist_id === anilistId)?.mal_id
}

export const anilistToAnnict = (anilistId: number): number | undefined => {
  return arm.find(({ anilist_id }) => anilist_id === anilistId)?.annict_id
}
