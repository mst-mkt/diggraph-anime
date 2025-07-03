import { ClapperboardIcon, PickaxeIcon, WaypointsIcon } from 'lucide-react'
import type { FC } from 'react'

type GraphSummaryProps = {
  nodes: number
  links: number
  expanded: number
}

export const GraphSummary: FC<GraphSummaryProps> = ({ nodes, links, expanded }) => (
  <ul className="absolute top-4 left-4 z-10 grid gap-x-2 gap-y-1 rounded-md border border-border bg-background/32 px-3 py-2 font-mono text-xs shadow-xs backdrop-blur-md">
    <li className="col-span-3 grid grid-cols-subgrid items-center">
      <PickaxeIcon size={14} className="text-muted-foreground" />
      <span>DIG</span>
      <span>{expanded}</span>
    </li>
    <li className="col-span-3 grid grid-cols-subgrid items-center">
      <ClapperboardIcon size={14} className="text-muted-foreground" />
      <span>WORK</span>
      <span>{nodes}</span>
    </li>
    <li className="col-span-3 grid grid-cols-subgrid items-center">
      <WaypointsIcon size={14} className="text-muted-foreground" />
      <span>LINK</span>
      <span>{links}</span>
    </li>
  </ul>
)
