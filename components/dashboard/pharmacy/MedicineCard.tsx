'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Pill } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/LanguageContext'

interface MedicineCardProps {
  item: any
  index: number
}

export default function MedicineCard({ item, index }: MedicineCardProps) {
  const { t } = useLanguage()

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="p-6 rounded-xl border border-border hover:border-primary/20 hover:bg-primary/[0.01] transition-all group cursor-pointer shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all"><Pill size={24} /></div>
        <Badge className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-none ${item.status === 'In Stock' ? 'bg-emerald-500 text-background' : item.status === 'Low Stock' ? 'bg-amber-500 text-background' : 'bg-red-500 text-background'}`}>{item.status}</Badge>
      </div>
      <div className="space-y-4">
        <div><h4 className="text-lg font-black text-card-foreground">{item.name}</h4><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">{item.category} • {item.id}</p></div>
        <div className="flex items-center justify-between">
          <div><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 leading-none mb-1">{t('Stock')}</p><p className="text-xl font-black text-card-foreground tracking-tight">{item.stock} Units</p></div>
          <div className="text-right"><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 leading-none mb-1">{t('Price')}</p><p className="text-xl font-black text-primary tracking-tight">{item.price}</p></div>
        </div>
        <div className="pt-6 border-t border-border/50 flex items-center justify-between"><span className="text-xs font-bold text-muted-foreground/70">{t('Expire')}: {item.expiry}</span><button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">{t('Edit Details')}</button></div>
      </div>
    </motion.div>
  )
}
