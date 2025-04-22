import { PROJECT_NAME } from '@/constants/project'
import { PickaxeIcon } from 'lucide-react'
import Link from 'next/link'
import { ThemeButton } from './theme-button.client'

export const Header = () => (
  <header className="flex w-full items-center gap-x-4 border border-bottom border-muted px-8 py-3">
    <PickaxeIcon size={24} className="text-diggraph-accent" />
    <Link href="/" className="grow">
      <h1 className="font-bold text-lg">{PROJECT_NAME}</h1>
    </Link>
    <ThemeButton />
  </header>
)
