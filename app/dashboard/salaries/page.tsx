'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useLanguage } from '@/contexts/LanguageContext'
import { DollarSign, User, Calendar, CreditCard, Filter, Download, ArrowUpRight, TrendingUp, Search, Info } from 'lucide-react'

export default function SalariesPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [role, setRole] = useState<string | null>(null)
  const [staff, setStaff] = useState<any[]>([])
  const [history, setHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Auth helper
  const getToken = () => localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
  const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const token = getToken()
      if (!token) return

      const meRes = await fetch('http://localhost:5000/auth/me', { headers: authHeader() })
      if (!meRes.ok) return
      const me = await meRes.json()
      setRole(me.role)

      if (me.role === 'ADMIN') {
        const staffRes = await fetch('http://localhost:5000/salary/staff', { headers: authHeader() })
        if (staffRes.ok) setStaff(await staffRes.json())
        
        const historyRes = await fetch('http://localhost:5000/salary/history', { headers: authHeader() })
        if (historyRes.ok) setHistory(await historyRes.json())
      } else {
        const myRes = await fetch('http://localhost:5000/salary/my', { headers: authHeader() })
        if (myRes.ok) setHistory(await myRes.json())
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaySalary = async (userId: string, amount: number) => {
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    
    try {
      const res = await fetch('http://localhost:5000/salary/pay', {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ userId, amount, month, year, note: 'Monthly Salary' })
      })
      if (res.ok) {
        toast({ title: t('Success'), description: t('Salary paid successfully') })
        fetchData()
      } else {
        const err = await res.json()
        toast({ title: t('Error'), description: err.message || t('Payment failed'), variant: 'destructive' })
      }
    } catch (err) {
      toast({ title: t('Error'), description: t('Server error'), variant: 'destructive' })
    }
  }

  const handleSetBaseSalary = async (userId: string, amount: number) => {
    try {
      const res = await fetch('http://localhost:5000/salary/set-base', {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ userId, amount })
      })
      if (res.ok) {
        toast({ title: t('Success'), description: t('Base salary updated') })
        fetchData()
      }
    } catch (err) {}
  }

  const filteredStaff = staff.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.role.toLowerCase().includes(searchQuery.toLowerCase()))

  if (isLoading) return <div className="flex items-center justify-center h-screen text-muted-foreground font-black animate-pulse">{t('Loading Payroll...')}</div>

  return (
    <div className="space-y-10 p-4 max-w-[1600px] mx-auto min-h-screen">
       {/* Page Header */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Salary Management')}</h1>
          <p className="text-muted-foreground font-medium text-lg">{t('Payroll and staff compensation records')}</p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-border/50 font-bold gap-2">
            <Download size={16} /> {t('Export CSV')}
          </Button>
          {role === 'ADMIN' && (
            <Button className="rounded-xl bg-primary shadow-lg shadow-primary/20 font-black gap-2">
              <TrendingUp size={16} /> {t('Bonus Pool')}
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {role === 'ADMIN' ? (
          <motion.div 
            key="admin" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10"
          >
            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <Card className="p-8 rounded-2xl border border-border shadow-sm flex items-center gap-6 relative overflow-hidden group">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0 transform group-hover:scale-110 transition-transform">
                    <DollarSign size={28} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{t('Total Compensation')}</p>
                     <h3 className="text-3xl font-black text-card-foreground tracking-tighter">
                       ${history.reduce((acc, h) => acc + h.amount, 0).toLocaleString()}
                     </h3>
                  </div>
                  <div className="absolute top-4 right-4 text-emerald-500/20"><ArrowUpRight size={32} /></div>
               </Card>
               <Card className="p-8 rounded-2xl border border-border shadow-sm flex items-center gap-6">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 shrink-0">
                    <CreditCard size={28} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{t('Monthly Payout')}</p>
                     <h3 className="text-3xl font-black text-card-foreground tracking-tighter">
                       ${history.filter(h => h.month === (new Date().getMonth() + 1)).reduce((acc, h) => acc + h.amount, 0).toLocaleString()}
                     </h3>
                  </div>
               </Card>
               <Card className="p-8 rounded-2xl border border-border shadow-sm flex items-center gap-6">
                  <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 shrink-0">
                    <User size={28} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{t('Managed Employees')}</p>
                     <h3 className="text-3xl font-black text-card-foreground tracking-tighter">{staff.length}</h3>
                  </div>
               </Card>
            </div>

            {/* Management Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
               {/* Staff List Table */}
               <Card className="xl:col-span-2 rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col">
                  <div className="p-6 border-b border-border bg-card/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <h2 className="text-xl font-black tracking-tight">{t('Employee Payroll List')}</h2>
                     <div className="relative group min-w-[240px]">
                        <Search className="absolute left-3.5 top-3 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                        <Input 
                           placeholder={t('Search names or roles...')}
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="rounded-xl pl-10 h-10 border-border/50 bg-muted/30 focus:bg-card transition-all"
                        />
                     </div>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                       <TableHeader className="bg-muted/50 border-b border-border/50">
                          <TableRow className="hover:bg-transparent border-none">
                             <TableHead className="font-black text-[10px] uppercase tracking-widest px-6 h-12">{t('Employee')}</TableHead>
                             <TableHead className="font-black text-[10px] uppercase tracking-widest px-6 h-12">{t('Position')}</TableHead>
                             <TableHead className="font-black text-[10px] uppercase tracking-widest px-6 h-12 text-center">{t('Current Base')}</TableHead>
                             <TableHead className="text-right font-black text-[10px] uppercase tracking-widest px-6 h-12">{t('Actions')}</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {filteredStaff.length === 0 ? (
                            <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground">
                              <Info size={32} className="mx-auto mb-2 opacity-20" />
                              <p className="font-bold text-sm tracking-tight">{t('No employees matching your search')}</p>
                            </TableCell></TableRow>
                          ) : filteredStaff.map((s) => (
                            <TableRow key={s.id} className="hover:bg-muted/20 border-border/40 transition-colors">
                               <TableCell className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                     <div className="w-12 h-12 rounded-xl bg-zinc-100 overflow-hidden shrink-0 border border-border shadow-sm">
                                        {s.profilePic ? <img src={s.profilePic} className="w-full h-full object-cover" /> : <User size={20} className="m-auto mt-3 text-zinc-300" />}
                                     </div>
                                     <div>
                                        <p className="font-bold text-sm tracking-tight">{s.name}</p>
                                        <p className="text-[10px] text-muted-foreground font-semibold">{s.email}</p>
                                     </div>
                                  </div>
                               </TableCell>
                               <TableCell className="px-6">
                                  <Badge variant="outline" className="rounded-lg font-black text-[9px] tracking-widest bg-zinc-100/50 uppercase py-1 border-border/50 text-muted-foreground/80">
                                     {t(s.role)}
                                  </Badge>
                               </TableCell>
                               <TableCell className="px-6 text-center font-black text-base text-card-foreground">
                                 ${s.baseSalary?.toLocaleString() || 0}
                               </TableCell>
                               <TableCell className="px-6 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                     <Dialog>
                                        <DialogTrigger asChild>
                                           <Button variant="ghost" size="sm" className="rounded-xl font-bold text-xs h-9 px-4 hover:bg-zinc-100 transition-all">{t('Edit')}</Button>
                                        </DialogTrigger>
                                        <DialogContent className="rounded-2xl border-none shadow-2xl p-8 transform-gpu">
                                           <DialogHeader>
                                              <DialogTitle className="text-2xl font-black tracking-tighter">{t('Adjust Compensation')}</DialogTitle>
                                              <p className="text-sm text-muted-foreground font-medium">{t(`Set the monthly base salary for ${s.name}`)}</p>
                                           </DialogHeader>
                                           <div className="space-y-6 py-6">
                                              <div className="space-y-3">
                                                <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">{t('Monthly Amount ($)')}</Label>
                                                <div className="relative group">
                                                   <DollarSign size={18} className="absolute left-4 top-3 text-emerald-500 transition-transform group-focus-within:scale-110" />
                                                   <Input 
                                                      type="number" 
                                                      defaultValue={s.baseSalary} 
                                                      onBlur={(e) => handleSetBaseSalary(s.id, parseFloat(e.target.value))}
                                                      className="rounded-xl pl-10 h-12 bg-muted/40 border-none font-bold text-lg"
                                                   />
                                                </div>
                                              </div>
                                           </div>
                                           <DialogFooter>
                                              <Button className="w-full rounded-xl bg-primary font-black shadow-lg shadow-primary/20 h-12">{t('Save Changes')}</Button>
                                           </DialogFooter>
                                        </DialogContent>
                                     </Dialog>
                                     <Button 
                                        onClick={() => handlePaySalary(s.id, s.baseSalary)}
                                        disabled={!s.baseSalary}
                                        className="h-9 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 px-4 transition-all hover:scale-105 active:scale-95"
                                     >
                                        {t('Pay Now')}
                                     </Button>
                                  </div>
                               </TableCell>
                            </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                  </div>
               </Card>

               {/* Payment History Side Panel */}
               <Card className="rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col h-full bg-slate-50/50">
                  <div className="p-6 border-b border-border bg-card">
                     <h2 className="text-xl font-black tracking-tight">{t('Recent Payouts')}</h2>
                     <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">{t('Live record log')}</p>
                  </div>
                  <div className="flex-grow overflow-y-auto max-h-[680px] custom-scrollbar p-2">
                     {history.length === 0 ? (
                        <div className="text-center py-20 opacity-30 font-black uppercase text-[10px] tracking-widest">{t('No history')}</div>
                     ) : history.map((h, i) => (
                       <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i} 
                        className="p-4 mb-2 bg-card rounded-xl border border-border shadow-sm flex items-center justify-between hover:shadow-md transition-all group"
                       >
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:rotate-12 transition-transform">
                                <DollarSign size={18} />
                             </div>
                             <div>
                                <p className="font-bold text-xs truncate max-w-[120px]">{h.user?.name}</p>
                                <p className="text-[9px] text-muted-foreground font-black uppercase">{t('Month')}: {h.month}/{h.year}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="font-black text-sm text-emerald-600">+${h.amount.toLocaleString()}</p>
                             <p className="text-[9px] text-muted-foreground font-semibold uppercase">{new Date(h.paymentDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
                          </div>
                       </motion.div>
                     ))}
                  </div>
               </Card>
            </div>
          </motion.div>
        ) : (
          /* Staff Personal Payroll View */
          <motion.div 
            key="staff"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10"
          >
             <Card className="p-10 rounded-2xl border border-border shadow-xl flex items-center gap-8 relative overflow-hidden group col-span-1 bg-gradient-to-br from-primary to-primary-foreground text-background">
                <div className="w-20 h-20 bg-background/20 rounded-3xl flex items-center justify-center text-background shrink-0 transform group-hover:rotate-6 transition-transform shadow-inner">
                  <CreditCard size={36} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{t('Lifetime Earnings')}</p>
                   <h3 className="text-5xl font-black tracking-tighter">
                     ${history.reduce((acc, h) => acc + h.amount, 0).toLocaleString()}
                   </h3>
                </div>
                <div className="absolute -bottom-6 -right-6 text-background/10 scale-150 rotate-12"><TrendingUp size={120} /></div>
             </Card>

             <Card className="lg:col-span-2 rounded-2xl border border-border overflow-hidden shadow-md flex flex-col">
                <div className="p-8 border-b border-border bg-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div>
                      <h2 className="text-2xl font-black tracking-tighter">{t('Personal Payment History')}</h2>
                      <p className="text-sm text-muted-foreground font-medium">{t('Verified transaction records distributed by administration.')}</p>
                   </div>
                   <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-xl px-4 py-2 font-black text-xs uppercase tracking-tighter">
                     <TrendingUp size={14} className="mr-2" /> {t('Status: Verified')}
                   </Badge>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                       <TableHeader className="bg-muted/30 border-b border-border/50">
                          <TableRow className="hover:bg-transparent">
                             <TableHead className="font-black text-[11px] uppercase tracking-widest px-8 h-14 text-muted-foreground">{t('Payment Period')}</TableHead>
                             <TableHead className="font-black text-[11px] uppercase tracking-widest px-8 h-14 text-muted-foreground">{t('Compensation')}</TableHead>
                             <TableHead className="font-black text-[11px] uppercase tracking-widest px-8 h-14 text-muted-foreground">{t('Received On')}</TableHead>
                             <TableHead className="font-black text-[11px] uppercase tracking-widest px-8 h-14 text-muted-foreground text-right">{t('Transaction')}</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                         {history.length === 0 ? (
                           <TableRow>
                             <TableCell colSpan={4} className="text-center py-20 text-muted-foreground font-bold tracking-tight bg-slate-50/50 italic">
                                {t('Your earnings will appear here once distributed.')}
                             </TableCell>
                           </TableRow>
                         ) : history.map((h, i) => (
                           <TableRow key={i} className="hover:bg-muted/20 border-border/40 transition-colors">
                              <TableCell className="px-8 py-6">
                                 <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <p className="font-black text-lg tracking-tighter">{t('Month')} {h.month}, {h.year}</p>
                                 </div>
                              </TableCell>
                              <TableCell className="px-8 font-black text-xl text-emerald-600 tracking-tighter">${h.amount.toLocaleString()}</TableCell>
                              <TableCell className="px-8 text-sm font-bold text-muted-foreground">{new Date(h.paymentDate).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                              <TableCell className="px-8 text-right">
                                 <Badge className="bg-emerald-600 text-white rounded-lg px-3 py-1 font-black text-[10px] uppercase tracking-widest shadow-md shadow-emerald-500/20">
                                    {t('Completed')}
                                 </Badge>
                              </TableCell>
                           </TableRow>
                         ))}
                       </TableBody>
                    </Table>
                </div>
             </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
