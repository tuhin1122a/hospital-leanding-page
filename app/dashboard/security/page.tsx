'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { History, Lock, ShieldAlert, ShieldCheck, Smartphone } from 'lucide-react'

const logs = [
  { event: 'Root Login', user: 'Admin (System)', time: '2 mins ago', ip: '192.168.1.1', status: 'Verified' },
  { event: 'Failed Attempt', user: 'Unknown', time: '14 mins ago', ip: '45.12.33.2', status: 'Blocked' },
  { event: 'DB Export', user: 'Dr. Rajesh', time: '1 hour ago', ip: '10.0.0.45', status: 'Authorized' },
  { event: 'Password Change', user: 'Sneha Kapur', time: '3 hours ago', ip: '192.168.1.12', status: 'Verified' },
]

export default function SecurityPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Security & Governance</h1>
          <p className="text-zinc-500 font-medium text-lg mt-1">Audit trails, encryption status, and access management</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-zinc-200 font-black">
             <ShieldAlert size={20} className="mr-2 text-red-500" /> System Audit
          </Button>
          <Button className="h-14 px-8 rounded-2xl bg-zinc-950 text-white font-black shadow-xl">
             <Lock size={20} className="mr-2" /> Lockdown Mode
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Security Score', value: '98/100', icon: ShieldCheck, color: 'text-emerald-500' },
           { label: 'Active Sessions', value: '42', icon: Smartphone, color: 'text-blue-500' },
           { label: 'Blocked Threats', value: '1,234', icon: ShieldAlert, color: 'text-red-500' },
           { label: 'Data Encryption', value: 'Active', icon: Lock, color: 'text-primary' },
         ].map((stat, i) => (
           <Card key={i} className="p-6 border-zinc-100 rounded-[2rem] flex items-center gap-4 group">
              <div className="p-4 rounded-2xl bg-zinc-50 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all">
                 <stat.icon size={20} className={stat.color} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none mb-1">{stat.label}</p>
                 <p className="text-xl font-black text-zinc-900">{stat.value}</p>
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white rounded-[3rem] border border-zinc-100 p-10">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Security Audit Logs</h3>
                  <p className="text-sm text-zinc-500 font-medium">Real-time monitoring of system-wide interactions</p>
               </div>
               <Button variant="outline" className="rounded-xl border-zinc-100 h-10 px-4 font-bold text-xs">
                  Download Logs
               </Button>
            </div>

            <div className="space-y-4">
               {logs.map((log, i) => (
                 <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-zinc-50 hover:bg-zinc-50/50 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                       <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        log.status === 'Blocked' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'
                       )}>
                          {log.status === 'Blocked' ? <ShieldAlert size={18} /> : <History size={18} />}
                       </div>
                       <div>
                          <p className="font-black text-zinc-900">{log.event}</p>
                          <p className="text-xs font-bold text-zinc-400">{log.user} • {log.ip}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-black text-zinc-900 mb-1">{log.time}</p>
                       <Badge className={cn(
                        "px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border-none",
                        log.status === 'Blocked' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                       )}>{log.status}</Badge>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-8">
            <Card className="p-8 rounded-[3rem] border-zinc-100 bg-zinc-950 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-xl font-black tracking-tight mb-2">Multi-Factor Auth</h3>
                  <p className="text-sm text-zinc-400 font-medium mb-10">Enhanced account protection</p>
                  
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-zinc-900 border border-zinc-800 mb-6">
                     <div className="flex items-center gap-3">
                        <Smartphone className="text-primary" />
                        <div>
                           <p className="text-sm font-black">Mobile App</p>
                           <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Active</p>
                        </div>
                     </div>
                     <div className="w-10 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm" />
                     </div>
                  </div>

                  <Button className="w-full h-14 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-black transition-all">
                     Revoke All Access
                  </Button>
               </div>
            </Card>

            <div className="bg-white rounded-[3rem] border border-zinc-100 p-8">
               <h3 className="text-lg font-black text-zinc-900 mb-6">Login Origins</h3>
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
                             <p className="text-sm font-black text-zinc-900">{origin.city}</p>
                             <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{origin.country}</p>
                          </div>
                       </div>
                       <span className="text-sm font-black text-zinc-400">{origin.count} Logins</span>
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
