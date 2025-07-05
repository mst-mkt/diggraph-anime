import type { Collection } from '@/app/actions/db/collection'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { WorkWithThumbnail } from '@/lib/images/valid-thumbnail'
import { getSearchLink } from '@/lib/search-link'
import {
  BinocularsIcon,
  BookOpenText,
  ClapperboardIcon,
  EarthIcon,
  LockIcon,
  TvIcon,
} from 'lucide-react'
import Link from 'next/link'
import type { Dispatch, FC, SetStateAction } from 'react'
import { AddCreationsDialog } from './add-collection-dialog'
import { WorkThumbnail } from './work-thumbnail'

type WorkInfoProps = {
  work: WorkWithThumbnail
  isVisitor: boolean
  collections: Collection[] | undefined
  setCollections: Dispatch<SetStateAction<Collection[] | undefined>>
}

export const WorkInfo: FC<WorkInfoProps> = ({ work, isVisitor, collections, setCollections }) => {
  const searchLink = getSearchLink(work.title)

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex @lg/panel:flex-row flex-col gap-8">
        <WorkThumbnail
          work={work}
          className="aspect-video @lg/panel:w-32 w-full shrink-0 sm:@lg/panel:w-60"
        />
        <div className="flex min-w-0 grow flex-col justify-center gap-y-1">
          <div className="flex items-center justify-between gap-x-4">
            <h2 className="line-clamp-2 font-bold text-lg">{work.title}</h2>
            <AddCreationsDialog
              work={work}
              collections={collections}
              setCollections={setCollections}
            />
          </div>
          <div className="flex items-center gap-x-1">
            <Badge>{work.media_text}</Badge>
            {work.season_name_text !== undefined && work.season_name_text !== '' && (
              <Badge>{work.season_name_text}</Badge>
            )}
            {work.official_site_url !== '' && (
              <Link
                href={work.official_site_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-x-1.5 overflow-hidden px-3 text-diggraph-accent text-sm hover:underline"
              >
                <EarthIcon size={16} className="shrink-0" />
                <span className="truncate">{work.official_site_url}</span>
              </Link>
            )}
          </div>
          <div className="flex items-center gap-x-4 py-4">
            <div className="flex items-center gap-x-2 text-sm">
              <BinocularsIcon size={20} className="text-muted-foreground" />
              <span>{work.watchers_count}</span>
              <span className="@xl/panel:inline hidden text-muted-foreground text-xs">
                人が視聴中
              </span>
            </div>
            {work.episodes_count > 0 && (
              <div className="flex items-center gap-x-2 text-sm">
                <ClapperboardIcon size={20} className="text-muted-foreground" />
                <span className="@xl/panel:inline hidden text-muted-foreground text-xs">全</span>
                <span>{work.episodes_count}</span>
                <span className="@xl/panel:inline hidden text-muted-foreground text-xs">
                  エピソード
                </span>
              </div>
            )}
          </div>
          {isVisitor ? (
            <Button variant="secondary" size="sm" disabled={true}>
              <LockIcon />
              <span className="min-w-0 truncate">
                ログインすると、アニメの詳しい情報を閲覧できます
              </span>
            </Button>
          ) : (
            <Button asChild={true} variant="secondary" size="sm">
              <Link href={`/info/${work.id}`}>
                <BookOpenText />
                <span>詳しく情報を見る</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-2">
          <Button asChild={true} variant="outline">
            <Link href={searchLink.dAnimeStore} target="_blank" rel="noopener noreferrer">
              <TvIcon className="text-diggraph-accent" />
              <span>dアニメストア</span>
            </Link>
          </Button>
          <Button asChild={true} variant="outline">
            <Link href={searchLink.primeVideo} target="_blank" rel="noopener noreferrer">
              <TvIcon className="text-diggraph-accent" />
              <span>Prime Video</span>
            </Link>
          </Button>
          <Button asChild={true} variant="outline">
            <Link href={searchLink.hulu} target="_blank" rel="noopener noreferrer">
              <TvIcon className="text-diggraph-accent" />
              <span>Hulu</span>
            </Link>
          </Button>
          <Button asChild={true} variant="outline">
            <Link href={searchLink.netflix} target="_blank" rel="noopener noreferrer">
              <TvIcon className="text-diggraph-accent" />
              <span>Netflix</span>
            </Link>
          </Button>
          <Button asChild={true} variant="outline">
            <Link href={searchLink.abemaTV} target="_blank" rel="noopener noreferrer">
              <TvIcon className="text-diggraph-accent" />
              <span>Abema TV</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
