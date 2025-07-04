import { VisitorDialog } from '@/app/_layout/visitor-dialog'
import { cn } from '@/lib/classnames'
import { Bonheur_Royale } from 'next/font/google'
import Link from 'next/link'
import { type FC, Suspense } from 'react'
import { ThemeButton } from './theme-button.client'

const bonheur = Bonheur_Royale({ weight: '400' })

export const Header: FC = () => (
  <header className="flex h-fit w-full items-center gap-x-4 border-muted border-b-2 px-[4svw] py-3 md:px-8">
    <Link href="/" className="grow">
      <h1 className="flex items-center gap-x-1 truncate font-bold text-xl">
        <span>Diggraph</span>
        <span className={cn('-ml-3 mt-1 text-3xl text-diggraph-accent', bonheur.className)}>
          Anime
        </span>
      </h1>
    </Link>
    <Suspense>
      <VisitorDialog />
    </Suspense>
    <ThemeButton />
  </header>
)
