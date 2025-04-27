'use client'
import { LoaderIcon, SearchIcon } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useTransition } from 'react'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { searchSearchParams } from '../../search-params'

export const SearchInput = () => {
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useQueryState('q', {
    ...searchSearchParams.q,
    throttleMs: 1024,
    defaultValue: '',
    startTransition,
  })
  const [_, setSearchInstantly] = useQueryState('q', {
    ...searchSearchParams.q,
    history: 'push',
    startTransition,
  })

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex w-full gap-x-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          onKeyDown={(e) => e.key === 'Enter' && setSearchInstantly(search)}
          placeholder="検索するキーワードを入力"
          autoFocus={true}
          className="flex-1"
        />
        <Button
          onClick={() => setSearchInstantly(search)}
          disabled={isPending || search.trim() === ''}
          className="w-fit"
        >
          {isPending ? <LoaderIcon className="animate-spin" /> : <SearchIcon />}
          検索
        </Button>
      </div>
    </div>
  )
}
