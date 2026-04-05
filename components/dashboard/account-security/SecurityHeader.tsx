'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface SecurityHeaderProps {
  score: number
  twoFaEnabled: boolean
  sessionCount: number
}

export default function SecurityHeader({ score, twoFaEnabled, sessionCount }: SecurityHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Account Security')}</h1>
        <p className="text-muted-foreground font-medium text-lg mt-1">{t('Manage your password, 2FA and login sessions')}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary to-blue-600 rounded-[3rem] p-8 text-primary-foreground relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[2rem] bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield size={36} className="text-white" />
            </div>
            <div>
              <p className="text-white/70 font-bold text-sm uppercase tracking-widest mb-1">{t('Security Score')}</p>
              <h2 className="text-5xl font-black tracking-tight">{score}<span className="text-2xl text-white/70">/100</span></h2>
              <p className="text-white/70 font-medium text-sm mt-1">{twoFaEnabled ? t('Excellent · 2FA Active') : t('Good · Enable 2FA for better security')}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Password', val: '✓', ok: true },
              { label: '2FA', val: twoFaEnabled ? '✓' : '✗', ok: twoFaEnabled },
              { label: 'Sessions', val: String(sessionCount), ok: true },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className={`text-2xl font-black ${item.ok ? 'text-white' : 'text-white/40'}`}>{item.val}</p>
                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-1">{t(item.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
