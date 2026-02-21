'use client'

import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { applyTheme, STORAGE_KEY, ThemeContext, type Theme } from './theme-utils'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
    const initial = stored === 'dark' ? 'dark' : 'light'
    setTheme(initial)
    applyTheme(initial)
  }, [])

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
