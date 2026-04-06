'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      // 1. Check Cookies (via document.cookie)
      const cookies = document.cookie.split('; ')
      const accessTokenRow = cookies.find(row => row.startsWith('accessToken='))
      const tokenValue = accessTokenRow ? accessTokenRow.split('=')[1] : null

      if (!tokenValue || tokenValue.length < 2) {
        window.location.href = '/login'
        return
      }
      setIsAuthorized(true)
    }

    checkAuth()
    // Optional: listen for storage events to handle logout in another tab
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [router])

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
