'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Check, CreditCard, UserPlus, UserMinus, Calendar, Trash2, CheckCircle, Info, Activity } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface NotificationItemProps {
  notification: any
  index: number
  onMarkRead: (id: string, e: React.MouseEvent) => void
  onClick: () => void
}

export default function NotificationItem({ notification, index, onMarkRead, onClick }: NotificationItemProps) {
  const { t } = useLanguage()

  const getStyles = (n: any) => {
    const content = (n.title + ' ' + n.message).toLowerCase()
    if (content.includes('payment') || content.includes('paid')) return { icon: <CreditCard size={20} />, bg: 'bg-emerald-500/10 text-emerald-500', border: 'border-emerald-500/20' }
    if (content.includes('admit')) return { icon: <UserPlus size={20} />, bg: 'bg-blue-500/10 text-blue-500', border: 'border-blue-500/20' }
    if (content.includes('release')) return { icon: <UserMinus size={20} />, bg: 'bg-indigo-500/10 text-indigo-500', border: 'border-indigo-500/20' }
    if (content.includes('appointment')) return { icon: <Calendar size={20} />, bg: 'bg-purple-500/10 text-purple-500', border: 'border-purple-500/20' }
    if (content.includes('delete')) return { icon: <Trash2 size={20} />, bg: 'bg-red-500/10 text-red-500', border: 'border-red-500/20' }
    return { icon: <Activity size={20} />, bg: 'bg-primary/10 text-primary', border: 'border-primary/20' }
  }

  const styles = getStyles(notification)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} onClick={onClick} className={`group bg-card border rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-5 transition-all cursor-pointer shadow-sm hover:shadow-md ${!notification.read ? 'border-primary/40 bg-primary/[0.03]' : 'border-border/60 hover:border-border'}`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${styles.bg} ${styles.border}`}>{styles.icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1.5 align-middle">
          <h4 className={`text-base md:text-lg font-black tracking-tight ${!notification.read ? 'text-primary' : 'text-card-foreground'}`}>{t(notification.title)}</h4>
          {!notification.read && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">{t('New')}</span>}
        </div>
        <p className="text-sm font-medium text-muted-foreground leading-relaxed">{t(notification.message)}</p>
      </div>
      <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-4 md:pt-0 border-t border-border/50 md:border-t-0 mt-2 md:mt-0">
        <span className="text-xs font-bold text-muted-foreground/70 flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-lg border border-border/50"><Clock size={12} />{new Date(notification.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        {!notification.read && <button onClick={(e) => onMarkRead(notification.id, e)} className="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center gap-2"><Check size={14} />{t('Mark Read')}</button>}
      </div>
    </motion.div>
  )
}
