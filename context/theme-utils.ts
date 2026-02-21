import { createContext } from 'react'

export type Theme = 'light' | 'dark'

export type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const STORAGE_KEY = 'cloudsy-theme-preference'

export const applyTheme = (nextTheme: Theme) => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.dataset.theme = nextTheme
  root.classList.toggle('dark', nextTheme === 'dark')
  root.classList.toggle('light', nextTheme === 'light')
  document.body.classList.toggle('dark', nextTheme === 'dark')
}
