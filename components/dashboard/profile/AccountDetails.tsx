'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Shield, Edit2, Check, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

interface AccountDetailsProps { user: any }

export default function AccountDetails({ user }: AccountDetailsProps) {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' })

  const handleSave = async () => {
    const tid = toast.loading('Saving...')
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editData)
      })
      if (!res.ok) throw new Error('Failed to update')
      toast.success('Profile updated successfully!', { id: tid })
      setIsEditing(false)
      window.dispatchEvent(new Event('profileUpdated'))
    } catch (e: any) {
      toast.error('Could not save details.', { id: tid })
      setIsEditing(false)
    }
  }

  const items = [
    { label: t('Full Name'), value: user?.name || '—', icon: User },
    { label: t('Email Address'), value: user?.email || '—', icon: Mail },
    { label: t('Access Level'), value: user?.role || '—', icon: Shield },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-8 space-y-5 shadow-sm relative">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center"><User size={18} className="text-primary" /></div>
          <h3 className="font-black text-card-foreground">{t('Account Details')}</h3>
        </div>
        {!isEditing ? (
          <button onClick={() => { setIsEditing(true); setEditData({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' }) }} className="p-2 rounded-xl bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all">
            <Edit2 size={16} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(false)} className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all"><X size={16} /></button>
            <button onClick={handleSave} className="p-2 rounded-xl bg-emerald-50 text-emerald-500 hover:bg-emerald-100 transition-all"><Check size={16} /></button>
          </div>
        )}
      </div>

      {!isEditing ? (
        items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-transparent hover:border-border transition-all">
            <item.icon size={16} className="text-muted-foreground shrink-0" />
            <div><p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</p><p className="font-bold text-card-foreground text-sm mt-0.5">{item.value}</p></div>
          </div>
        ))
      ) : (
        <div className="space-y-4 pt-2">
           <div className="space-y-1">
             <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
             <input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="w-full h-12 px-4 rounded-xl bg-muted border border-border outline-none focus:border-primary font-bold text-sm" />
           </div>
           <div className="space-y-1">
             <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</label>
             <input type="email" value={editData.email} onChange={e => setEditData({...editData, email: e.target.value})} className="w-full h-12 px-4 rounded-xl bg-muted border border-border outline-none focus:border-primary font-bold text-sm" />
           </div>
        </div>
      )}
    </motion.div>
  )
}
