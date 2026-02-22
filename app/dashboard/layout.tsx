'use client'

import Sidebar from '@/components/dashboard/sidebar'
import Topbar from '@/components/dashboard/topbar'
import React, { useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [role, setRole] = useState('admin')

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden font-sans">
      <Sidebar currentRole={role} />
      
      <div className="flex-grow flex flex-col min-w-0">
        <Topbar role={role} setRole={setRole} />
        
        <main className="flex-grow overflow-y-auto p-8 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  )
}
