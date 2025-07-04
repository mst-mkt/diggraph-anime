import type { FC, ReactNode } from 'react'
import { Header } from './_layout/header'

type AppLayoutProps = {
  children: ReactNode
  info: ReactNode
  collection: ReactNode
}

const AppLayout: FC<AppLayoutProps> = ({ children, info, collection }) => (
  <div className="grid h-svh grid-rows-[auto_1fr] overflow-y-hidden">
    <Header />
    <main className="h-full min-h-0">{children}</main>
    {info}
    {collection}
  </div>
)

export default AppLayout
