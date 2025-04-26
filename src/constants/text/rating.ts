import { P, match } from 'ts-pattern'
import type { introspection_types } from '../../lib/api/annict-graphql/schema.gen.d'
import type { Rating } from '../../lib/api/annict-rest/schema/common'

export const RATING_TEXT = (rating: Rating | introspection_types['RatingState']['enumValues']) => {
  return match(rating)
    .with(P.union('BAD', 'bad'), () => '良くない')
    .with(P.union('AVERAGE', 'average'), () => '普通')
    .with(P.union('GOOD', 'good'), () => '良い')
    .with(P.union('GREAT', 'great'), () => 'とても良い')
    .exhaustive()
}

export const RATING_KIND_TEXT = (
  kind: 'overall' | 'story' | 'animation' | 'music' | 'character',
) => {
  return match(kind)
    .with('overall', () => '全体')
    .with('character', () => 'キャラクター')
    .with('story', () => 'ストーリー')
    .with('animation', () => '映像')
    .with('music', () => '音楽')
    .exhaustive()
}
