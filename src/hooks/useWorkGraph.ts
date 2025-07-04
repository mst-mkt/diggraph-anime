import { graphSearchParams } from '@/app/(app)/graph/search-params'
import { getRelatedWorks } from '@/app/actions/api/get-related-works'
import { getRelatedWorksForVisitor } from '@/app/actions/api/visitor/get-related-works'
import { type Graph, createGraph } from '@/app/actions/db/graph'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import type { WorkWithThumbnail } from '@/lib/images/valid-thumbnail'
import { useQueryState } from 'nuqs'
import { useCallback, useMemo, useState } from 'react'
import { match } from 'ts-pattern'

export type WorkNode = {
  id: string
  label: string
  image: string | null
  status: 'default' | 'selected' | 'expanded' | 'pending'
}

export type WorkLink = {
  source: string
  target: string
}

export const useWorkGraph = (
  initialData:
    | {
        work: WorkWithThumbnail
        relatedWorks: WorkWithThumbnail[]
      }
    | Graph,
) => {
  const [works, setWorks] = useState<Record<string, WorkWithThumbnail>>(
    initialData instanceof Object && 'work' in initialData
      ? {
          [initialData.work.id.toString()]: initialData.work,
          ...Object.fromEntries(initialData.relatedWorks.map((work) => [work.id.toString(), work])),
        }
      : initialData.works,
  )
  const [links, setLinks] = useState<WorkLink[]>(
    initialData instanceof Object && 'work' in initialData
      ? initialData.relatedWorks.map((work) => ({
          source: initialData.work.id.toString(),
          target: work.id.toString(),
        }))
      : initialData.links,
  )
  const [pendingWorkId, setPendingWorkId] = useState<Work['id'] | null>(null)
  const [selectedWorkId, setSelectedWorkId] = useQueryState<Work['id']>('current', {
    ...graphSearchParams.current,
    defaultValue:
      initialData instanceof Object && 'work' in initialData
        ? initialData.work.id
        : initialData.selectedWorkId,
  })
  const [expandedWorkIds, setExpandedWorkIds] = useState<Set<Work['id']>>(
    new Set(
      initialData instanceof Object && 'work' in initialData
        ? [initialData.work.id]
        : initialData.expandedWorkIds,
    ),
  )
  const [isVisitor] = useQueryState('visitor', graphSearchParams.visitor)

  const nodes = useMemo<WorkNode[]>(() => {
    return Object.entries(works).map(([_, work]) => ({
      id: work.id.toString(),
      label: work.title,
      image: work.thumbnail,
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
      if (pendingWorkId !== null) return
      if (expandedWorkIds.has(annictId)) {
        setSelectedWorkId(annictId)
        return
      }

      setPendingWorkId(annictId)
      const relatedWorks = await match(isVisitor)
        .with(true, () => getRelatedWorksForVisitor(malId))
        .with(false, () => getRelatedWorks(malId))
        .exhaustive()

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
    [expandedWorkIds, setSelectedWorkId, pendingWorkId, isVisitor],
  )

  const save = useCallback(
    async (title: string, publicGraph = false) => {
      return await createGraph(
        {
          works,
          links,
          selectedWorkId,
          expandedWorkIds: Array.from(expandedWorkIds),
          rootWorkId:
            initialData instanceof Object && 'work' in initialData
              ? initialData.work.id
              : initialData.rootWorkId,
        },
        title,
        publicGraph,
      )
    },
    [works, links, selectedWorkId, expandedWorkIds, initialData],
  )

  const selectedWork = useMemo(
    () =>
      works[selectedWorkId] ??
      (initialData instanceof Object && 'work' in initialData
        ? initialData.work
        : initialData.works[selectedWorkId]),
    [works, selectedWorkId, initialData],
  )
  const selectedWorkRelatedWorks = useMemo(() => {
    return links
      .filter((link) => link.source === selectedWork.id.toString())
      .map((link) => works[link.target])
  }, [links, selectedWork.id, works])
  const rootWork = useMemo(() => {
    return initialData instanceof Object && 'work' in initialData
      ? initialData.work
      : works[initialData.rootWorkId]
  }, [initialData, works])

  return {
    graph: { nodes, links },
    expand,
    save,
    selectedWork,
    selectedWorkRelatedWorks,
    rootWork,
  }
}
