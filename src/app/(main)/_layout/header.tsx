import { VisitorDialog } from '@/app/_layout/visitor-dialog'
import { Logo } from '@/components/shared/logo'
import Link from 'next/link'
import { Suspense } from 'react'
import { ThemeButton } from './theme-button.client'

export const Header = () => (
  <header className="sticky top-0 z-10 px-[4svw] backdrop-blur-md">
    <div className="mx-auto flex w-full max-w-160 items-center gap-x-4 py-3">
      <Link href="/" className="grow">
        <h1>
          <Logo width={160} height={40} />
        </h1>
      </Link>
      <Suspense>
        <VisitorDialog />
      </Suspense>
      <ThemeButton />
    </div>
  </header>
)
