'use client'

import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import SettingsHero from '@/components/dashboard/settings/SettingsHero'
import GeneralPreferences from '@/components/dashboard/settings/GeneralPreferences'
import ThemePicker from '@/components/dashboard/settings/ThemePicker'
import SettingsModules from '@/components/dashboard/settings/SettingsModules'
import AccessControl from '@/components/dashboard/settings/AccessControl'

const AUTH_API = process.env.NEXT_PUBLIC_API_URL/auth/me'
const USERS_API = process.env.NEXT_PUBLIC_API_URL/users'
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

export default function SettingsPage() {
  const { t, lang, setLang } = useLanguage(); const { theme, setTheme } = useTheme(); const queryClient = useQueryClient()
  const [showAccess, setShowAccess] = useState(false)

  const { data: userProfile } = useQuery({ queryKey: ['me'], queryFn: () => fetch(AUTH_API, { headers: authHeader() }).then(r => r.json()) })
  const roleMatch = userProfile?.role?.toUpperCase() === 'ADMIN' || userProfile?.role === 'Super Admin'

  const { data: allUsers = [], isLoading: loadingUsers } = useQuery({ queryKey: ['users'], queryFn: () => fetch(USERS_API, { headers: authHeader() }).then(r => r.json()), enabled: roleMatch })

  const updatePicMutation = useMutation({
    mutationFn: (file: File) => { const fd = new FormData(); fd.append('file', file); return fetch(`${USERS_API}/profile-pic`, { method: 'POST', headers: { Authorization: `Bearer ${getToken()}` }, body: fd }) },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['me'] }); toast.success('Profile picture updated!'); window.dispatchEvent(new Event('profileUpdated')) }
  })

  const permMutation = useMutation({
    mutationFn: ({ id, permissions }: { id: string, permissions: string[] }) => fetch(`${USERS_API}/${id}/permissions`, { method: 'POST', headers: authHeader(), body: JSON.stringify({ permissions }) }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['users'] }); toast.success('Permissions updated') }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => fetch(`${USERS_API}/${id}`, { method: 'DELETE', headers: authHeader() }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['users'] }); toast.success('User removed') }
  })

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h1 className="text-4xl font-black tracking-tighter">{t('System Settings')}</h1><p className="text-muted-foreground font-medium text-lg mt-1">{t('Configure your clinical environment and user preferences')}</p></div>
        <Button className="h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-black shadow-xl shadow-primary/20"><Sparkles size={18} className="mr-2" /> {t('Save Changes')}</Button>
      </div>
      <SettingsHero user={userProfile} isUploading={updatePicMutation.isPending} onFileSelect={(f) => updatePicMutation.mutate(f)} />
      <GeneralPreferences user={userProfile} lang={lang} setLang={setLang} />
      <ThemePicker current={theme} onSelect={(id) => setTheme(id as any)} />
      <div><h3 className="text-xl font-black text-card-foreground tracking-tight mb-6">{t('Settings Modules')}</h3><SettingsModules roleMatch={roleMatch} showAccess={showAccess} onToggleAccess={() => setShowAccess(!showAccess)} /></div>
      <AccessControl show={roleMatch && showAccess} users={allUsers} isLoading={loadingUsers} onDelete={(id, name) => confirm(t(`Are you sure you want to delete ${name}?`)) && deleteMutation.mutate(id)} onUpdatePerm={(id, curr, p) => { const updated = curr.includes(p) ? curr.filter(x => x !== p) : [...curr, p]; if (updated.length > 0 && !updated.includes('READ')) updated.push('READ'); permMutation.mutate({ id, permissions: updated }) }} />
    </div>
  )
}
