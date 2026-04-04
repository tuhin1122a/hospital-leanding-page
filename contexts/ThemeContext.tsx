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

  // Prevent hydration styling mismatch by wrapping in a stable return or allowing initial render
  if (!mounted) return <div style={{ visibility: 'hidden' }}>{children}</div>

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
