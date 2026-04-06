'use client'

import React from 'react'
import { ShieldAlert, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ApprovalCenter from '@/components/dashboard/security/ApprovalCenter'
import AuditLogs from '@/components/dashboard/security/AuditLogs'
import SecuritySettings from '@/components/dashboard/security/SecuritySettings'

import { getAccessToken } from '@/lib/utils'

const APPROVALS_API = `${process.env.NEXT_PUBLIC_API_URL}/approvals`
const authHeader = () => ({ 
  Authorization: `Bearer ${getAccessToken()}`, 
  'Content-Type': 'application/json' 
})

export default function SecurityPage() {
  const { t } = useLanguage(); const queryClient = useQueryClient()

  const { data: userProfile } = useQuery({ 
    queryKey: ['me'], 
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { headers: authHeader() }).then(r => r.json()) 
  })

  const { data: approvals = [], isLoading: approvalsLoading } = useQuery({ queryKey: ['approvals'], queryFn: () => fetch(APPROVALS_API, { headers: authHeader() }).then(r => r.ok ? r.json() : []) })

  const actionMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => fetch(`${APPROVALS_API}/${id}/status`, { method: 'PATCH', headers: authHeader(), body: JSON.stringify({ status }) }),
    onSuccess: (_, variables) => { queryClient.invalidateQueries({ queryKey: ['approvals'] }); toast.success(`Request ${variables.status.toLowerCase()}`) }
  })

  const { data: auditLogs = [], isLoading: logsLoading } = useQuery({ 
    queryKey: ['audit-logs'], 
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/admin/audit-logs`, { headers: authHeader() }).then(r => r.json()),
    enabled: userProfile?.role === 'ADMIN'
  })

  const logs = auditLogs.map((l: any) => ({
    event: l.success ? t('Successful Login') : t('Failed Login'),
    user: l.user?.name || t('Unknown'),
    time: new Date(l.createdAt).toLocaleString(),
    ip: l.ip || '0.0.0.0',
    status: l.success ? t('Verified') : t('Blocked')
  }))

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h1 className="text-4xl font-black tracking-tighter">{t('Security & Governance')}</h1><p className="text-muted-foreground font-medium text-lg mt-1">{t('Audit trails, governance approvals, and system security')}</p></div>
        <div className="flex items-center gap-3"><Button variant="outline" className="h-14 px-8 rounded-2xl border-border font-black"><ShieldAlert size={20} className="mr-2 text-red-500" /> {t('System Audit')}</Button><Button className="h-14 px-8 rounded-2xl bg-foreground text-background font-black shadow-xl"><Lock size={20} className="mr-2" /> {t('Lockdown Mode')}</Button></div>
      </div>
      <ApprovalCenter approvals={approvals} isLoading={approvalsLoading} onAction={(id, status) => actionMutation.mutate({ id, status })} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div className="lg:col-span-2"><AuditLogs logs={logs} /></div><div><SecuritySettings user={userProfile} /></div></div>
    </div>
  )
}
