import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { PROJECT_REPOSITORY_URL } from '@/constants/project'
import { SparklesIcon, TerminalIcon } from 'lucide-react'
import Link from 'next/link'

const Home = async () => (
  <>
    <h1 className="flex w-full select-none items-center justify-center font-bold text-5xl sm:text-6xl md:text-7xl">
      <Logo width={640} height={160} className="max-w-full" />
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
