import type { Work } from '@/lib/api/annict-rest/schema/works'
import type { FC } from 'react'

type WorkInfoProps = {
  work: Work
}

export const WorkInfo: FC<WorkInfoProps> = ({ work }) => {
  const { title } = work
  return (
    <div className="flex flex-col gap-2 p-4">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-500 text-sm">ID: {work.id}</p>
      <p className="text-gray-500 text-sm">Media: {work.media}</p>
      <p className="text-gray-500 text-sm">Episodes: {work.episodes_count}</p>
    </div>
  )
}
