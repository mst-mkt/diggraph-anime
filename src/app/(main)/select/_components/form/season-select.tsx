'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select'
import { CalendarDaysIcon, CalendarRangeIcon, LoaderIcon, LockIcon } from 'lucide-react'
import { useQueryStates } from 'nuqs'
import { type FC, useMemo, useTransition } from 'react'
import { match } from 'ts-pattern'
import { SEASON_NAME_TEXT, isSeason } from '../../../../../constants/text-season'
import { searchSearchParams } from '../../search-params'
import { SeasonIcon } from '../icon-season'

type SeasonSelectProps = {
  disabled?: boolean
}

export const SeasonSelect: FC<SeasonSelectProps> = ({ disabled = false }) => {
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useQueryStates(searchSearchParams, { startTransition })

  const seasonText = query.season === 'all' ? 'all' : `${query.season.year}-${query.season.season}`

  const yearRange = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const length = currentYear - 2000 + 3
    return Array.from({ length }, (_, index) => currentYear + 2 - index)
  }, [])

  if (query.t === 'current_season') return null

  const handleChange = (value: string) => {
    setQuery({ season: searchSearchParams.season.parse(value) })
  }

  return (
    <Select onValueChange={handleChange} value={seasonText} disabled={disabled}>
      <SelectTrigger
        className="w-full cursor-pointer gap-x-2 justify-self-start"
        icon={disabled ? LockIcon : undefined}
      >
        <div className="flex w-full items-center gap-x-2">
          {isPending ? (
            <LoaderIcon size={16} className="animate-spin text-muted-foreground" />
          ) : (
            match(query.season)
              .with('all', () => <CalendarDaysIcon size={16} className="text-muted-foreground" />)
              .with({ season: 'all' }, () => (
                <CalendarRangeIcon size={16} className="text-muted-foreground" />
              ))
              .otherwise(({ season }) => (
                <SeasonIcon season={season} size={16} className="text-muted-foreground" />
              ))
          )}
          <span>
            {match(query.season)
              .with('all', () => '全期間')
              .with({ season: 'all' }, ({ year }) => `${year}年`)
              .otherwise(({ year, season }) => `${year}年${SEASON_NAME_TEXT(season)}`)}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>放送時期</SelectLabel>
          <SelectItem
            value="all"
            className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
          >
            <CalendarDaysIcon size={16} className="text-muted-foreground" />
            全期間
          </SelectItem>
          {yearRange.map((year) => (
            <SelectGroup key={year}>
              <SelectLabel>{year}年</SelectLabel>
              <SelectItem
                value={`${year}-all`}
                className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
              >
                <CalendarRangeIcon size={16} className="text-muted-foreground" />
                全季節
              </SelectItem>
              {['winter', 'spring', 'summer', 'autumn'].map((season) => (
                <SelectItem
                  key={season}
                  value={`${year}-${season}`}
                  className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
                >
                  <SeasonIcon season={season} size={16} className="text-muted-foreground" />
                  {isSeason(season) ? SEASON_NAME_TEXT(season) : season}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
