'use client'

import React from 'react'
import { History, ShieldAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/LanguageContext'

interface AuditLogsProps { logs: any[] }

export default function AuditLogs({ logs }: AuditLogsProps) {
  const { t } = useLanguage()

  return (
    <div className="bg-card rounded-[3rem] border border-border p-10 shadow-sm">
      <div className="flex items-center justify-between mb-10"><div><h3 className="text-2xl font-black text-card-foreground tracking-tight">{t('Security Audit Logs')}</h3><p className="text-sm text-muted-foreground font-medium">{t('Real-time monitoring of system-wide interactions')}</p></div></div>
      <div className="space-y-4">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-border/50 hover:bg-muted/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${log.status === 'Blocked' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>{log.status === 'Blocked' ? <ShieldAlert size={18} /> : <History size={18} />}</div>
              <div><p className="font-black text-card-foreground">{t(log.event)}</p><p className="text-xs font-bold text-muted-foreground/70">{log.user === 'Admin (System)' ? t('Admin (System)') : log.user} • {log.ip}</p></div>
            </div>
            <div className="text-right"><p className="text-xs font-black text-card-foreground mb-1">{log.time}</p><Badge className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border-none ${log.status === 'Blocked' ? 'bg-red-500 text-background' : 'bg-emerald-500 text-background'}`}>{t(log.status)}</Badge></div>
          </div>
        ))}
      </div>
    </div>
  )
}
