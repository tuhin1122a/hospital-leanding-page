'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
    Bell,
    ChevronRight,
    Computer,
    CreditCard,
    Database,
    Shield,
    Zap
} from 'lucide-react'

export default function SettingsPage() {
  const sections = [
    { name: 'Appearance', desc: 'Theme, typography, and layout settings', icon: Computer, color: 'text-blue-500' },
    { name: 'Notifications', desc: 'Email, SMS, and system alert preferences', icon: Bell, color: 'text-purple-500' },
    { name: 'Integrations', desc: 'Connect with third-party medical software', icon: Zap, color: 'text-amber-500' },
    { name: 'Data Management', desc: 'Backup, export, and regional storage config', icon: Database, color: 'text-emerald-500' },
    { name: 'Billing Plan', desc: 'SaaS subscription and payment history', icon: CreditCard, color: 'text-pink-500' },
    { name: 'API Keys', desc: 'Developer access and webhooks', icon: Shield, color: 'text-primary' },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">System Settings</h1>
          <p className="text-zinc-500 font-medium text-lg mt-1">Configure your clinical environment and user preferences</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-zinc-950 text-white font-black shadow-xl">
           Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
         <div className="md:col-span-1 space-y-4">
            <h3 className="text-xl font-black text-zinc-900 tracking-tight">Main Profile</h3>
            <p className="text-sm text-zinc-500 font-medium leading-relaxed">Changes made here will be visible to your entire medical unit.</p>
            
            <div className="pt-6">
               <div className="w-32 h-32 rounded-[2.5rem] bg-zinc-100 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative group cursor-pointer">
                  <img src="https://i.pravatar.cc/150?u=admin" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                     <span className="text-white text-[10px] font-black uppercase tracking-widest">Update</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="md:col-span-2 space-y-8 bg-white rounded-[3rem] border border-zinc-100 p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="John Doe"
                    className="w-full h-14 px-6 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white outline-none transition-all font-bold text-zinc-900"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</label>
                  <input 
                    type="text" 
                    defaultValue="john@carepulse.com"
                    className="w-full h-14 px-6 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white outline-none transition-all font-bold text-zinc-900"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Timezone</label>
                  <select className="w-full h-14 px-6 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white outline-none transition-all font-bold text-zinc-900">
                     <option>Dhaka (GMT+6)</option>
                     <option>London (GMT+0)</option>
                     <option>New York (GMT-5)</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Language</label>
                  <select className="w-full h-14 px-6 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white outline-none transition-all font-bold text-zinc-900">
                     <option>English (US)</option>
                     <option>Bengali</option>
                     <option>Spanish</option>
                  </select>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {sections.map((section, i) => (
           <Card key={i} className="p-8 border-zinc-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 group cursor-pointer relative overflow-hidden">
              <div className="relative z-10">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-zinc-50 group-hover:bg-primary group-hover:text-white transition-all", section.color)}>
                    <section.icon size={22} />
                 </div>
                 <h4 className="text-xl font-black text-zinc-900 tracking-tight mb-2">{section.name}</h4>
                 <p className="text-sm text-zinc-400 font-medium leading-relaxed mb-6">{section.desc}</p>
                 <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary group-hover:gap-2 transition-all">
                    Configure <ChevronRight size={14} />
                 </div>
              </div>
           </Card>
         ))}
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
