import { P, match } from 'ts-pattern'
import type { introspection_types } from '../../lib/api/annict-graphql/schema.gen.d'
import type { Status } from '../../lib/api/annict-rest/schema/common'

export const STATUS_TEXT = (status: Status | introspection_types['StatusState']['enumValues']) => {
  return match(status)
    .with(P.union('NO_STATE', 'no_select'), () => '未選択')
    .with(P.union('WANNA_WATCH', 'wanna_watch'), () => '見たい')
    .with(P.union('WATCHING', 'watching'), () => '見てる')
    .with(P.union('WATCHED', 'watched'), () => '見た')
    .with(P.union('ON_HOLD', 'on_hold'), () => '一時中断')
    .with(P.union('STOP_WATCHING', 'stop_watching'), () => '視聴中止')
    .exhaustive()
}
