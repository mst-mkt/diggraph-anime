import { PROJECT_NAME } from '@/constants/project'
import { PickaxeIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { ThemeButton } from './theme-button.client'
import { VisitorButton } from './visitor-button'

export const Header: FC = () => (
  <header className="flex h-fit w-full items-center gap-x-4 border border-bottom border-muted px-[4svw] py-3 md:px-8">
    <PickaxeIcon size={24} className="text-diggraph-accent" />
    <Link href="/" className="grow">
      <h1 className="font-bold text-lg">{PROJECT_NAME}</h1>
    </Link>
    <VisitorButton />
    <ThemeButton />
  </header>
)
