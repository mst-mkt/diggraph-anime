import type { FC, ReactNode } from 'react'
import { Header } from './_layout/header'

type AppLayoutProps = {
  children: ReactNode
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => (
  <div className="flex h-svh flex-col">
    <Header />
    <main className="grow">{children}</main>
  </div>
)

export default AppLayout
