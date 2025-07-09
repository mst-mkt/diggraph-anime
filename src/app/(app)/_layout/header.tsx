import { VisitorDialog } from '@/app/_layout/visitor-dialog'
import { Logo } from '@/components/shared/logo'
import Link from 'next/link'
import { type FC, Suspense } from 'react'
import { ThemeButton } from './theme-button.client'

export const Header: FC = () => (
  <header className="flex h-fit w-full items-center gap-x-4 border-muted border-b-2 px-[4svw] py-3 md:px-8">
    <Link href="/" className="grow">
      <h1>
        <Logo width={160} height={40} />
      </h1>
    </Link>
    <Suspense>
      <VisitorDialog />
    </Suspense>
    <ThemeButton />
  </header>
)
