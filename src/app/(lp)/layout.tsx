import type { FC, ReactNode } from 'react'
import { Cards } from './_components/cards'
import { Graph } from './_components/graph'

type LpLayoutProps = {
  children: ReactNode
}

const LpLayout: FC<LpLayoutProps> = ({ children }) => (
  <div className="relative overflow-hidden">
    <Graph />
    <div className="relative flex h-svh min-h-0 flex-col items-center justify-center gap-y-16 px-4 pt-16 pb-40 sm:pb-64">
      {children}
    </div>
    <Cards />
  </div>
)

export default LpLayout
