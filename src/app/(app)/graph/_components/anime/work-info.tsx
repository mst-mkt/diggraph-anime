import type { Work } from '@/lib/api/annict-rest/schema/works'
import type { FC } from 'react'

type WorkInfoProps = {
  work: Work
  relatedWork: Work[] | null
}

export const WorkInfo: FC<WorkInfoProps> = ({ work, relatedWork }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-lg">{work.title}</h2>
      {relatedWork && (
        <div>
          <h3 className="font-semibold text-md">関連作品</h3>
          <ul>
            {relatedWork.map((related) => (
              <li key={related.id}>{related.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
