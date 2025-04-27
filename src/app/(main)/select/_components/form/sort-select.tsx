'use client'

import {
  ArrowDownNarrowWideIcon,
  ArrowUpNarrowWideIcon,
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  ClockArrowDownIcon,
  ClockArrowUpIcon,
  LoaderIcon,
} from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useTransition } from 'react'
import { match } from 'ts-pattern'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from '../../../../../components/ui/select'
import { searchSearchParams } from '../../search-params'

export const SortSelect = () => {
  const [isPending, startTransition] = useTransition()
  const [sort, setSort] = useQueryState('sort', {
    ...searchSearchParams.sort,
    defaultValue: 'watchers',
    startTransition,
  })
  const [order, setOrder] = useQueryState('order', {
    ...searchSearchParams.order,
    defaultValue: 'desc',
    startTransition,
  })

  const handleChange = (value: string) => {
    const [sort, order] = value.split(':')

    setSort(searchSearchParams.sort.parse(sort))
    setOrder(searchSearchParams.order.parse(order))
  }

  return (
    <Select onValueChange={(value) => handleChange(value)} value={`${sort}:${order}`}>
      <SelectTrigger className="w-full cursor-pointer gap-x-2 justify-self-start">
        <div className="flex w-full items-center gap-x-2">
          {isPending ? (
            <LoaderIcon size={16} className="animate-spin text-muted-foreground" />
          ) : (
            match([sort, order])
              .with(['id', 'asc'], () => (
                <ClockArrowUpIcon size={16} className="text-muted-foreground" />
              ))
              .with(['id', 'desc'], () => (
                <ClockArrowDownIcon size={16} className="text-muted-foreground" />
              ))
              .with(['season', 'asc'], () => (
                <CalendarArrowUpIcon size={16} className="text-muted-foreground" />
              ))
              .with(['season', 'desc'], () => (
                <CalendarArrowDownIcon size={16} className="text-muted-foreground" />
              ))
              .with(['watchers', 'asc'], () => (
                <ArrowDownNarrowWideIcon size={16} className="text-muted-foreground" />
              ))
              .with(['watchers', 'desc'], () => (
                <ArrowUpNarrowWideIcon size={16} className="text-muted-foreground" />
              ))
              .exhaustive()
          )}
          <span>
            {match([sort, order])
              .with(['id', 'asc'], () => '作成日: 古い順')
              .with(['id', 'desc'], () => '作成日: 新しい順')
              .with(['season', 'asc'], () => '放送時期: 古い順')
              .with(['season', 'desc'], () => '放送時期: 新しい順')
              .with(['watchers', 'asc'], () => '視聴者数: 少ない順')
              .with(['watchers', 'desc'], () => '視聴者数: 多い順')
              .exhaustive()}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>作成順</SelectLabel>
          <SelectItem
            value="id:asc"
            className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
          >
            <ClockArrowUpIcon size={16} className="text-muted-foreground" />
            古い順
          </SelectItem>
          <SelectItem
            value="id:desc"
            className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
          >
            <ClockArrowDownIcon size={16} className="text-muted-foreground" />
            新しい順
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>放送時期</SelectLabel>
          <SelectItem
            value="season:asc"
            className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
          >
            <CalendarArrowUpIcon size={16} className="text-muted-foreground" />
            古い順
          </SelectItem>
          <SelectItem
            value="season:desc"
            className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
          >
            <CalendarArrowDownIcon size={16} className="text-muted-foreground" />
            新しい順
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>視聴者数</SelectLabel>
          <SelectItem
            value="watchers:asc"
            className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
          >
            <ArrowDownNarrowWideIcon size={16} className="text-muted-foreground" />
            少ない順
          </SelectItem>
          <SelectItem
            value="watchers:desc"
            className="cursor-pointer pr-8 [&>span]:flex [&>span]:items-center [&>span]:gap-x-2"
          >
            <ArrowUpNarrowWideIcon size={16} className="text-muted-foreground" />
            多い順
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
