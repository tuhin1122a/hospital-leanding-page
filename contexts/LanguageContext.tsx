'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '@/lib/translations'

type Language = 'en' | 'bn'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language
    if (saved && (saved === 'en' || saved === 'bn')) {
      setLang(saved)
    }
    setMounted(true)
  }, [])

  const handleSetLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('lang', newLang)
  }

  const t = (key: string): string => {
    if (!mounted) return translations['en'][key] || key
    return translations[lang]?.[key] || translations['en'][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    // Return a fallback for SSR/Build time to prevent "Cannot read properties of null"
    return {
      lang: 'en' as Language,
      setLang: () => {},
      t: (key: string) => translations['en']?.[key] || key
    }
  }
  return context
}
