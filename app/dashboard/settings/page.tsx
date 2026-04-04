'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
    Bell,
    ChevronRight,
    Computer,
    CreditCard,
    Database,
    Shield,
    Zap
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'

export default function SettingsPage() {
  const { t, lang, setLang } = useLanguage()
  const { theme, setTheme } = useTheme()

  const sections = [
    { name: t('Appearance'), desc: t('Theme, typography, and layout settings'), icon: Computer, color: 'text-blue-500' },
    { name: t('Notifications'), desc: t('Email, SMS, and system alert preferences'), icon: Bell, color: 'text-purple-500' },
    { name: t('Integrations'), desc: t('Connect with third-party medical software'), icon: Zap, color: 'text-amber-500' },
    { name: t('Data Management'), desc: t('Backup, export, and regional storage config'), icon: Database, color: 'text-emerald-500' },
    { name: t('Billing Plan'), desc: t('SaaS subscription and payment history'), icon: CreditCard, color: 'text-pink-500' },
    { name: t('API Keys'), desc: t('Developer access and webhooks'), icon: Shield, color: 'text-primary' },
  ]
  const [userProfile, setUserProfile] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      fetch('http://localhost:5000/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setUserProfile(data))
      .catch(err => console.error(err))
    }
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const token = localStorage.getItem('accessToken')
    if (!token) return

    const formData = new FormData()
    formData.append('file', file)

    const uploadToast = toast.loading('Uploading profile picture...')
    try {
      const res = await fetch('http://localhost:5000/users/profile-pic', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })
      if (res.ok) {
        const updatedUser = await res.json()
        setUserProfile(updatedUser)
        toast.success("Profile picture updated successfully!", { id: uploadToast })
      } else {
        toast.error('Failed to update picture', { id: uploadToast })
      }
    } catch (err) {
      toast.error('Upload failed', { id: uploadToast })
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('System Settings')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Configure your clinical environment and user preferences')}</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-foreground text-background font-black shadow-xl">
           {t('Save Changes')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
         <div className="md:col-span-1 space-y-4">
            <h3 className="text-xl font-black text-card-foreground tracking-tight">{t('Main Profile')}</h3>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">{t('Changes made here will be visible to your entire medical unit.')}</p>
            
            <div className="pt-6">
               <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="w-32 h-32 rounded-[2.5rem] bg-secondary border-4 border-card shadow-xl flex items-center justify-center overflow-hidden relative group cursor-pointer"
               >
                  <img src={userProfile?.profilePic || "https://i.pravatar.cc/150?u=admin"} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                     <span className="text-background text-[10px] font-black uppercase tracking-widest">{t('Update')}</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="md:col-span-2 space-y-8 bg-card rounded-[3rem] border border-border p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">{t('Full Name')}</label>
                  <input 
                    type="text" 
                    value={userProfile?.name || ''}
                    readOnly
                    className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:bg-card outline-none transition-all font-bold text-card-foreground"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">{t('Email Address')}</label>
                  <input 
                    type="text" 
                    value={userProfile?.email || ''}
                    readOnly
                    className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:bg-card outline-none transition-all font-bold text-card-foreground"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">{t('Timezone')}</label>
                  <select className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:bg-card outline-none transition-all font-bold text-card-foreground">
                     <option>Dhaka (GMT+6)</option>
                     <option>London (GMT+0)</option>
                     <option>New York (GMT-5)</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">{t('Language')}</label>
                  <select 
                    value={lang} 
                    onChange={(e) => setLang(e.target.value as 'en' | 'bn')}
                    className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:bg-card outline-none transition-all font-bold text-card-foreground"
                  >
                     <option value="en">{t('English (US)')}</option>
                     <option value="bn">{t('Bengali')}</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">{t('Theme')}</label>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as any)}
                    className="w-full h-14 px-6 rounded-2xl bg-muted border border-border focus:bg-card outline-none transition-all font-bold text-card-foreground capitalize"
                  >
                     <option value="light">{t('Blue (Default)')}</option>
                     <option value="emerald">{t('Emerald Green')}</option>
                     <option value="rose">{t('Rose Pink')}</option>
                     <option value="amber">{t('Amber Orange')}</option>
                     <option value="dark">{t('Dark Mode')}</option>
                  </select>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {sections.map((section, i) => (
           <Card key={i} className="p-8 border-border rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="relative z-10">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-muted group-hover:bg-primary group-hover:text-background transition-all", section.color)}>
                    <section.icon size={22} />
                 </div>
                 <h4 className="text-xl font-black text-card-foreground tracking-tight mb-2">{section.name}</h4>
                 <p className="text-sm text-muted-foreground/70 font-medium leading-relaxed mb-6">{section.desc}</p>
                 <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary group-hover:gap-2 transition-all">
                    {t('Configure')} <ChevronRight size={14} />
                 </div>
              </div>
           </Card>
         ))}
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
