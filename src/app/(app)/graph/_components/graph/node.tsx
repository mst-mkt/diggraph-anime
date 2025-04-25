import type { WorkNode as WorkNodeType } from '@/hooks/useWorkGraph'
import { cn } from '@/lib/classnames'
import { renderToStaticMarkup } from 'react-dom/server'

export const WorkNode = (node: WorkNodeType) => {
  const nodeSize = 64
  const roundedSize = 8
  const ringGap = 3
  const ringWidth = 2

  return renderToStaticMarkup(
    <g>
      {node.image === '' ? (
        <rect
          x={0}
          y={0}
          width={nodeSize}
          height={nodeSize}
          fill="var(--muted)"
          rx={roundedSize}
          className={cn(
            node.status === 'pending' && 'animate-pulse',
            (node.status === 'selected' || node.status === 'expanded') && 'scale-125',
          )}
        />
      ) : (
        <image
          href={node.image}
          width={nodeSize}
          height={nodeSize}
          preserveAspectRatio="xMidYMid slice"
          className={cn(
            node.status === 'pending' && 'animate-pulse',
            (node.status === 'selected' || node.status === 'expanded') && 'scale-125',
          )}
        />
      )}
      <rect
        x={0}
        y={0}
        width={nodeSize}
        height={nodeSize}
        fill="none"
        stroke="var(--background)"
        strokeWidth={ringGap * 2}
        rx={roundedSize}
        className={cn((node.status === 'selected' || node.status === 'expanded') && 'scale-125')}
      />
      <rect
        x={-ringGap}
        y={-ringGap}
        width={nodeSize + ringGap * 2}
        height={nodeSize + ringGap * 2}
        fill="none"
        strokeWidth={ringWidth}
        className={cn(
          node.status === 'expanded' && 'stroke-diggraph-accent-200',
          (node.status === 'selected' || node.status === 'pending') && 'stroke-diggraph-accent',
          node.status === 'default' && 'stroke-border',
          node.status === 'pending' && 'animate-pulse',
          (node.status === 'selected' || node.status === 'expanded') && 'scale-125',
        )}
        rx={roundedSize + ringGap}
      />
    </g>,
  )
}
