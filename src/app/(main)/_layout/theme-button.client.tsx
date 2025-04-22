'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme/useTheme'
import { MoonIcon, SunIcon } from 'lucide-react'
import { match } from 'ts-pattern'

export const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button onClick={toggleTheme} size="icon" variant="ghost" className="cursor-pointer">
      {match(theme)
        .with('light', () => <SunIcon size={24} />)
        .with('dark', () => <MoonIcon size={24} />)
        .exhaustive()}
    </Button>
  )
}
