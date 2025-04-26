import {} from 'lucide-react'
import type { FC } from 'react'
import { WorkDialog } from './_components/work-dialog'

type TrackModalProps = {
  params: Promise<{ workId: string }>
}

const TrackModal: FC<TrackModalProps> = async ({ params }) => {
  const { workId: workIdString } = await params
  const workId = Number.parseInt(workIdString)
  if (Number.isNaN(workId)) return null

  return <WorkDialog workId={workId} />
}

export default TrackModal
