'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { History, Lock, ShieldAlert, ShieldCheck, Smartphone, Check, X, Clock, UserCheck } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const LOGS_API = 'http://localhost:5000/auth/logs' // Assuming this exists or will
const APPROVALS_API = 'http://localhost:5000/approvals'

function getToken() { return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '' }
function authHeader() { return { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' } }

export default function SecurityPage() {
  const { t } = useLanguage()
  const [approvals, setApprovals] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchApprovals = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(APPROVALS_API, { headers: authHeader() })
      if (res.ok) setApprovals(await res.json())
    } catch (err) {
      toast.error('Failed to fetch approvals')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApprovals()
  }, [])

  const handleAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const res = await fetch(`${APPROVALS_API}/${id}/status`, {
        method: 'PATCH',
        headers: authHeader(),
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        toast.success(`Request ${status.toLowerCase()}`)
        fetchApprovals()
      }
    } catch (err) {
      toast.error('Action failed')
    }
  }

  const logs = [
    { event: 'Root Login', user: 'Admin (System)', time: '2 mins ago', ip: '192.168.1.1', status: 'Verified' },
    { event: 'Failed Attempt', user: 'Unknown', time: '14 mins ago', ip: '45.12.33.2', status: 'Blocked' },
    { event: 'DB Export', user: 'Dr. Rajesh', time: '1 hour ago', ip: '10.0.0.45', status: 'Authorized' },
    { event: 'Password Change', user: 'Sneha Kapur', time: '3 hours ago', ip: '192.168.1.12', status: 'Verified' },
  ]

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Security & Governance')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Audit trails, governance approvals, and system security')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-border font-black">
             <ShieldAlert size={20} className="mr-2 text-red-500" /> {t('System Audit')}
          </Button>
          <Button className="h-14 px-8 rounded-2xl bg-foreground text-background font-black shadow-xl">
             <Lock size={20} className="mr-2" /> {t('Lockdown Mode')}
          </Button>
        </div>
      </div>

      {/* Approval Center */}
      <div className="bg-card rounded-[3rem] border border-border p-10 shadow-sm relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
         <div className="flex items-center justify-between mb-10 relative z-10">
            <div>
               <h3 className="text-2xl font-black text-card-foreground tracking-tight">{t('Approval Center')}</h3>
               <p className="text-sm text-muted-foreground font-medium">{t('Critical actions requiring administrative authorization')}</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full">
               {approvals.filter(a => a.status === 'PENDING').length} {t('Pending Requests')}
            </Badge>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {isLoading ? (
               [1,2,3].map(i => <div key={i} className="h-48 rounded-[2rem] bg-muted animate-pulse" />)
            ) : approvals.length === 0 ? (
               <div className="col-span-full text-center py-20 bg-muted/20 rounded-[2rem] border border-dashed border-border">
                  <UserCheck size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-bold text-muted-foreground">{t('No pending approval requests')}</p>
               </div>
            ) : (
               approvals.map((req, i) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-[2rem] border border-border bg-card/50 hover:shadow-xl transition-all"
                  >
                     <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary">
                           <Clock size={20} />
                        </div>
                        <Badge className={cn(
                          "px-3 py-0.5 rounded-full text-[9px] font-black uppercase border-none",
                          req.status === 'PENDING' ? 'bg-amber-500 text-background' : 
                          req.status === 'APPROVED' ? 'bg-emerald-500 text-background' : 'bg-red-500 text-background'
                        )}>
                           {req.status}
                        </Badge>
                     </div>
                     <h4 className="font-black text-card-foreground text-lg mb-1 leading-tight">{req.type}</h4>
                     <p className="text-xs font-bold text-muted-foreground/80 mb-4">{req.description}</p>
                     
                     {req.amount && (
                        <div className="mb-6 bg-muted/50 p-3 rounded-xl inline-block border border-border/50">
                           <p className="text-[9px] font-black uppercase text-muted-foreground/70 mb-0.5">{t('Amount')}</p>
                           <p className="text-lg font-black text-card-foreground tracking-tighter">${req.amount.toLocaleString()}</p>
                        </div>
                     )}

                     {req.status === 'PENDING' && (
                        <div className="flex gap-2">
                           <button 
                            onClick={() => handleAction(req.id, 'APPROVED')}
                            className="flex-grow h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-background font-black text-xs transition-all flex items-center justify-center gap-1"
                           >
                              <Check size={16} /> {t('Approve')}
                           </button>
                           <button 
                            onClick={() => handleAction(req.id, 'REJECTED')}
                            className="flex-grow h-12 rounded-xl bg-red-500 hover:bg-red-600 text-background font-black text-xs transition-all flex items-center justify-center gap-1"
                           >
                              <X size={16} /> {t('Reject')}
                           </button>
                        </div>
                     )}
                  </motion.div>
               ))
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-card rounded-[3rem] border border-border p-10">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-2xl font-black text-card-foreground tracking-tight">{t('Security Audit Logs')}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{t('Real-time monitoring of system-wide interactions')}</p>
               </div>
            </div>

            <div className="space-y-4">
               {logs.map((log, i) => (
                 <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-border/50 hover:bg-muted/50 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                       <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        log.status === 'Blocked' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'
                       )}>
                          {log.status === 'Blocked' ? <ShieldAlert size={18} /> : <History size={18} />}
                       </div>
                       <div>
                          <p className="font-black text-card-foreground">{log.event}</p>
                          <p className="text-xs font-bold text-muted-foreground/70">{log.user} • {log.ip}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-black text-card-foreground mb-1">{log.time}</p>
                       <Badge className={cn(
                        "px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border-none",
                        log.status === 'Blocked' ? 'bg-red-500 text-background' : 'bg-emerald-500 text-background'
                       )}>{log.status}</Badge>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-8">
            <Card className="p-8 rounded-[3rem] border-border bg-foreground text-background relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-xl font-black tracking-tight mb-2">{t('Multi-Factor Auth')}</h3>
                  <p className="text-sm text-muted-foreground/70 font-medium mb-10">{t('Enhanced account protection')}</p>
                  
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-foreground/90 border border-zinc-800 mb-6">
                     <div className="flex items-center gap-3">
                        <Smartphone className="text-primary" />
                        <div>
                           <p className="text-sm font-black">{t('Mobile App')}</p>
                           <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{t('Active')}</p>
                        </div>
                     </div>
                  </div>
                  <Button className="w-full h-14 rounded-2xl hover:bg-zinc-700 text-background font-black transition-all">
                     {t('Revoke All Access')}
                  </Button>
               </div>
            </Card>

            <div className="bg-card rounded-[3rem] border border-border p-8">
               <h3 className="text-lg font-black text-card-foreground mb-6">{t('Login Origins')}</h3>
               <div className="space-y-6">
                  {[
                    { country: 'USA', city: 'Washington', count: 12, flag: '🇺🇸' },
                    { country: 'BD', city: 'Dhaka', count: 452, flag: '🇧🇩' },
                    { country: 'UK', city: 'London', count: 5, flag: '🇬🇧' },
                  ].map((origin, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <span className="text-2xl">{origin.flag}</span>
                          <div>
                             <p className="text-sm font-black text-card-foreground">{origin.city}</p>
                             <p className="text-[10px] text-muted-foreground/70 font-bold uppercase tracking-widest">{origin.country}</p>
                          </div>
                       </div>
                       <span className="text-sm font-black text-muted-foreground/70">{origin.count} {t('Logins')}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
