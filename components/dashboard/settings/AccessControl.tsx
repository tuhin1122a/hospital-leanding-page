'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Search, Trash2, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/LanguageContext'

interface AccessControlProps {
  show: boolean
  users: any[]
  onUpdatePerm: (id: string, current: string[], perm: string) => void
  onDelete: (id: string, name: string) => void
  isLoading: boolean
}

export default function AccessControl({ show, users, onUpdatePerm, onDelete, isLoading }: AccessControlProps) {
  const { t } = useLanguage(); const [search, setSearch] = useState('')

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm mt-8">
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4"><div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-xl shadow-indigo-500/5"><ShieldCheck size={28} /></div><div><h3 className="text-2xl font-black text-card-foreground tracking-tighter">{t('Staff Access Control')}</h3><p className="text-sm font-medium text-muted-foreground">{t('Manage granular permissions for all users')}</p></div></div>
              <div className="relative w-full md:w-80"><Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/60" /><input type="text" placeholder={t('Search staff...')} value={search} onChange={e => setSearch(e.target.value)} className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted border border-border outline-none font-bold text-sm" /></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-border/50 text-left">{['User', 'Role', 'Permissions', 'Action'].map(h => <th key={h} className={`pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground ${h === 'Permissions' ? 'text-center' : h === 'Action' ? 'text-right' : ''}`}>{t(h)}</th>)}</tr></thead>
                <tbody className="divide-y divide-border/30">
                  {users.filter(u => u.name?.toLowerCase().includes(search.toLowerCase())).map((u) => (
                    <tr key={u.id} className="group hover:bg-muted/30 transition-colors">
                      <td className="py-5 px-2"><div className="flex items-center gap-3"><img src={u.profilePic || "https://i.pravatar.cc/150?u="+u.id} className="w-10 h-10 rounded-xl object-cover shadow-sm" /><div><p className="text-sm font-black text-card-foreground leading-none">{u.name}</p><p className="text-[10px] font-bold text-muted-foreground mt-1 lowercase">{u.email}</p></div></div></td>
                      <td className="py-5 px-2"><Badge variant="outline" className="bg-muted border-border text-primary font-black text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full">{t(u.role)}</Badge></td>
                      <td className="py-5 px-2"><div className="flex items-center justify-center gap-4">{['READ', 'EDIT', 'DELETE'].map(p => { const has = (u.permissions || []).includes(p); return <button key={p} onClick={() => onUpdatePerm(u.id, u.permissions || [], p)} className="flex flex-col items-center gap-1.5 transition-all group/perm"><span className={`text-[12px] font-black uppercase tracking-wider transition-colors ${has ? 'text-primary' : 'text-zinc-500 group-hover/perm:text-zinc-800'}`}>{t(p)}</span><div className={`w-14 h-2.5 rounded-full transition-all ${has ? 'bg-primary shadow-[0_0_12px_rgba(var(--primary),0.6)]' : 'bg-muted-foreground/30'}`} /></button> })}</div></td>
                      <td className="py-5 px-2 text-right"><div className="flex items-center justify-end gap-2"><button onClick={() => onDelete(u.id, u.name)} className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button><button className="p-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-border transition-all"><ChevronRight size={16} /></button></div></td>
                    </tr>
                  ))}
                  {users.length === 0 && !isLoading && <tr><td colSpan={4} className="py-20 text-center text-muted-foreground font-bold italic">{t('No users found')}</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
