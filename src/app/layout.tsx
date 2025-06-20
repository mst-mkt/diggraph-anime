import '../styles/globals.css'
import { BASIC_METADATA } from '@/constants/project'
import { ThemeLoader } from '@/lib/theme/theme-loader'
import { SessionProvider } from 'next-auth/react'
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
      <SessionProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </SessionProvider>
    </body>
  </html>
)

export default RootLayout
