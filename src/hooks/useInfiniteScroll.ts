import { type RefObject, useCallback, useEffect, useRef, useState, useTransition } from 'react'

export type InfiniteScrollResponse<T> = {
  next_page: number | null
  data: T[]
} | null

type UseInfiniteScrollOptions<T> = {
  initialData: T[]
  fetchData: (page: number) => Promise<InfiniteScrollResponse<T>>
  initialPage?: number
}

type UseInfiniteScrollReturn<T> = {
  data: T[]
  currentPage: number
  nextPage: number | null
  hasMore: boolean
  error: Error | null
  isLoading: boolean
  triggerRef: RefObject<HTMLDivElement | null>
}

export const useInfiniteScroll = <T>({
  initialData,
  fetchData,
  initialPage = 1,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> => {
  const [data, setData] = useState<T[]>(initialData)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [nextPage, setNextPage] = useState<number | null>(initialPage + 1)
  const [error, setError] = useState<Error | null>(null)
  const [isPending, startTransition] = useTransition()

  const triggerRef = useRef<HTMLDivElement>(null)
  const isLoadingRef = useRef(false)

  const fetchNextPage = useCallback(async () => {
    if (isLoadingRef.current || nextPage === null) return

    isLoadingRef.current = true

    try {
      const result = await fetchData(nextPage)

      if (result === null) {
        throw new Error('Failed to fetch data')
      }

      if (result.data.length > 0) {
        setData((prev) => [...prev, ...result.data])
        setCurrentPage(nextPage)
        setNextPage(result.next_page)
        setError(null)
      } else {
        setNextPage(null)
      }
    } catch (err) {
      setNextPage(null)
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      isLoadingRef.current = false
    }
  }, [fetchData, nextPage])

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && nextPage !== null && !isPending) {
        startTransition(() => {
          fetchNextPage()
        })
      }
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '200px',
      threshold: 0.1,
    })

    const currentTrigger = triggerRef.current
    if (currentTrigger) {
      observer.observe(currentTrigger)
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger)
      }
      observer.disconnect()
    }
  }, [nextPage, isPending, fetchNextPage])

  return {
    data,
    currentPage,
    nextPage,
    hasMore: nextPage !== null,
    error,
    isLoading: isLoadingRef.current || isPending,
    triggerRef,
  }
}
