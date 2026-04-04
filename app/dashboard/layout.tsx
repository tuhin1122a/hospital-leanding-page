'use client'

import Sidebar from '@/components/dashboard/sidebar'
import Topbar from '@/components/dashboard/topbar'
import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="flex h-screen bg-background overflow-hidden font-sans">
          <Toaster position="top-right" />
          <Sidebar />

          <div className="flex-grow flex flex-col min-w-0">
            <Topbar />

            <main className="flex-grow overflow-y-auto p-8 lg:p-12 bg-muted/30">
              {children}
            </main>
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
