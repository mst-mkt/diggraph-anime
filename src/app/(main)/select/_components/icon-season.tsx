import { FlowerIcon, LeafIcon, type LucideProps, SnowflakeIcon, SunIcon } from 'lucide-react'
import type { FC } from 'react'
import { match } from 'ts-pattern'

type SeasonIconProps = {
  season: string
} & LucideProps

export const SeasonIcon: FC<SeasonIconProps> = ({ season, ...props }) => {
  const seasonName = season.split('-').at(-1)

  if (seasonName === undefined) {
    return null
  }

  return match(seasonName.toLowerCase())
    .with('spring', () => <FlowerIcon {...props} />)
    .with('summer', () => <SunIcon {...props} />)
    .with('autumn', () => <LeafIcon {...props} />)
    .with('winter', () => <SnowflakeIcon {...props} />)
    .otherwise(() => null)
}
