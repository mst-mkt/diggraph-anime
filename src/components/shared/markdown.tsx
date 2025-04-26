import { cn } from '@/lib/classnames'
import type { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

type MarkdownProps = {
  children: string
  className?: string
}

export const Markdown: FC<MarkdownProps> = ({ children, className }) => (
  <div
    className={cn(
      'prose dark:prose-invert prose-neutral w-full max-w-full break-words break-all [&_a]:text-diggraph-accent',
      className,
    )}
  >
    <ReactMarkdown skipHtml={false} remarkPlugins={[remarkGfm, remarkBreaks]}>
      {children}
    </ReactMarkdown>
  </div>
)
