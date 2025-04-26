import type { introspection_types } from '@/lib/api/annict-graphql/schema.gen'
import type { Rating } from '@/lib/api/annict-rest/schema/common'
import { BombIcon, CupSodaIcon, type LucideProps, MoonStarIcon, SparklesIcon } from 'lucide-react'
import type { FC } from 'react'
import { P, match } from 'ts-pattern'

type RatingIconProps = {
  rating: Rating | introspection_types['RatingState']['enumValues']
} & LucideProps

export const RatingIcon: FC<RatingIconProps> = ({ rating, ...props }) => {
  return match(rating)
    .with(P.union('bad', 'BAD'), () => <BombIcon {...props} />)
    .with(P.union('average', 'AVERAGE'), () => <CupSodaIcon {...props} />)
    .with(P.union('good', 'GOOD'), () => <SparklesIcon {...props} />)
    .with(P.union('great', 'GREAT'), () => <MoonStarIcon {...props} />)
    .exhaustive()
}
