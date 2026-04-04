'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { History, Lock, ShieldAlert, ShieldCheck, Smartphone } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const logs = [
  { event: 'Root Login', user: 'Admin (System)', time: '2 mins ago', ip: '192.168.1.1', status: 'Verified' },
  { event: 'Failed Attempt', user: 'Unknown', time: '14 mins ago', ip: '45.12.33.2', status: 'Blocked' },
  { event: 'DB Export', user: 'Dr. Rajesh', time: '1 hour ago', ip: '10.0.0.45', status: 'Authorized' },
  { event: 'Password Change', user: 'Sneha Kapur', time: '3 hours ago', ip: '192.168.1.12', status: 'Verified' },
]

export default function SecurityPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-card-foreground tracking-tighter">{t('Security & Governance')}</h1>
          <p className="text-muted-foreground font-medium text-lg mt-1">{t('Audit trails, encryption status, and access management')}</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: t('Security Score'), value: '98/100', icon: ShieldCheck, color: 'text-emerald-500' },
           { label: t('Active Sessions'), value: '42', icon: Smartphone, color: 'text-blue-500' },
           { label: t('Blocked Threats'), value: '1,234', icon: ShieldAlert, color: 'text-red-500' },
           { label: t('Data Encryption'), value: 'Active', icon: Lock, color: 'text-primary' },
         ].map((stat, i) => (
           <Card key={i} className="p-6 border-border rounded-[2rem] flex items-center gap-4 group">
              <div className="p-4 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-foreground/90 group-hover:text-background transition-all">
                 <stat.icon size={20} className={stat.color} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 leading-none mb-1">{stat.label}</p>
                 <p className="text-xl font-black text-card-foreground">{stat.value}</p>
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-card rounded-[3rem] border border-border p-10">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-2xl font-black text-card-foreground tracking-tight">{t('Security Audit Logs')}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{t('Real-time monitoring of system-wide interactions')}</p>
               </div>
               <Button variant="outline" className="rounded-xl border-border h-10 px-4 font-bold text-xs">
                  {t('Download Logs')}
               </Button>
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
                     <div className="w-10 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-card rounded-full absolute right-1 shadow-sm" />
                     </div>
                  </div>

                  <Button className="w-full h-14 rounded-2xl hover:bg-foreground/80 hover:bg-zinc-700 text-background font-black transition-all">
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
