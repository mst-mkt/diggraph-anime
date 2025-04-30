import { useSyncExternalStore } from 'react'

export const useMobile = (query = '(max-width: 640px)') => {
  const isMobile = useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia(query)
      const handleChange = () => onStoreChange()
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    },
    () => window.matchMedia('(max-width: 640px)').matches,
    () => false,
  )

  return isMobile
}
