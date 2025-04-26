import type { FC } from 'react'
import { BackDialog } from '../../back-dialog'

type TrackModalProps = {
  params: {
    workId: string
  }
}

const TrackModal: FC<TrackModalProps> = ({ params }) => (
  <BackDialog title="title">{`${params.workId} `.repeat(1000)}</BackDialog>
)

export default TrackModal
