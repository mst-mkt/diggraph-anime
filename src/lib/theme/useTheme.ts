'use client'

import { THEME, THEME_STORAGE_KEY, type Theme } from '@/constants/theme'
import { useCallback, useLayoutEffect, useSyncExternalStore } from 'react'

export const useTheme = () => {
  const theme = useSyncExternalStore(
    (callback) => {
      window.addEventListener('storage', callback)
      return () => window.removeEventListener('storage', callback)
    },
    () => {
      const storageValue = window.localStorage.getItem(THEME_STORAGE_KEY)
      return THEME.includes(storageValue as Theme) ? (storageValue as Theme) : THEME[0]
    },
    () => THEME[0],
  )

  const setTheme = useCallback((value: Theme) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, value)
    window.dispatchEvent(new Event('storage'))
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === THEME[0] ? THEME[1] : THEME[0])
  }, [theme, setTheme])

  useLayoutEffect(() => {
    document.documentElement.classList.remove(...THEME)
    document.documentElement.classList.add(theme)
  }, [theme])

  return { theme, setTheme, toggleTheme }
}
