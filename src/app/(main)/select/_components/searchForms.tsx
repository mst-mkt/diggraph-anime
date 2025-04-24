'use client'

import { Input } from '@/components/ui/input'
import { useQueryState } from 'nuqs'
import { searchParams } from '../search-params'

export const SearchForms = () => {
  const [searchQuery, setSearchQuery] = useQueryState('q', {
    ...searchParams.q,
    throttleMs: 1024,
    defaultValue: '',
  })

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="search_id">
        検索ワード
        <Input
          id="search_id"
          type="text"
          className="rounded-md border border-gray-300 p-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="検索ワードを入力"
        />
      </label>
    </div>
  )
}
