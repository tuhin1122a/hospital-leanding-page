'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'emerald' | 'rose' | 'amber'

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Read from localStorage on mount
    const storedTheme = localStorage.getItem('hospital_theme') as Theme
    if (storedTheme) {
      setTheme(storedTheme)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('hospital_theme', theme)
    // Apply theme to document element
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-emerald', 'theme-rose', 'theme-amber', 'dark', 'light')
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (theme !== 'light') {
      document.documentElement.classList.add(`theme-${theme}`)
    }
  }, [theme, mounted])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Return default for SSR/Build
    return {
      theme: 'light' as Theme,
      setTheme: () => {}
    }
  }
  return context
}
