'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Monitor } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface Device {
  browser: string
  os: string
  device: string
  ip: string
  lastSeen: string
}

interface ActiveDevicesCardProps {
  devices: Device[]
}

export default function ActiveDevicesCard({ devices }: ActiveDevicesCardProps) {
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
      className="bg-card rounded-[2.5rem] border border-border p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Monitor size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-black text-card-foreground">{t('Active Devices')}</h3>
          <p className="text-xs text-muted-foreground font-medium">{t('Devices that have logged into your account')}</p>
        </div>
      </div>
      {devices.length === 0 ? (
        <p className="text-muted-foreground text-sm font-medium text-center py-4">{t('No active devices found — log in to populate')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devices.map((dev, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Monitor size={18} className="text-primary" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-bold text-card-foreground text-sm">{dev.browser} · {dev.os}</p>
                <p className="text-xs text-muted-foreground font-medium">{dev.device} · {dev.ip}</p>
              </div>
              <p className="text-[10px] font-black text-muted-foreground whitespace-nowrap">{formatTime(dev.lastSeen)}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
