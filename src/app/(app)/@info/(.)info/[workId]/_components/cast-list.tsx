'use client'

import type { Cast } from '@/lib/api/annict-rest/schema/casts'
import { UserIcon } from 'lucide-react'
import type { FC } from 'react'

type CastListProps = {
  casts: Cast[]
}

export const CastList: FC<CastListProps> = ({ casts }) => {
  return (
    <div>
      <h3 className="pb-4 font-bold text-lg">キャスト</h3>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {casts.map((cast) => (
          <li key={cast.id}>
            <div className="flex items-center space-x-4 rounded-xl p-4 shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted-foreground/10 ">
                <UserIcon size={24} className="text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm leading-snug">{cast.character.name}</p>
                <p className="pt-1 text-muted-foreground text-sm">{cast.person.name}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
