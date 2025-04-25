import { graphSearchParams } from '@/app/(app)/graph/search-params'
import { getRelatedWorks } from '@/app/actions/api/get-related-works'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { useQueryState } from 'nuqs'
import { useCallback, useMemo, useState } from 'react'
import { match } from 'ts-pattern'

export type WorkNode = {
  id: string
  label: string
  image: string
  status: 'default' | 'selected' | 'expanded' | 'pending'
}

export type WorkLink = {
  source: string
  target: string
}

export const useWorkGraph = (initialWork: Work, initialRelatedWorks: Work[]) => {
  const [works, setWorks] = useState<Record<string, Work>>({
    [initialWork.id.toString()]: initialWork,
    ...Object.fromEntries(initialRelatedWorks.map((work) => [work.id.toString(), work])),
  })
  const [links, setLinks] = useState<WorkLink[]>(
    initialRelatedWorks.map((work) => ({
      source: initialWork.id.toString(),
      target: work.id.toString(),
    })),
  )
  const [pendingWorkId, setPendingWorkId] = useState<Work['id'] | null>(null)
  const [selectedWorkId, setSelectedWorkId] = useQueryState<Work['id']>('current', {
    ...graphSearchParams.current,
    defaultValue: initialWork.id,
  })
  const [expandedWorkIds, setExpandedWorkIds] = useState<Set<Work['id']>>(new Set([initialWork.id]))

  const nodes = useMemo<WorkNode[]>(() => {
    return Object.entries(works).map(([_, work]) => ({
      id: work.id.toString(),
      label: work.title,
      image: work.images.facebook.og_image_url,
      status: match(work.id)
        .returnType<WorkNode['status']>()
        .with(pendingWorkId ?? 0, () => 'pending')
        .with(selectedWorkId, () => 'selected')
        .when(
          (id) => expandedWorkIds.has(id),
          () => 'expanded',
        )
        .otherwise(() => 'default'),
    }))
  }, [works, selectedWorkId, expandedWorkIds, pendingWorkId])

  const expand = useCallback(
    async (annictId: Work['id'], malId: number) => {
      if (expandedWorkIds.has(annictId)) {
        setSelectedWorkId(annictId)
        return
      }

      setPendingWorkId(annictId)
      const relatedWorks = await getRelatedWorks(malId)

      setSelectedWorkId(annictId)
      setPendingWorkId(null)
      setWorks((prev) => ({
        ...prev,
        ...Object.fromEntries(relatedWorks.map((work) => [work.id, work])),
      }))
      setLinks((prev) => [
        ...prev,
        ...relatedWorks.map((relatedWork) => ({
          source: annictId.toString(),
          target: relatedWork.id.toString(),
        })),
      ])
      setExpandedWorkIds((prev) => {
        const newSet = new Set(prev)
        newSet.add(annictId)
        return newSet
      })
    },
    [expandedWorkIds, setSelectedWorkId],
  )

  const selectedWork = useMemo(() => works[selectedWorkId], [works, selectedWorkId])
  const selectedWorkRelatedWorks = useMemo(
    () =>
      links
        .filter((link) => link.source === selectedWorkId.toString())
        .map((link) => works[link.target]),
    [links, selectedWorkId, works],
  )

  return {
    graph: { nodes, links },
    expand,
    selectedWork,
    selectedWorkRelatedWorks,
  }
}
