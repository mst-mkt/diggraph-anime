import { THEME, THEME_STORAGE_KEY } from '@/constants/theme'

export const ThemeLoader = () => (
  <head>
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml:
      dangerouslySetInnerHTML={{
        __html: `
            const theme = localStorage.getItem('${THEME_STORAGE_KEY}')
            document.documentElement.classList.add(theme ?? '${THEME[0]}')
        `,
      }}
    />
  </head>
)
