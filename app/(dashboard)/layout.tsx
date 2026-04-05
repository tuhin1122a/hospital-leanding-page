import type { Metadata } from 'next';

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Dashboard - Nurjahan Private Hospital & Diagnostic Center-2',
  description: 'Manage hospital operations, appointments, and patient records.',
  icons: {
    icon: '/icon.svg',
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      {children}
    </div>
  )
}
