'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import SecurityHeader from '@/components/dashboard/account-security/SecurityHeader'
import ChangePasswordCard from '@/components/dashboard/account-security/ChangePasswordCard'
import TwoFactorCard from '@/components/dashboard/account-security/TwoFactorCard'
import ActiveDevicesCard from '@/components/dashboard/account-security/ActiveDevicesCard'
import LoginHistoryCard from '@/components/dashboard/account-security/LoginHistoryCard'
import TwoFaModal from '@/components/dashboard/account-security/TwoFaModal'
import { useLanguage } from '@/contexts/LanguageContext'

import { getAccessToken } from '@/lib/utils'

const API = process.env.NEXT_PUBLIC_API_URL
const authHeader = () => ({ 
  Authorization: `Bearer ${getAccessToken()}`, 
  'Content-Type': 'application/json' 
})

export default function AccountSecurityPage() {
  const { t } = useLanguage()
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secret2fa, setSecret2fa] = useState('')
  const [totpToken, setTotpToken] = useState('')
  const [loading2fa, setLoading2fa] = useState(false)
  const [show2faSetup, setShow2faSetup] = useState(false)

  // React Query for profile
  const { data: userProfile, refetch: refetchProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetch(`${API}/auth/me`, { headers: authHeader() }).then(r => r.json()),
  })

  // React Query for login history
  const { data: loginHistory = [], isLoading: loadingHistory, refetch: refetchHistory } = useQuery({
    queryKey: ['login-history'],
    queryFn: () => fetch(`${API}/users/login-history`, { headers: authHeader() }).then(r => r.json()).then(d => Array.isArray(d) ? d : []),
  })

  const handle2FAGenerate = async () => {
    setLoading2fa(true)
    try {
      const res = await fetch(`${API}/users/2fa/generate`, { headers: authHeader() })
      const data = await res.json()
      setQrCode(data.qrCode); setSecret2fa(data.secret); setShow2faSetup(true)
    } catch {
      toast.error(t('Failed to generate 2FA secret'))
    } finally {
      setLoading2fa(false)
    }
  }

  const handle2FAVerify = async () => {
    if (!totpToken || totpToken.length < 6) return toast.error(t('Enter 6-digit code'))
    setLoading2fa(true)
    const tid = toast.loading(t('Verifying...'))
    try {
      const res = await fetch(`${API}/users/2fa/verify`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ token: totpToken }),
      })
      if (!res.ok) throw new Error('Invalid code')
      toast.success(t('2FA Enabled!'), { id: tid })
      refetchProfile()
      setShow2faSetup(false); setQrCode(null); setTotpToken('')
    } catch (e: any) {
      toast.error(e.message, { id: tid })
    } finally {
      setLoading2fa(false)
    }
  }

  const handle2FADisable = async () => {
    setLoading2fa(true)
    const tid = toast.loading(t('Disabling 2FA...'))
    try {
      const res = await fetch(`${API}/users/2fa/disable`, { method: 'DELETE', headers: authHeader() })
      if (!res.ok) throw new Error('Failed')
      toast.success(t('2FA Disabled'), { id: tid })
      refetchProfile()
    } catch (e: any) {
      toast.error(e.message, { id: tid })
    } finally {
      setLoading2fa(false)
    }
  }

  const twoFaEnabled = userProfile?.twoFactorEnabled
  const activeDevices = loginHistory
    .filter((l: any) => l.success)
    .reduce((acc: any[], log: any) => {
      const key = `${log.browser}-${log.os}`
      if (!acc.find(d => d.key === key)) {
        acc.push({ key, browser: log.browser, os: log.os, device: log.device, ip: log.ip, lastSeen: log.createdAt })
      }
      return acc
    }, [])
    .slice(0, 4)

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      <SecurityHeader score={twoFaEnabled ? 95 : 72} twoFaEnabled={twoFaEnabled} sessionCount={activeDevices.length} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChangePasswordCard />
        <TwoFactorCard twoFaEnabled={twoFaEnabled} loading2fa={loading2fa} onGenerate={handle2FAGenerate} onDisable={handle2FADisable} />
      </div>

      <ActiveDevicesCard devices={activeDevices} />
      <LoginHistoryCard loginHistory={loginHistory} loadingHistory={loadingHistory} onRefresh={refetchHistory} />

      <TwoFaModal show={show2faSetup} qrCode={qrCode} secret={secret2fa} token={totpToken} loading={loading2fa} 
        onClose={() => setShow2faSetup(false)} onTokenChange={setTotpToken} onVerify={handle2FAVerify} />
    </div>
  )
}
