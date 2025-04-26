import { getWorkCasts } from '@/app/actions/api/get-work-casts'
import type { Work } from '@/lib/api/annict-rest/schema/works'
import { UserIcon, UsersIcon } from 'lucide-react'
import type { FC } from 'react'

type CastListProps = {
  workId: Work['id']
}

export const CastList: FC<CastListProps> = async ({ workId }) => {
  const casts = await getWorkCasts(workId)

  if (casts.length === 0) return null

  return (
    <>
      <h3 className="flex items-center gap-x-2 font-bold text-lg">
        <UsersIcon size={24} className="text-diggraph-accent" />
        <span>キャスト</span>
      </h3>
      <ul className="grid @sm/dialog:grid-cols-2 grid-cols-1 gap-4">
        {casts.map((cast) => (
          <li key={cast.id}>
            <div className="flex items-center gap-x-2 rounded-lg border border-border p-3 shadow-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground ">
                <UserIcon size={24} />
              </div>
              <div className="min-w-0 grow text-sm">
                <p className="truncate font-bold">{cast.character.name}</p>
                <p className="truncate text-muted-foreground">{cast.person.name}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
