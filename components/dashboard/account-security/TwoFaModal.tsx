'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface TwoFaModalProps {
  show: boolean
  qrCode: string | null
  secret: string
  token: string
  loading: boolean
  onClose: () => void
  onTokenChange: (val: string) => void
  onVerify: () => void
}

export default function TwoFaModal({ show, qrCode, secret, token, loading, onClose, onTokenChange, onVerify }: TwoFaModalProps) {
  const { t } = useLanguage()

  return (
    <AnimatePresence>
      {show && qrCode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card rounded-2xl border border-border p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-card-foreground">{t('Setup Google Authenticator')}</h3>
              <button onClick={onClose} className="p-2 rounded-xl bg-muted hover:bg-border transition-all text-muted-foreground">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5">
              <div className="text-sm text-muted-foreground font-medium space-y-2">
                <p>1. {t('Open')} <span className="font-black text-card-foreground">Google Authenticator</span> {t('or')} <span className="font-black text-card-foreground">Authy</span> {t('on your phone.')}</p>
                <p>2. {t('Tap')} <span className="font-black text-card-foreground">+</span> {t('and scan this QR code:')}</p>
              </div>

              <div className="flex justify-center p-4 bg-white rounded-2xl border border-border">
                <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
              </div>

              <div className="p-3 rounded-2xl bg-muted/50 border border-border/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{t('Manual Entry Key')}</p>
                <p className="font-mono text-[11px] text-card-foreground break-all">{secret}</p>
              </div>

              <p className="text-sm text-muted-foreground font-medium">
                3. {t('Enter the')} <span className="font-black text-card-foreground">6-digit code</span> {t('from the app:')}
              </p>

              <input
                type="text"
                maxLength={6}
                value={token}
                onChange={e => onTokenChange(e.target.value.replace(/\D/g, ''))}
                className="w-full px-5 py-4 rounded-2xl bg-muted border border-border outline-none font-mono font-black text-card-foreground text-center text-xl tracking-[0.5em] focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="000000"
              />

              <Button onClick={onVerify} disabled={loading || token.length < 6}
                className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-lg shadow-primary/20 h-12">
                {loading ? t('Verifying...') : t('Verify & Enable 2FA')}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
