'use client'

import { useQueryState } from 'nuqs'
import { searchParams } from '../search-params'

export const SearchForms = () => {
  const [_searchQuery, _setSearchQuery] = useQueryState('q', {
    ...searchParams.q,
    throttleMs: 1024,
    defaultValue: '',
  })

  return (
    <div className="flex flex-col gap-4">
      検索ワード
      <input
        type="text"
        className="rounded-md border border-gray-300 p-2"
        value={_searchQuery ?? ''}
        onChange={(e) => _setSearchQuery(e.target.value)}
        placeholder="検索ワードを入力"
      />
    </div>
  )
}
