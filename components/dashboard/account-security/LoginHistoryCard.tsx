'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, RefreshCw, CheckCircle, AlertTriangle, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface LoginHistoryCardProps {
  loginHistory: any[]
  loadingHistory: boolean
  onRefresh: () => void
}

export default function LoginHistoryCard({ loginHistory, loadingHistory, onRefresh }: LoginHistoryCardProps) {
  const { t } = useLanguage()

  const formatTime = (iso: string) => {
    const d = new Date(iso)
    const diff = Date.now() - d.getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return t('Just now')
    if (mins < 60) return `${mins} ${t('min ago')}`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}${t('h ago')}`
    return d.toLocaleDateString()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className="bg-card rounded-[2.5rem] border border-border p-8"
    >
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Clock size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="font-black text-card-foreground">{t('Login History')}</h3>
            <p className="text-xs text-muted-foreground font-medium">{t('Recent account access')} ({loginHistory.length} {t('records')})</p>
          </div>
        </div>
        <button onClick={onRefresh} className="p-2.5 rounded-xl bg-muted hover:bg-border transition-all text-muted-foreground">
          <RefreshCw size={16} className={loadingHistory ? 'animate-spin' : ''} />
        </button>
      </div>

      {loadingHistory ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-16 rounded-2xl bg-muted animate-pulse" />)}
        </div>
      ) : loginHistory.length === 0 ? (
        <p className="text-muted-foreground text-sm font-medium text-center py-8">{t('No login history yet')}</p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {loginHistory.map((log, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${log.success ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                  {log.success ? <CheckCircle size={16} className="text-emerald-500" /> : <AlertTriangle size={16} className="text-red-500" />}
                </div>
                <div>
                  <p className="font-bold text-card-foreground text-sm">{log.success ? t('Login successful') : t('Failed attempt')}</p>
                  <p className="text-xs text-muted-foreground font-medium">{log.browser} · {log.os} · {log.device}</p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-xs font-black text-card-foreground">{formatTime(log.createdAt)}</p>
                <div className="flex items-center gap-1 justify-end mt-1">
                  <Globe size={10} className="text-muted-foreground" />
                  <p className="text-[10px] font-bold text-muted-foreground">{log.ip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
