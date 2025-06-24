import type { WorkWithThumbnail } from '@/lib/images/valid-thumbnail'
import { useCallback, useEffect, useRef, useState, useTransition } from 'react'

type UseInfiniteScrollProps = {
  initialData: WorkWithThumbnail[]
  initialHasMore: boolean
  fetchMoreWorks: (page: number) => Promise<{
    data: WorkWithThumbnail[]
    next_page: number | null
  } | null>
}

export const useInfiniteScroll = ({
  initialData,
  initialHasMore,
  fetchMoreWorks,
}: UseInfiniteScrollProps) => {
  const [works, setWorks] = useState<WorkWithThumbnail[]>(initialData)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState<Error | null>(null)
  const [isPending, startTransition] = useTransition()

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement | null>(null)
  const isLoadingRef = useRef(false)

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) return

    isLoadingRef.current = true
    const nextPage = currentPage + 1

    try {
      const result = await fetchMoreWorks(nextPage)
      if (result === null) {
        throw new Error('Failed to fetch works')
      }

      setWorks((prev) => [...prev, ...result.data])
      setHasMore(result.next_page !== null)
      setCurrentPage(nextPage)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      setHasMore(false)
    } finally {
      isLoadingRef.current = false
    }
  }, [currentPage, hasMore, fetchMoreWorks])

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && hasMore && !isPending) {
        startTransition(() => {
          loadMore()
        })
      }
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '200px',
      threshold: 0.1,
    })

    const currentLoadingRef = loadingRef.current
    if (currentLoadingRef && observerRef.current) {
      observerRef.current.observe(currentLoadingRef)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, isPending, loadMore])

  return {
    works,
    hasMore,
    isPending,
    error,
    loadingRef,
  }
}
