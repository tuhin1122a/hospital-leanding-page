import type { Metadata } from 'next';
import AuthGuard from '@/components/providers/AuthGuard';

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Dashboard - Nurjahan Private Hospital & Diagnostic Center-2',
  description: 'Manage hospital operations, appointments, and patient records.',
  icons: {
    icon: '/favicon (2).png',
    apple: '/favicon (2).png',
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      <AuthGuard>
        {children}
      </AuthGuard>
    </div>
  )
}
