import { PROJECT_NAME, PROJECT_REPOSITORY_URL } from '@/constants/project'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

export const Footer = () => (
  <footer className="mx-auto flex w-[92svw] max-w-160 flex-col gap-y-4 py-12">
    <div className="flex gap-x-1">
      {[...Array(5)].map((_, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a static array
          key={`footer-separator-${i}`}
          className="h-[7px] w-[8px] bg-diggraph-accent even:rotate-180"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        />
      ))}
    </div>
    <div className="text-sm">{PROJECT_NAME}</div>
    <div className="flex items-center gap-x-4 font-mono text-xs">
      <span>© {new Date().getFullYear()}</span>
      <Link
        href={PROJECT_REPOSITORY_URL}
        className="flex items-center gap-x-1 transition-colors hover:text-diggraph-accent-700"
      >
        <span>repo</span>
        <ExternalLinkIcon size={12} />
      </Link>
    </div>
  </footer>
)
