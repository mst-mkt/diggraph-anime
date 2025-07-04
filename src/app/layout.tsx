import { Toaster } from '@/components/ui/sonner'
import '../styles/globals.css'
import { BASIC_METADATA } from '@/constants/project'
import { ThemeLoader } from '@/lib/theme/theme-loader'
import { NuqsAdapter } from 'nuqs/adapters/next'
import type { FC, ReactNode } from 'react'

export const metadata = BASIC_METADATA

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="ja" suppressHydrationWarning={true}>
    <ThemeLoader />
    <body>
      <NuqsAdapter>{children}</NuqsAdapter>
      <Toaster richColors={true} />
    </body>
  </html>
)

export default RootLayout
