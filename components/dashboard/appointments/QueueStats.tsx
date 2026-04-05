'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Activity } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface QueueStatsProps {
  appointments: any[]
}

export default function QueueStats({ appointments }: QueueStatsProps) {
  const { t } = useLanguage()
  const waitingCount = appointments.filter(a => a.status === 'PENDING').length

  return (
    <div className="space-y-8">
      <Card className="p-8 rounded-xl border-border shadow-sm bg-foreground text-background relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-lg font-black tracking-tight mb-2">{t('Queue Status')}</h3>
          <p className="text-sm text-muted-foreground/70 font-medium mb-8">{t('Live monitor of clinic traffic')}</p>
          
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">{t('Waiting')}</p>
                <p className="text-4xl font-black text-primary">{waitingCount}</p>
              </div>
              <Activity className="text-primary mb-2" size={32} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
