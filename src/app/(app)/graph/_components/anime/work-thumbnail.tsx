import type { Work } from '@/lib/api/annict-rest/schema/works'
import { cn } from '@/lib/classnames'
import { ImageOffIcon } from 'lucide-react'
import type { FC } from 'react'

type WorkThumbnailProps = {
  work: Work
  className?: string
}

export const WorkThumbnail: FC<WorkThumbnailProps> = ({ work, className }) => (
  <div
    className={cn(
      'flex items-center justify-center overflow-hidden rounded-lg bg-muted',
      className,
    )}
  >
    {work.images.facebook.og_image_url === undefined || work.images.facebook.og_image_url === '' ? (
      <ImageOffIcon size={36} className="text-muted-foreground" />
    ) : (
      <img
        src={work.images.facebook.og_image_url}
        alt={work.title}
        height={144}
        width={256}
        className="h-full w-full rounded-sm object-cover"
      />
    )}
  </div>
)
