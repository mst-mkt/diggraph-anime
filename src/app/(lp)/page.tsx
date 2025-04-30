import { Button } from '@/components/ui/button'
import { PROJECT_REPOSITORY_URL } from '@/constants/project'
import { cn } from '@/lib/classnames'
import { SparklesIcon, TerminalIcon } from 'lucide-react'
import { Figtree } from 'next/font/google'
import Link from 'next/link'

const figtreeFont = Figtree({ subsets: ['latin'], weight: ['900'] })

const Home = async () => (
  <>
    <h1
      className={cn(
        'w-full select-none text-center font-black text-6xl sm:text-7xl md:text-8xl',
        figtreeFont.className,
      )}
    >
      <span
        className="-mr-2 sm:-mr-3 md:-mr-4 text-background"
        style={{
          textShadow:
            '-1px -1px 0 var(--muted-foreground), 1px -1px 0 var(--muted-foreground), -1px 1px 0 var(--muted-foreground), 1px 1px 0 var(--muted-foreground)',
        }}
      >
        DIG
      </span>
      <span
        className="-ml-2 sm:-ml-3 md:-ml-4 text-diggraph-accent"
        style={{
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundImage:
            'linear-gradient(to right, var(--color-diggraph-accent), var(--color-diggraph-accent-700))',
        }}
      >
        Graph
      </span>
    </h1>
    <div className="flex flex-col items-center gap-y-2">
      <p className="break-keep text-center text-muted-foreground text-xs sm:text-sm">
        好きなアニメを選んで、
        <wbr />
        そのアニメに関連する作品を探索しよう !
      </p>
      <p className="text-muted-foreground text-xs sm:text-sm">
        知らなかった面白い作品に出会えるかも !?
      </p>
    </div>
    <Button asChild={true} className="select-none">
      <Link href="/select">
        <SparklesIcon />
        <span>アニメを選択して、探索をはじめる</span>
      </Link>
    </Button>
    <Button asChild={true} variant="link" size="sm" className="select-none">
      <Link
        href={PROJECT_REPOSITORY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-muted-foreground text-xs"
      >
        <TerminalIcon size={12} />
        <span>Repository</span>
      </Link>
    </Button>
  </>
)

export default Home
