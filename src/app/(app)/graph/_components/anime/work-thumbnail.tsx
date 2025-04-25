import { cn } from '@/lib/classnames'
import type { WorkWithThumbnail } from '@/lib/image'
import { ImageOffIcon } from 'lucide-react'
import type { FC } from 'react'

type WorkThumbnailProps = {
  work: WorkWithThumbnail
  className?: string
}

export const WorkThumbnail: FC<WorkThumbnailProps> = ({ work, className }) => (
  <div
    className={cn(
      'flex items-center justify-center overflow-hidden rounded-lg bg-muted',
      className,
    )}
  >
    {work.thumbnail === null ? (
      <ImageOffIcon size={36} className="text-muted-foreground" />
    ) : (
      <img
        src={work.thumbnail}
        alt={work.title}
        height={144}
        width={256}
        className="h-full w-full rounded-sm object-cover"
      />
    )}
  </div>
)
