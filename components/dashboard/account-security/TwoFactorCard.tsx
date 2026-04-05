'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Smartphone, CheckCircle, AlertTriangle, Key, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

interface TwoFactorCardProps {
  twoFaEnabled: boolean
  loading2fa: boolean
  onGenerate: () => void
  onDisable: () => void
}

export default function TwoFactorCard({ twoFaEnabled, loading2fa, onGenerate, onDisable }: TwoFactorCardProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-5">
      {/* 2FA Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="bg-card rounded-[2.5rem] border border-border p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center">
            <Smartphone size={18} className="text-purple-500" />
          </div>
          <div>
            <h3 className="font-black text-card-foreground">{t('Two-Factor Auth (TOTP)')}</h3>
            <p className="text-xs text-muted-foreground font-medium">{t('Google Authenticator / Authy')}</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 mb-4">
          <div>
            <p className="font-bold text-card-foreground text-sm">{t('Authenticator App')}</p>
            <p className="text-xs text-muted-foreground font-medium">{twoFaEnabled ? t('Active & Secured') : t('Not configured')}</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black ${twoFaEnabled ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-500'}`}>
            {twoFaEnabled ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
            {twoFaEnabled ? t('Enabled') : t('Disabled')}
          </div>
        </div>

        {twoFaEnabled ? (
          <Button onClick={onDisable} disabled={loading2fa} variant="outline"
            className="w-full py-3 rounded-2xl border-red-200 text-red-500 hover:bg-red-50 font-black">
            {loading2fa ? t('Disabling...') : t('Disable 2FA')}
          </Button>
        ) : (
          <Button onClick={onGenerate} disabled={loading2fa}
            className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black shadow-lg shadow-purple-200 flex items-center justify-center gap-2">
            <QrCode size={16} />
            {loading2fa ? t('Generating...') : t('Setup Google Authenticator')}
          </Button>
        )}
      </motion.div>

      {/* API Key Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-card rounded-[2.5rem] border border-border p-8"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <Key size={18} className="text-amber-500" />
          </div>
          <div>
            <h3 className="font-black text-card-foreground">{t('API Access')}</h3>
            <p className="text-xs text-muted-foreground font-medium">{t('Developer API key')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 font-mono text-xs text-muted-foreground">
          <span className="flex-grow tracking-wider">sk_live_••••••••••••••••••••••</span>
          <button onClick={() => { navigator.clipboard.writeText('sk_live_example'); toast.success(t('Copied!')) }}
            className="text-primary font-bold hover:text-primary/80 transition-colors">{t('Copy')}</button>
        </div>
      </motion.div>
    </div>
  )
}
