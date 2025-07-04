import type { Collection } from '@/app/actions/db/collection'
import { cn } from '@/lib/classnames'
import { ImageOffIcon } from 'lucide-react'
import { type FC, useMemo } from 'react'
import { match } from 'ts-pattern'

type CollectionThumbnailProps = {
  collection: Collection
  className?: string
}

export const CollectionThumbnail: FC<CollectionThumbnailProps> = ({ collection, className }) => {
  const itemsWithThumbnail = collection.items.filter((item) => item.thumbnail !== null)
  const thumbnailLayout = useMemo(() => {
    if (itemsWithThumbnail.length === 0) return 'none'
    if (itemsWithThumbnail.length === 1) return 'single'
    if (itemsWithThumbnail.length <= 3) return 'half'
    return 'grid'
  }, [itemsWithThumbnail.length])

  return match(thumbnailLayout)
    .with('none', () => (
      <div
        className={cn(
          'flex h-16 w-16 items-center justify-center rounded-md bg-muted text-muted-foreground',
          className,
        )}
      >
        <ImageOffIcon size={48} className="!w-6 !h-6" />
      </div>
    ))
    .with('single', () => (
      <div className={cn('h-16 w-16 overflow-hidden rounded-md', className)}>
        <img
          src={itemsWithThumbnail[0].thumbnail ?? ''}
          alt={`${itemsWithThumbnail[0].annictId ?? 'Thumbnail'}`}
          className="h-full w-full object-cover"
        />
      </div>
    ))
    .with('half', () => (
      <div
        className={cn('grid h-16 w-16 grid-cols-2 gap-0.5 overflow-hidden rounded-md', className)}
      >
        {itemsWithThumbnail.slice(0, 2).map((item) => (
          <div key={`${item.collectionId}-${item.annictId}`} className="h-full w-full">
            <img
              src={item.thumbnail ?? ''}
              alt={`${item.annictId ?? 'Thumbnail'}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    ))
    .with('grid', () => (
      <div
        className={cn(
          'grid h-16 w-16 grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden rounded-md',
          className,
        )}
      >
        {itemsWithThumbnail.slice(0, 4).map((item) => (
          <div key={`${item.collectionId}-${item.annictId}`} className="h-full w-full">
            <img
              src={item.thumbnail ?? ''}
              alt={`${item.annictId ?? 'Thumbnail'}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    ))
    .exhaustive()
}
