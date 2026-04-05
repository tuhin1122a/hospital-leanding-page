'use client'

import Sidebar from '@/components/dashboard/sidebar'
import Topbar from '@/components/dashboard/topbar'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/contexts/ThemeContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <div className="flex h-screen bg-background overflow-hidden font-sans relative">
        <Sidebar />

        <div className="flex-grow flex flex-col min-w-0">
          <Topbar />

          <main className="flex-grow overflow-y-auto p-8 lg:p-12 bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
