'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Trash2, Phone, Calendar, MoreVertical } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'

interface StaffGridProps {
  staff: any[]
  onUpdatePerm: (id: string, current: string[], perm: string) => void
  onDelete: (id: string, name: string) => void
}

export default function StaffGrid({ staff, onUpdatePerm, onDelete }: StaffGridProps) {
  const { t } = useLanguage()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {staff.map((member, i) => (
        <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <Card className="p-0 border-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 relative group bg-card">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  {member.profilePic ? <img src={member.profilePic} alt="" className="w-16 h-16 rounded-2xl object-cover border-2 border-card shadow-lg" /> : <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border-2 border-card shadow-lg"><User size={30} /></div>}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card bg-emerald-500" />
                </div>
                <div className="flex flex-col items-end gap-2"><Badge variant="outline" className="bg-muted border-border text-primary font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">{t(member.role)}</Badge><span className="text-[10px] font-black text-muted-foreground/70 uppercase tracking-widest">ID: {member.id.slice(-6)}</span></div>
              </div>
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-black text-card-foreground tracking-tight leading-none">{member.name}</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><Mail size={14} className="text-primary shrink-0" /><span className="truncate">{member.email}</span></div>
                  <div className="flex items-center gap-4 py-2 border-t border-border/50 mt-2">
                    {['READ', 'EDIT', 'DELETE'].map(p => {
                      const has = (member.permissions || []).includes(p)
                      return <button key={p} onClick={() => onUpdatePerm(member.id, member.permissions || [], p)} className={`flex flex-col items-center gap-1 transition-all ${has ? 'text-primary' : 'text-muted-foreground/30 hover:text-muted-foreground/60'}`}><span className="text-[9px] font-black">{t(p)}</span><div className={`w-6 h-1 rounded-full ${has ? 'bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]' : 'bg-muted'}`} /></button>
                    })}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-2xl p-4"><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">{t('Joined')}</p><p className="text-xs font-black text-card-foreground">{new Date(member.createdAt).toLocaleDateString()}</p></div>
                <div className="bg-muted/50 rounded-2xl p-4 flex items-center justify-center"><button onClick={() => onDelete(member.id, member.name)} className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 font-black text-xs uppercase tracking-widest"><Trash2 size={14} /> {t('Delete')}</button></div>
              </div>
            </div>
            <div className="px-8 pb-8 pt-4 flex items-center gap-3 border-t border-border/50 bg-muted/30">
              <button className="flex-grow h-12 rounded-xl bg-card border border-border hover:bg-muted flex items-center justify-center text-muted-foreground transition-all font-bold text-sm gap-2"><Phone size={16} /> {t('Call')}</button>
              <button className="flex-grow h-12 rounded-xl bg-card border border-border hover:bg-muted flex items-center justify-center text-muted-foreground transition-all font-bold text-sm gap-2"><Calendar size={16} /> {t('Shifts')}</button>
              <button className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground/70 hover:text-muted-foreground hover:bg-muted transition-all"><MoreVertical size={18} /></button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
