import { PROJECT_NAME } from '@/constants/project'
import { PickaxeIcon } from 'lucide-react'
import Link from 'next/link'
import { ThemeButton } from './theme-button.client'

export const Header = () => (
  <header className="sticky top-0 border-muted border-b px-[4svw] backdrop-blur-md">
    <div className="mx-auto flex w-full max-w-160 items-center gap-x-4 py-3">
      <PickaxeIcon size={24} className="text-diggraph-accent" />
      <Link href="/" className="grow">
        <h1 className="truncate font-bold text-lg">{PROJECT_NAME}</h1>
      </Link>
      <ThemeButton />
    </div>
  </header>
)
