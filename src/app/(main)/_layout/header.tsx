import { VisitorDialog } from '@/app/_layout/visitor-dialog'
import { PROJECT_NAME } from '@/constants/project'
import { PickaxeIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { ThemeButton } from './theme-button.client'

export const Header = () => (
  <header className="sticky top-0 z-10 border-muted border-b px-[4svw] backdrop-blur-md">
    <div className="mx-auto flex w-full max-w-160 items-center gap-x-4 py-3">
      <PickaxeIcon size={24} className="text-diggraph-accent" />
      <Link href="/" className="grow">
        <h1 className="truncate font-bold text-lg">{PROJECT_NAME}</h1>
      </Link>
      <Suspense>
        <VisitorDialog />
      </Suspense>
      <ThemeButton />
    </div>
  </header>
)
