import type { FC, ReactNode } from 'react'
import { Footer } from './_layout/footer'
import { Header } from './_layout/header'

type MainLayoutProps = {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <div className="flex min-h-svh flex-col gap-y-8">
    <Header />
    <main className="mx-auto w-[92svw] max-w-160 grow">{children}</main>
    <Footer />
  </div>
)

export default MainLayout
