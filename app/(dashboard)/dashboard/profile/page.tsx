'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ProfileHero from '@/components/dashboard/profile/ProfileHero'
import ProfileStats from '@/components/dashboard/profile/ProfileStats'
import AccountDetails from '@/components/dashboard/profile/AccountDetails'
import ActivityOverview from '@/components/dashboard/profile/ActivityOverview'

const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || ''
const authHeader = () => ({ Authorization: `Bearer ${getToken()}` })

export default function ProfilePage() {
  const { t } = useLanguage(); const queryClient = useQueryClient()
  const [isUploading, setIsUploading] = useState(false)

  const { data: user } = useQuery({ queryKey: ['me'], queryFn: () => fetch(process.env.NEXT_PUBLIC_API_URL/auth/me', { headers: authHeader() }).then(r => r.json()) })

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const fd = new FormData(); fd.append('file', file)
      return fetch(process.env.NEXT_PUBLIC_API_URL/users/profile-pic', { method: 'POST', headers: authHeader(), body: fd }).then(r => r.json())
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['me'] }); window.dispatchEvent(new Event('profileUpdated')); toast.success('Profile picture updated!') },
    onMutate: () => setIsUploading(true),
    onSettled: () => setIsUploading(false)
  })

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div><h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('View Profile')}</h1><p className="text-muted-foreground font-medium text-lg mt-1">{t('Your personal account information')}</p></div>
      <ProfileHero user={user} isUploading={isUploading} onFileSelect={(file) => uploadMutation.mutate(file)} />
      <ProfileStats user={user} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><AccountDetails user={user} /><ActivityOverview /></div>
    </div>
  )
}
