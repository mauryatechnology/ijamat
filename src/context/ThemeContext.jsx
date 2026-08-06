import { createContext, useContext, useState, useEffect } from 'react'

const defaultTokens = {
  pageBg: '#F4F6F8',
  textPrimary: '#111827',
  textSecondary: '#2563EB',
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  sidebarBg: '#0F172A',
  cardBg: '#FFFFFF',
  borderColor: '#E2E8F0',
  appName: 'Jamaat Cloud',
  tagline: 'Simplifying Operations'
}

const ThemeContext = createContext({
  tokens: defaultTokens,
  updateTheme: () => {},
  resetTheme: () => {}
})

export function ThemeProvider({ children }) {
  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem('jamaat_cloud_theme_tokens')
    return saved ? JSON.parse(saved) : defaultTokens
  })

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-page-bg', tokens.pageBg)
    root.style.setProperty('--color-text-primary', tokens.textPrimary)
    root.style.setProperty('--color-text-secondary', tokens.textSecondary)
    root.style.setProperty('--color-primary', tokens.primary)
    root.style.setProperty('--color-primary-dark', tokens.primaryDark)
    root.style.setProperty('--color-sidebar', tokens.sidebarBg)
    root.style.setProperty('--color-card', tokens.cardBg)
    root.style.setProperty('--color-border', tokens.borderColor)

    localStorage.setItem('jamaat_cloud_theme_tokens', JSON.stringify(tokens))
  }, [tokens])

  const updateTheme = (newTokens) => {
    setTokens(prev => ({ ...prev, ...newTokens }))
  }

  const resetTheme = () => {
    setTokens(defaultTokens)
  }

  return (
    <ThemeContext.Provider value={{ tokens, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
