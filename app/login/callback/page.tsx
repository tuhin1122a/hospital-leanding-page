'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function GoogleCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')

    if (accessToken && refreshToken) {
      // Set tokens (matching the logic in login/page.tsx)
      localStorage.setItem('refreshToken', refreshToken)
      document.cookie = `accessToken=${accessToken}; path=/; max-age=${24 * 60 * 60}; SameSite=Lax`
      
      let redirectPath = '/dashboard'
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        if (payload.role === 'RECEPTIONIST') redirectPath = '/dashboard/appointments';
        else if (payload.role === 'DOCTOR') redirectPath = '/dashboard/patients';
      } catch (e) {}

      // Redirect to dashboard
      window.location.href = redirectPath
    } else {
      // Something went wrong, go back to login
      router.push('/login?error=google_auth_failed')
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className="w-12 h-12 text-[#1a4bde]" />
      </motion.div>
      <p className="mt-6 text-slate-500 font-bold tracking-tight">Completing secure login...</p>
    </div>
  )
}
