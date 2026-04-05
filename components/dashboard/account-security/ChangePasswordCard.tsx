'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, CheckCircle, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

const API = 'process.env.NEXT_PUBLIC_API_URL'
function getToken() { return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '' }
function authHeader() { return { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' } }

export default function ChangePasswordCard() {
  const { t } = useLanguage()
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [changingPw, setChangingPw] = useState(false)

  const strength = (() => {
    if (!newPw) return null
    if (newPw.length < 6) return { label: 'Weak', color: 'bg-red-500', w: 'w-1/4', text: 'text-red-500' }
    if (newPw.length < 10) return { label: 'Fair', color: 'bg-amber-500', w: 'w-2/4', text: 'text-amber-500' }
    if (newPw.length < 14) return { label: 'Good', color: 'bg-blue-500', w: 'w-3/4', text: 'text-blue-500' }
    return { label: 'Strong', color: 'bg-emerald-500', w: 'w-full', text: 'text-emerald-500' }
  })()

  const handleChangePassword = async () => {
    if (!currentPw || !newPw || !confirmPw) return toast.error(t('Please fill all fields'))
    if (newPw !== confirmPw) return toast.error(t('Passwords do not match'))
    if (newPw.length < 8) return toast.error(t('Minimum 8 characters required'))
    setChangingPw(true)
    const tid = toast.loading(t('Updating password...'))
    try {
      const res = await fetch(`${API}/users/change-password`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed')
      toast.success(t('Password updated successfully!'), { id: tid })
      setCurrentPw(''); setNewPw(''); setConfirmPw('')
    } catch (e: any) {
      toast.error(e.message, { id: tid })
    } finally {
      setChangingPw(false)
    }
  }

  const fields = [
    { label: 'Current Password', value: currentPw, set: setCurrentPw, show: showCurrent, setShow: setShowCurrent, placeholder: '••••••••' },
    { label: 'New Password', value: newPw, set: setNewPw, show: showNew, setShow: setShowNew, placeholder: '••••••••', strength: true },
    { label: 'Confirm New Password', value: confirmPw, set: setConfirmPw, show: showConfirm, setShow: setShowConfirm, placeholder: '••••••••', confirm: true },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      className="bg-card rounded-[2.5rem] border border-border p-8 space-y-5"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Lock size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-black text-card-foreground">{t('Change Password')}</h3>
          <p className="text-xs text-muted-foreground font-medium">{t('Update your account password')}</p>
        </div>
      </div>

      {fields.map((field, i) => (
        <div key={i} className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t(field.label)}</label>
          <div className="relative">
            <input
              type={field.show ? 'text' : 'password'}
              value={field.value}
              onChange={e => field.set(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl bg-muted border border-border outline-none font-bold text-card-foreground text-sm pr-12 focus:ring-2 focus:ring-primary/20 transition-all font-mono"
              placeholder={field.placeholder}
            />
            <button type="button" onClick={() => field.setShow(!field.show)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors">
              {field.show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            {field.confirm && confirmPw && newPw && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                {confirmPw === newPw ? <CheckCircle size={16} className="text-emerald-500" /> : <AlertTriangle size={16} className="text-red-500" />}
              </div>
            )}
          </div>
          {field.strength && strength && (
            <div className="space-y-1 pt-1">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.w}`} />
              </div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${strength.text}`}>{t(strength.label)}</p>
            </div>
          )}
        </div>
      ))}

      <Button onClick={handleChangePassword} disabled={changingPw}
        className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-lg shadow-primary/20">
        {changingPw ? t('Updating...') : t('Update Password')}
      </Button>
    </motion.div>
  )
}
