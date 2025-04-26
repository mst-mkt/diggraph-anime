import type { FC, ReactNode } from 'react'
import { Header } from './_layout/header'

type AppLayoutProps = {
  children: ReactNode
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => (
  <div className="grid h-svh grid-rows-[auto_1fr] overflow-y-hidden">
    <Header />
    <main className="h-full min-h-0">{children}</main>
  </div>
)

export default AppLayout
