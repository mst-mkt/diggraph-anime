'use client'
import { Loader2Icon, LoaderIcon, SearchIcon } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useTransition } from 'react'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { searchSearchParams } from '../../search-params'

export const SearchInput = () => {
  const [isInputPending, startInputTransition] = useTransition()
  const [isSearchPending, startSearchTransition] = useTransition()
  const [search, setSearch] = useQueryState('q', {
    ...searchSearchParams.q,
    throttleMs: 1024,
    defaultValue: '',
    startTransition: startInputTransition,
  })
  const [_, setSearchInstantly] = useQueryState('q', {
    ...searchSearchParams.q,
    history: 'push',
    startTransition: startSearchTransition,
  })

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex w-full gap-x-2">
        <div className="relative flex-1">
          <Input
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && setSearchInstantly(search)}
            placeholder="検索するキーワードを入力"
            autoFocus={true}
            className="w-full"
          />
          {isInputPending && (
            <Loader2Icon
              size={16}
              className="absolute top-0 right-3 h-full animate-spin text-muted-foreground"
            />
          )}
        </div>
        <Button
          onClick={() => setSearchInstantly(search)}
          disabled={isSearchPending || search.trim() === ''}
          className="w-fit"
        >
          {isSearchPending ? <LoaderIcon className="animate-spin" /> : <SearchIcon />}
          検索
        </Button>
      </div>
    </div>
  )
}
