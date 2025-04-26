import { P, match } from 'ts-pattern'
import type { introspection_types } from '../../lib/api/annict-graphql/schema.gen.d'
import type { Media } from '../../lib/api/annict-rest/schema/common'

export const MEDIA_TEXT = (media: Media | introspection_types['Media']['enumValues']) => {
  return match(media)
    .with(P.union('TV', 'tv'), () => 'TV')
    .with(P.union('OVA', 'ova'), () => 'OVA')
    .with(P.union('MOVIE', 'movie'), () => '映画')
    .with(P.union('WEB', 'web'), () => 'Web')
    .with(P.union('OTHER', 'other'), () => 'その他')
    .exhaustive()
}
