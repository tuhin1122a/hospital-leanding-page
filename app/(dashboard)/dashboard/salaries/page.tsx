'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useLanguage } from '@/contexts/LanguageContext'
import { Download, TrendingUp } from 'lucide-react'
import AdminSalaryStats from '@/components/dashboard/salaries/AdminSalaryStats'
import StaffPayrollTable from '@/components/dashboard/salaries/StaffPayrollTable'
import AdminPayoutHistory from '@/components/dashboard/salaries/AdminPayoutHistory'
import StaffSalaryView from '@/components/dashboard/salaries/StaffSalaryView'

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

export default function SalariesPage() {
  const { t } = useLanguage(); const { toast } = useToast(); const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState('')

  const { data: me } = useQuery({ queryKey: ['me'], queryFn: () => fetch(`${API}/auth/me`, { headers: authHeader() }).then(r => r.json()) })
  const role = me?.role

  const { data: staff = [], isLoading: loadingStaff } = useQuery({
    queryKey: ['staff-list'],
    queryFn: () => fetch(`${API}/salary/staff`, { headers: authHeader() }).then(r => r.json()),
    enabled: role === 'ADMIN'
  })

  const { data: history = [], isLoading: loadingHistory } = useQuery({
    queryKey: ['salary-history', role],
    queryFn: () => fetch(`${API}/salary/${role === 'ADMIN' ? 'history' : 'my'}`, { headers: authHeader() }).then(r => r.json()),
    enabled: !!role
  })

  const payMutation = useMutation({
    mutationFn: (body: any) => fetch(`${API}/salary/pay`, { method: 'POST', headers: authHeader(), body: JSON.stringify(body) }).then(r => r.ok ? r.json() : r.json().then(e => { throw e })),
    onSuccess: () => { toast({ title: t('Success'), description: t('Salary paid successfully') }); queryClient.invalidateQueries({ queryKey: ['salary-history'] }) },
    onError: (err: any) => toast({ title: t('Error'), description: err.message || t('Payment failed'), variant: 'destructive' })
  })

  const baseSalaryMutation = useMutation({
    mutationFn: (body: any) => fetch(`${API}/salary/set-base`, { method: 'POST', headers: authHeader(), body: JSON.stringify(body) }),
    onSuccess: () => { toast({ title: t('Success'), description: t('Base salary updated') }); queryClient.invalidateQueries({ queryKey: ['staff-list'] }) }
  })

  if (loadingStaff || loadingHistory) return <div className="flex items-center justify-center h-screen text-muted-foreground font-black animate-pulse">{t('Loading Payroll...')}</div>

  const filteredStaff = staff.filter((s: any) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.role.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-10 p-4 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Salary Management')}</h1>
          <p className="text-muted-foreground font-medium text-lg">{t('Payroll and staff compensation records')}</p>
        </motion.div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-border/50 font-bold gap-2"><Download size={16} /> {t('Export CSV')}</Button>
          {role === 'ADMIN' && <Button className="rounded-xl bg-primary shadow-lg shadow-primary/20 font-black gap-2"><TrendingUp size={16} /> {t('Bonus Pool')}</Button>}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {role === 'ADMIN' ? (
          <motion.div key="admin" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
            <AdminSalaryStats totalCompensation={history.reduce((a: any, b: any) => a + b.amount, 0)} monthlyPayout={history.filter((h: any) => h.month === (new Date().getMonth() + 1)).reduce((a: any, b: any) => a + b.amount, 0)} staffCount={staff.length} />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <StaffPayrollTable staff={filteredStaff} searchQuery={searchQuery} onSearchChange={setSearchQuery} onPay={(id, amount) => payMutation.mutate({ userId: id, amount, month: new Date().getMonth() + 1, year: new Date().getFullYear(), note: 'Monthly Salary' })} onSetBase={(id, amount) => baseSalaryMutation.mutate({ userId: id, amount })} />
              <AdminPayoutHistory history={history} />
            </div>
          </motion.div>
        ) : <StaffSalaryView history={history} />}
      </AnimatePresence>
    </div>
  )
}
