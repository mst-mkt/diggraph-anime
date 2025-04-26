import { P, match } from 'ts-pattern'
import type { Action } from '../../lib/api/annict-rest/schema/common'

export const ACTIVITY_TEXT = (action: Action) => {
  return match(action)
    .with('create_status', () => 'ステータスを更新しました')
    .with(P.union('create_record', 'create_multiple_records'), () => '記録を追加しました')
    .with('create_review', () => 'レビューを追加しました')
    .exhaustive()
}
